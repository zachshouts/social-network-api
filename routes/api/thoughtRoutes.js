const router = require("express").Router();
const {} = require("../../controllers/thoughtControllers");


// /api/thought
router.route('/').get().post();

// /api/thought/:id
router.route('/:id').get().put().delete();

// /api/thought/:id/reactions
router.route('/:id/reactions').post().delete();