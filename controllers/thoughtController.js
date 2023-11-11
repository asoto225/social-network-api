const { Thought, User } = require('../models');

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      console.log('cannot get all thoughts');
      res.status(400).json(err);
    }
  },
  // get single thought by id
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // create new thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      // push thought id to associated user's thoughts array field
      const userData = await User.findOneAndUpdate(
        { _id: thoughtData.userId }, // Use thoughtData.userId instead of req.body.userId
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // update thought by id
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // delete thought by id
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
