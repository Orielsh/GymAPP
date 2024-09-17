const userDAL = require('../dal/user.dal');
const AccessError = require("../errors/accessError");

// Service function to get all users (can be modified for pagination or filtering)
//Only adming or trainers can get list of all users
async function getAllUsers(user) {
    try {
        if (isAdminOrTrainer(user)) {
            const users = await userDAL.getAllUsers();
            return users;
        } else
            throw new AccessError(user, "Only Trainer or Admins can get the users list");
    } catch (error) {
        throw error;
    }
}

// Service function to get a user by ID
async function getUserById(user, id) {
    if (user.id === id || isAdminOrTrainer(user))
        return user = await userDAL.getUserById(id);
    else
        throw new AccessError(user, "You are not allowed to view the requested user's profile.")
}

// Service function to delete a user
async function deleteUser(user, id) {
    if (user.id === id || user.role === "Admin")
        return user = await userDAL.deleteUser(id);
    else
        throw new AccessError(user, "Only the user itself or Admin can delete a user");
}

async function updateUserById(loggedInUser, idToUpdate, updates) {
    if (loggedInUser.id === idToUpdate || loggedInUser.role === "TRAINER" || loggedInUser.role === "ADMIN")
        return await userDAL.updateUser(idToUpdate, updates);
    else
        throw new AccessError(user)
}

// Check if user with given email exist
async function isUserWithEmailExist(email) {
    return await userDAL.isUserWithEmailExist(email);
}

function isAdminOrTrainer(user){
    return user.role === "ADMIN" | user.role === "TRAINER";
};

async function getTrainersList(){
    return await userDAL.getTrainersList();
}

async function getTrainerById(id){
    return await userDAL.getTrainerById(id);
}

async function softDelete(userId){
    return await userDAL.softDelete(userId);
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserById,
    isUserWithEmailExist,
    getTrainersList,
    getTrainerById,
    softDelete,
};