/**
 * Input validation utility functions for the FixAppliance API.
 * 
 * Provides validation for:
 *  - Email format
 *  - Phone number format (Lebanese format)
 *  - Password strength
 *  - Name format
 */

/**
 * Validates email format using regex
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    
    // Email regex that requires at least one dot in domain with proper TLD (2-10 chars)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,10}$/;
    
    return emailRegex.test(email.trim()) && email.length <= 100;
};

/**
 * Validates phone number format (Lebanese format)
 * 
 * Landlines (8 digits total, with leading 0):
 *   - 01 XXX XXX (Beirut)
 *   - 04, 05, 09 XXX XXX (Mount Lebanon)
 *   - 06 XXX XXX (North)
 *   - 07 XXX XXX (South)
 *   - 08 XXX XXX (Bekaa)
 * 
 * Mobile with leading 0 (8 digits total):
 *   - 03 XXX XXX (Alfa/Touch)
 * 
 * Mobile without leading 0 (8 digits total):
 *   - 70, 71, 76, 78, 79, 81 XXX XXX (Alfa/Touch)
 * 
 * With country code: +961 or 961 followed by number without leading 0
 * 
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidPhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    
    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Landline with leading 0: 01, 04, 05, 06, 07, 08, 09 + 6 digits = 8 total
    const landlineRegex = /^0[1456789][0-9]{6}$/;
    
    // Mobile 03 with leading 0: 03 + 6 digits = 8 total
    const mobile03Regex = /^03[0-9]{6}$/;
    
    // Mobile without leading 0: 70, 71, 76, 78, 79, 81 + 6 digits = 8 total
    const mobileRegex = /^(70|71|76|78|79|81)[0-9]{6}$/;
    
    // With country code +961 or 961: followed by number without leading 0
    // Landline: 961 + 1/4/5/6/7/8/9 + 6 digits
    const intlLandlineRegex = /^(\+?961)[1456789][0-9]{6}$/;
    
    // Mobile with intl code: 961 + 3 + 6 digits OR 961 + 70/71/76/78/79/81 + 6 digits
    const intlMobileRegex = /^(\+?961)(3[0-9]{6}|(70|71|76|78|79|81)[0-9]{6})$/;
    
    return landlineRegex.test(cleanPhone) || 
           mobile03Regex.test(cleanPhone) ||
           mobileRegex.test(cleanPhone) || 
           intlLandlineRegex.test(cleanPhone) || 
           intlMobileRegex.test(cleanPhone);
};

/**
 * Validates password strength
 * Requirements: minimum 8 characters, at least one uppercase, one lowercase, one number
 * @param {string} password - The password to validate
 * @returns {{valid: boolean, message: string}} - Validation result with message
 */
const isValidPassword = (password) => {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: "Password is required." };
    }

    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long." };
    }

    if (password.length > 100) {
        return { valid: false, message: "Password cannot exceed 100 characters." };
    }

    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter." };
    }

    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter." };
    }

    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "Password must contain at least one number." };
    }

    return { valid: true, message: "Password is valid." };
};

/**
 * Validates name format (first name, last name)
 * Only allows letters, spaces, hyphens, and apostrophes
 * @param {string} name - The name to validate
 * @param {number} maxLength - Maximum allowed length (default: 30)
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidName = (name, maxLength = 30) => {
    if (!name || typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    
    // Must be between 2 and maxLength characters, only letters, spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s'-]{2,}$/;
    
    return nameRegex.test(trimmedName) && trimmedName.length <= maxLength;
};

/**
 * Sanitizes string input by trimming whitespace
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized string or empty string if invalid
 */
const sanitizeString = (input) => {
    if (!input || typeof input !== 'string') return '';
    return input.trim();
};

/**
 * Validates that a string doesn't exceed a maximum length
 * @param {string} str - The string to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidLength = (str, maxLength) => {
    if (!str || typeof str !== 'string') return false;
    return str.trim().length <= maxLength;
};

module.exports = {
    isValidEmail,
    isValidPhone,
    isValidPassword,
    isValidName,
    sanitizeString,
    isValidLength
};
