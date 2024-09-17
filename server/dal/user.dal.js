const User = require("../models/User");
const Plan = require("../models/Plan");
const Workout = require("../models/Workout");
const mongoose = require('mongoose');
// create user
async function createUser(user) {
    const newUser = new User(user);
    return await newUser.save();
};

// get all users
async function getAllUsers() {
    return await User.find({isDeleted: false}).select('-password').exec();
};

// get user by ID
async function getUserById(id) {
    return await User.findById(id).select('-password').populate("trainer", "name phone email image").populate("plan.plan").exec();
};

// update user by ID
async function updateUser(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true }).select('-password').exec();
};

// delete a user by ID
async function deleteUser(id) {
    return await User.findByIdAndDelete(id).select('-password').exec();
};

// check if user with email exist
async function isUserWithEmailExist(email) {
    const users = await User.find({ email: email });
    return users.length > 0;
};

// get user by email
async function getUserByEmail(email) {
    return await User.findOne({ email: email });
};

// get trainers list public data
async function getTrainersList() {
    return await User.find({ role: "TRAINER" }, { name: 1, phone: 1, email: 1, image: 1 });
}

//get trainer by id public data
async function getTrainerById(id) {
    return await User.find({ role: "TRAINER", _id: id }, { name: 1, phone: 1, email: 1, image: 1 });
}


async function softDelete(userId) {
    return await User.findByIdAndUpdate(userId, { isDeleted: true });
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    isUserWithEmailExist,
    getUserByEmail,
    getTrainersList,
    getTrainerById,
    softDelete,
};