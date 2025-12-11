const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// Get active members (most common use case)
router.get('/members/active', membersController.getActiveMembers);

// Get members by society_id
router.get('/members/society/:society_id', membersController.getMembersBySocietyId);

// Get active members by society_id
router.get('/members/society/:society_id/active', membersController.getActiveMembersBySocietyId);

// Get members by user_id
router.get('/members/user/:user_id', membersController.getMembersByUserId);

// CRUD operations
router.post('/members', membersController.createMember);
router.get('/members', membersController.getMembers);
router.get('/members/:id', membersController.getMemberById);
// Update by membership_number (must be before /:id route to avoid conflicts)
router.put('/members/membership/:membership_number', membersController.updateMemberByMembershipNumber);
router.put('/members/:id', membersController.updateMember);
router.delete('/members/:id', membersController.deleteMember);

module.exports = router;

