const Design = require('../models/Design');

// @desc    Get all designs for authenticated user
// @route   GET /api/designs
// @access  Private
const getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-designData'); // Exclude full design data for list view

    res.json(designs);
  } catch (error) {
    console.error('Get designs error:', error);
    res.status(500).json({ message: 'Server error fetching designs' });
  }
};

// @desc    Get single design by ID
// @route   GET /api/designs/:id
// @access  Private
const getDesignById = async (req, res) => {
  try {
    const design = await Design.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.json(design);
  } catch (error) {
    console.error('Get design error:', error);
    res.status(500).json({ message: 'Server error fetching design' });
  }
};

// @desc    Create new design
// @route   POST /api/designs
// @access  Private
const createDesign = async (req, res) => {
  try {
    const { title, designData, category, dimensions, tags, thumbnail } = req.body;

    if (!title || !designData) {
      return res.status(400).json({ message: 'Title and design data are required' });
    }

    const design = await Design.create({
      title,
      user: req.user._id,
      designData,
      category: category || 'poster',
      dimensions: dimensions || { width: 800, height: 1000 },
      tags: tags || [],
      thumbnail: thumbnail || ''
    });

    res.status(201).json(design);
  } catch (error) {
    console.error('Create design error:', error);
    res.status(500).json({ message: 'Server error creating design' });
  }
};

// @desc    Update design
// @route   PUT /api/designs/:id
// @access  Private
const updateDesign = async (req, res) => {
  try {
    const design = await Design.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    const { title, designData, category, dimensions, tags, thumbnail } = req.body;

    if (title) design.title = title;
    if (designData) design.designData = designData;
    if (category) design.category = category;
    if (dimensions) design.dimensions = dimensions;
    if (tags) design.tags = tags;
    if (thumbnail !== undefined) design.thumbnail = thumbnail;

    await design.save();

    res.json(design);
  } catch (error) {
    console.error('Update design error:', error);
    res.status(500).json({ message: 'Server error updating design' });
  }
};

// @desc    Delete design
// @route   DELETE /api/designs/:id
// @access  Private
const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    await design.deleteOne();

    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    console.error('Delete design error:', error);
    res.status(500).json({ message: 'Server error deleting design' });
  }
};

module.exports = {
  getUserDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign
};
