const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userControllers');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/user/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;