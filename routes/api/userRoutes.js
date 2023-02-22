const router = require("express").Router();
const {} = require('../../controllers/userControllers');

// /api/user
router.route('/').get().post();

// /api/user/:id
router.route('/:id').get().put().delete();

// /api/user/:id/friends/:friendId
router.route('/:id/friends/:friendId').post().delete();