const mongoose = require('mongoose');
const { User, Thought } = require('../models');


async function getAllUsers(req, res) {
    try {
        const users = await User.find({})
        .populate({ path: 'thoughts' });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    };
};

async function getUserById(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
        .populate({ path: 'thoughts' });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function createUser(req, res) {
    try {
        const newUser = User.create(req.body);

        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    };
};

async function updateUser(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
        
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const userThoughts = await Thought.deleteMany({ username: deletedUser.username });
            res.status(200).json(deletedUser);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};