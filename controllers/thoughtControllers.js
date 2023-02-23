const mongoose = require('mongoose');
const { Thought, User } = require('../models');


async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find()
        .populate({ path: 'reactions'});

        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    };
};

async function getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.id })
        .populate({ path: 'reactions'});

        if (!thought) {
            res.status(500).json({ message: 'No thought found with this id!'});
        } else {
            res.status(200).json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id }},
            { new: true }
        );

        if (!updatedUser) {
            res.status(500).json({ message: 'No user found with this username!' });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    };
};

async function updateThought(req, res) {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true }
        );

        if (!updatedThought) {
            res.status(500).json({ message: 'No thought found with this id!' });
        } else {
            res.status(200).json(updatedThought);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function deleteThought(req, res) {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });

        if (!deletedThought) {
            res.status(500).json({ message: 'No thought found with this id!' });
        } else {
            res.status(200).json(deletedThought);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function addReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body }},
            { runValidators: true, new: true }
        );

        if (!reaction) {
            res.status(500).json({ message: 'No thought found with this id!' });
        } else {
            res.status(200).json(reaction);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};

async function removeReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true }
        );

        if (!reaction) {
            res.status(500).json({ message: 'No thought found with this id!' });
        } else {
            res.status(200).json(reaction);
        }
    } catch (err) {
        res.status(500).json(err);
    };
};



module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
}