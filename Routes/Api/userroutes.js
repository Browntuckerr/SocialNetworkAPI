const router = require("express").Router();
const {
    getAllUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../Controllers/usercontroller");

router
.route("/")
.get(getUsersById)
.get(getAllUsers)
.put(updateUser)
.delete(deleteUser)
.post(createUser);




router
.route("/:id/friends/:friendsId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;