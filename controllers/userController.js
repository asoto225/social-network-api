const { User, Thought } = require('../models');

module.exports = {
    // get all users
    // why wont the thoughts populate?
    async getAllUsers(req, res) {
        try {
            const userData = await User.find().populate('thoughts');
            res.json(userData);
            console.log(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // get single user by id
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId });
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId });
            res.json(userData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
}