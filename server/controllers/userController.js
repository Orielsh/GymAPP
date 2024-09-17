const userService = require("../services/userService");


const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req.user);
    if (users)
      return res.status(200).json({
        success: true,
        data: users,
      });
    else {
      return res.status(500).json({
        success: false,
        message: "Unable to fetch users list"
      });
    }
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};

const getUserById = async (req, res) => {

  const { id } = req.params;

  try {
    // find the user that matches this id
    const found = await userService.getUserById(req.user, id)
    // found
    if (found) {
      // return the user found
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `user id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(err.status || 400).json({
      success: false,
      message: "Invalid format for user id or access denied",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user: loggedInUser, synthBody, params } = req;
    const idToUpdate = params.id;
    const updated = await userService.updateUserById(loggedInUser, idToUpdate, synthBody)
    if (!updated)
      return res
        .status(500)
        .json({ success: false, message: "Could not update user, unknown error" });
    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};

const getTrainersList = async (req, res) => {
  try {
    const trianersList = await userService.getTrainersList();
    if (!trianersList)
      return res
        .status(500)
        .json({ success: false, message: "Could not get trainers list" });
    return res.status(200).json({
      success: true,
      data: trianersList,
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};

const getTrainerById = async (req, res) => {
  try {
    const id = req.params.id;
    const trainer = await userService.getTrainerById(id);
    if (!trainer)
      return res.status(500).json({ success: false, message: "Could not get trainer" });
    if (trainer.length !== 1)
      return res.status(404).json({ success: false, message: "Trainer not found" });
    return res.status(200).json({
      success: true,
      data: trainer[0],
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userService.softDelete(id);
    return res.status(200).json({
      success: true,
      data: deleted,
    });
  }
  catch (err) {
    // return an error message
    return res.status(err.status || 500).json({
      success: false,
      message: err.message ?? "Conuldn't delete user",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  getTrainersList,
  getTrainerById,
  softDeleteUser,
};
