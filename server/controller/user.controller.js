const userModel = require("../database/models/user.model");
const bcrypt = require("bcryptjs");
class User {
  static register = async (req, res) => {
    try {
      const user = await new userModel(req.body);
      const token = await user.generateToken();
      await user.save();
      res.status(200).send({
        apiStatus: "true",
        data: { user , token },
        message: "user registeredd successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        datat: err,
        message: "Auth error",
      });
    }
  };
  static registerAdmin = async (req, res) => {
    try {
      if (req.body.role == "User") throw new Error("UnAuthorized");
      const admin = await new userModel(req.body);
      const token = await admin.generateToken();
      await admin.save();
      res.status(200).send({
        apiStatus: "true",
        data: { admin, token },
        message: "admin registered successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        datat: err,
        message: "Auth error",
      });
    }
  };
  static login = async (req, res) => {
    try {
      const user = await userModel.loginUser(req.body.email, req.body.password);
      await user.generateToken();
      await user.save();
      res.status(200).send({
        apiStatus: "true",
        data: user,
        message: "logged in successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        datat: err,
        message: "Auth error",
      });
    }
  };
  static profileShow = async (req, res) => {
    res.status(200).send({
      apiStatus: "true",
      data: req.user,
      message: "profile shown",
    });
  };
  static profileShow2 = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await userModel.findById(id);
      res.status(200).send({
        apiStatus: "true",
        data: user,
        message: "profile shown",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };
  static changeImage = async (req, res) => {
    try {
      let user = await userModel.findByIdAndUpdate(req.user._id, {
        $set: {
          profilePic: "uploads/" + req.user._id + "/" + req.file.filename,
        },
      });
      if (!user) throw new Error("upload failed");
      res.status(200).send({
        apiStatus: "true",
        data: "uploads/" + req.user._id + "/" + req.file.filename,
        message: "image uploaded successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };
  static profileEdit = async (req, res) => {
    try {
      let user = await userModel.findByIdAndUpdate(req.user._id, {
        $set: req.body,
      });
      if (!user) throw new Error("user not found");
      res.status(200).send({
        apiStatus: "true",
        data: user,
        message: "profile is edited successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };
  static passwordEdit = async (req, res) => {
    try {
      const validPassword = await bcrypt.compare(
        req.body.password,
        req.user.password
      );

      if (validPassword) {
        req.user.password = req.body.new_password;
        await req.user.save();
        res.status(200).send({
          apiStatus: "true",
          data: req.user,
          message: "password is edited successfully",
        });
      } else throw Error("Incorrect Password");
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        datat: err,
        message: "Auth error",
      });
    }
  };
  static profileDelete = async (req, res) => {
    try {
      let user = await userModel.findByIdAndDelete(req.user._id);
      if (!user) throw new Error("user not found");
      res.status(200).send({
        apiStatus: "true",
        message: "profile is deleted successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };
  static profileDelete2 = async (req, res) => {
    const id = req.params.id;
    try {
      let user = await userModel.findByIdAndDelete(id);
      if (!user) throw new Error("user not found");
      res.status(200).send({
        apiStatus: "true",
        message: "profile is deleted successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };

  static logout = async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.user._id, { token: "" });

      res.status(200).send({
        apiStatus: "true",
        message: "logged out successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };

  static showAllUsers = async (req, res) => {
    try {
      const allUsers = await userModel.find();
      res.status(200).send({
        apiStatus: "true",
        data: allUsers,
        message: "allUsers successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "error",
      });
    }
  };
}
module.exports = User;
