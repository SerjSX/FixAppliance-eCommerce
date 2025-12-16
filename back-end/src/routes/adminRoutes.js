/**
 * Admin Routes
 * 
 * Handles all administrative operations:
 * - Admin authentication (login/logout)
 * - Appliance category and type management
 * - Booking monitoring and oversight
 * - Technician verification and management
 * - Financial reporting and analytics
 * - User and technician information access
 * 
 * Protected routes require admin authentication via adminValidation middleware
 */

const express = require("express");
const {
    // Authentication
    loginAdmin,
    logoutAdmin,
    
    // Appliance management
    addCategory,
    addApplianceType,
    updateApplianceTypePrice,
    
    // Booking monitoring
    getCompletedUnpaidBookings,
    getAcceptedIncompleteBookings,
    getPaidOverdueBookings,
    
    // Technician management
    getAllTechnicians,
    getLowRatedTechnicians,
    getHighPerformanceTechnicians,
    getUnverifiedTechnicians,
    verifyTechnician,
    revokeVerification,
    deactivateTechnician,
    activateTechnician,
    
    // Financial reporting
    getFinancialSummary,
    
    // Analytics
    getUserDetails,
    getTechnicianDetails,
    getBookingCountsByType
} = require("../controllers/AdminController");

const { adminValidation } = require("../middlewares/auth");

const router = express.Router();

// ========================================
// AUTHENTICATION (No middleware required)
// ========================================

// Admin login
// POST /api/admin/login
// Body: { email, password }
router.post("/login", loginAdmin);

// Admin logout
// POST /api/admin/logout
router.post("/logout", adminValidation, logoutAdmin);

// ========================================
// APPLIANCE CATEGORY & TYPE MANAGEMENT
// ========================================

// Add new appliance category with icon upload
// POST /api/admin/categories
// Body: { nameEN, nameAR } + multipart/form-data with 'icon' field
router.post("/categories", adminValidation, addCategory);

// Add new appliance type under a category
// POST /api/admin/categories/:categoryId/types
// Body: { nameEN, nameAR, basePrice, averageRepairTimeMin, descriptionEN?, descriptionAR? }
router.post("/categories/:categoryId/types", adminValidation, addApplianceType);

// Update base price for an appliance type
// PATCH /api/admin/types/:typeId/price
// Body: { basePrice }
router.patch("/types/:typeId/price", adminValidation, updateApplianceTypePrice);

// ========================================
// BOOKING MONITORING
// ========================================

// Get bookings completed but unpaid for extended period
// GET /api/admin/bookings/completed-unpaid?days=7
router.get("/bookings/completed-unpaid", adminValidation, getCompletedUnpaidBookings);

// Get bookings accepted but not completed for extended period
// GET /api/admin/bookings/accepted-incomplete?days=3
router.get("/bookings/accepted-incomplete", adminValidation, getAcceptedIncompleteBookings);

// Get paid bookings that are overdue (past scheduled date, not completed)
// GET /api/admin/bookings/paid-overdue
router.get("/bookings/paid-overdue", adminValidation, getPaidOverdueBookings);

// ========================================
// TECHNICIAN MANAGEMENT
// ========================================

// Get all technicians with filtering and search
// GET /api/admin/technicians?status=all&verified=all&search=&page=1&limit=20
router.get("/technicians", adminValidation, getAllTechnicians);

// Get technicians with low ratings (default ≤3 stars)
// GET /api/admin/technicians/low-rated?threshold=3
router.get("/technicians/low-rated", adminValidation, getLowRatedTechnicians);

// Get high-performing technicians (default >3 stars)
// GET /api/admin/technicians/high-performers?threshold=3
router.get("/technicians/high-performers", adminValidation, getHighPerformanceTechnicians);

// Get unverified technicians waiting for approval
// GET /api/admin/technicians/unverified
router.get("/technicians/unverified", adminValidation, getUnverifiedTechnicians);

// Verify a technician account
// PATCH /api/admin/technicians/:technicianId/verify
router.patch("/technicians/:technicianId/verify", adminValidation, verifyTechnician);

// Revoke technician verification
// PATCH /api/admin/technicians/:technicianId/revoke-verification
router.patch("/technicians/:technicianId/revoke-verification", adminValidation, revokeVerification);

// Deactivate a technician account
// PATCH /api/admin/technicians/:technicianId/deactivate
router.patch("/technicians/:technicianId/deactivate", adminValidation, deactivateTechnician);

// Activate a technician account
// PATCH /api/admin/technicians/:technicianId/activate
router.patch("/technicians/:technicianId/activate", adminValidation, activateTechnician);

// Get detailed technician information
// GET /api/admin/technicians/:technicianId
router.get("/technicians/:technicianId", adminValidation, getTechnicianDetails);

// ========================================
// FINANCIAL REPORTING
// ========================================

// Get platform financial summary (revenue, commissions, earnings)
// GET /api/admin/financials?startDate=2024-01-01&endDate=2024-12-31
router.get("/financials", adminValidation, getFinancialSummary);

// ========================================
// ANALYTICS & USER MANAGEMENT
// ========================================

// Get detailed user information
// GET /api/admin/users/:userId
router.get("/users/:userId", adminValidation, getUserDetails);

// Get booking statistics by appliance type
// GET /api/admin/analytics/bookings-by-type?startDate=2024-01-01&endDate=2024-12-31&status=completed
router.get("/analytics/bookings-by-type", adminValidation, getBookingCountsByType);

module.exports = router;
