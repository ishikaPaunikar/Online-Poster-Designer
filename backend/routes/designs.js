const express = require('express');
const {
  getUserDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign
} = require('../controllers/designController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// GET /api/designs - Get all user designs
router.get('/', getUserDesigns);

// POST /api/designs - Create new design
router.post('/', createDesign);

// GET /api/designs/:id - Get single design
router.get('/:id', getDesignById);

// PUT /api/designs/:id - Update design
router.put('/:id', updateDesign);

// DELETE /api/designs/:id - Delete design
router.delete('/:id', deleteDesign);

module.exports = router;
