const { User, Thought } = require('../models');

module.exports = {
    // get all users
    // why wont the thoughts populate?
    async getAllUsers(req, res) {
        try {
            const userData = await User.find();
            res.json(userData);
            console.log(userData);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    // get single user by id
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId });
            res.json(userData);
        } catch (err) {
            res.json('no user found')
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
            res.json('user deleted');
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(userData);
            console.log(userData);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            res.json('friend deleted');
            console.log(userData);
        }
        catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    }
}