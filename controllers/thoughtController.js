const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
            console.log(thoughtData);
        } catch (err) {
            console.log('cannot get all thoughts');
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get single thought by id
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thoughtData);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    // create new thought
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            // push thought id to associated user's thoughts array field
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId }, // Use thoughtData.userId instead of req.body.userId
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
            console.log(thoughtData)
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { new: true });
            res.json('thought deleted');
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
            res.json(reactionData);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            res.json(reactionData);
            console.log('reaction deleted');
        }
        catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    }
};
