/**
 * Admin Account Creation Script
 * 
 * This script allows you to create admin accounts securely.
 * Run this script directly on your server with Node.js.
 * 
 * Usage:
 *   node src/scripts/createAdmin.js
 * 
 * You'll be prompted to enter username, email, and password.
 * The password will be securely hashed before storage.
 */

const bcrypt = require('bcrypt');
const readline = require('readline');
const { connectDB, sql } = require('../config/database');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt user input
const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const createAdmin = async () => {
  try {
    console.log('\n========================================');
    console.log('  ADMIN ACCOUNT CREATION TOOL');
    console.log('========================================\n');

    // Get username
    let username = '';
    while (!username || username.length < 3) {
      username = await question('Enter username (min 3 characters): ');
      if (!username || username.length < 3) {
        console.log('❌ Username must be at least 3 characters long.\n');
      }
    }

    // Get email
    let email = '';
    while (!email || !isValidEmail(email)) {
      email = await question('Enter email address: ');
      if (!email || !isValidEmail(email)) {
        console.log('❌ Please enter a valid email address.\n');
      }
    }

    // Get password
    let password = '';
    while (!password || password.length < 8) {
      password = await question('Enter password (min 8 characters): ');
      if (!password || password.length < 8) {
        console.log('❌ Password must be at least 8 characters long.\n');
      }
    }

    // Confirm password
    const confirmPassword = await question('Confirm password: ');
    if (password !== confirmPassword) {
      console.log('\n❌ Passwords do not match. Exiting...\n');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creating admin account...\n');

    // Connect to database
    const pool = await connectDB();

    // Check if email already exists
    const checkResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT Admin_ID FROM Admin WHERE Email = @email');

    if (checkResult.recordset.length > 0) {
      console.log('❌ An admin account with this email already exists.\n');
      rl.close();
      process.exit(1);
    }

    // Check if username already exists
    const checkUsername = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT Admin_ID FROM Admin WHERE Username = @username');

    if (checkUsername.recordset.length > 0) {
      console.log('❌ An admin account with this username already exists.\n');
      rl.close();
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 11);

    // Insert admin account
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('passwordHash', sql.NVarChar, passwordHash)
      .query(`
        INSERT INTO Admin (Username, Email, Password_Hash, createdAt, modifiedAt)
        VALUES (@username, @email, @passwordHash, GETDATE(), GETDATE());
        SELECT SCOPE_IDENTITY() AS Admin_ID;
      `);

    const adminId = result.recordset[0].Admin_ID;

    console.log('✅ Admin account created successfully!\n');
    console.log('========================================');
    console.log(`  Admin ID: ${adminId}`);
    console.log(`  Username: ${username}`);
    console.log(`  Email:    ${email}`);
    console.log('========================================\n');
    console.log('You can now login at /admin-login\n');

    rl.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error creating admin account:', error.message);
    rl.close();
    process.exit(1);
  }
};

// Run the script
createAdmin();
