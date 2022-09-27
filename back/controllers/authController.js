const Users = require("../models/authModel");
bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const user = await Users.find().select("name email role _id");
    res.setHeader("Access-Control-Allow-Origin", "*");
    const token = req.header("authorization").split(" ")[1];
    const decoded = jwt.decode(token);

    if (user == null) {
      res.status(400).json({
        message: "User not found",
        status: "fail",
        code: "WRONG_TOKEN",
      });
      return;
    }
    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        if (decoded.role === "admin") {
          res.status(200).json({
            status: "success",
            results: user.length,
            data: {
              Users: user,
            },
          });
        } else {
          res.status(200).json({
            status: "You are not admin",
            results: "fail",
          });
        }
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "TOKEN_UNDEFINED",
    });
  }
};

exports.decodeToken = async (req, res) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decoded = jwt.decode(token);

    await Users.find().select("name email role -_id");
    res.setHeader("Access-Control-Allow-Origin", "*");

    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        res.status(200).json({
          status: "success",
          results: decoded,
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `Token is not defined, Error 404!`,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await Users.create({
      role: req.body.role,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    var token = jwt.sign(
      { name: newUser.name, email: newUser.email, role: newUser.role },
      "hey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.loginUser = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(400).json({
      status: "fail",
      code: "NAME_OR_PASSWORD_NOT_DEFINED",
      message: "name or password not defined",
    });
    return;
  }

  var user = await Users.find({ email: req.body.email });

  if (user.length === 0) {
    res.status(400).json({
      status: "fail",
      code: "LOGIN_DO_NOT_EXISTS",
      message: "login do not exists",
    });
    return;
  }
  user = user[0];

  var token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    "hey",
    {
      expiresIn: "1d",
    }
  );

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    res.status(400).json({
      message: "Invalid Password",
      status: "fail",
      code: "INVALID_PASSWORD",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    message: "Login successful",
    token: token,
    data: {
      users: user,
    },
  });
};
exports.getAllUserItems = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const token = req.header("authorization").split(" ")[1];
    const decoded = jwt.decode(token);

    const users = await Users.find({ email: decoded.email }).select(
      "items._id items.name items.category items.date"
    );
    const { items } = users[0];

    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        res.status(200).json({
          status: "success",
          results: users.length,
          data: {
            items: items,
          },
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.createUserItems = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const token = req.header("authorization").split(" ")[1];
    const decoded = jwt.decode(token);

    const updatedItems = await Users.findOneAndUpdate(
      { email: decoded.email },
      { $push: { items: req.body } },
      { new: true }
    ).select("name email items.name items.category items.date -_id");
    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            limit: updatedItems,
          },
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findItemAndUpdate = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("authorization").split(" ")[1];
  const decoded = jwt.decode(token);
  try {
    const updateItem = await Users.findOneAndUpdate(
      { email: decoded.email, "items._id": req.params.subID },
      {
        $set: {
          "items.$.name": req.body.name,
          "items.$.category": req.body.category,
          "items.$.date": req.body.date,
        },
      }
    ).select("name email items.name items.category items.date -_id");

    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            items: updateItem,
          },
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findItemAndDelete = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("authorization").split(" ")[1];
  const decoded = jwt.decode(token);
  try {
    await Users.findOneAndUpdate(
      { email: decoded.email },
      {
        $pull: {
          items: { _id: req.params.subID },
        },
      }
    );
    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: null,
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        Users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findUserAndDelete = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("authorization").split(" ")[1];
  const decoded = jwt.decode(token);
  try {
    const users = await Users.findByIdAndDelete(req.params.id);

    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        if (decoded.role === "admin") {
          res.status(200).json({
            status: "success",
            data: users,
          });
        } else {
          res.status(200).json({
            status: "You are not admin",
            results: "fail",
          });
        }
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findUserAndUpdatePassword = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("authorization").split(" ")[1];
  const decoded = jwt.decode(token);
  try {
    var pass = (req.body.password = await bcrypt.hash(req.body.password, 10));
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            password: pass,
          },
        }
      ).select("name email -_id");

    jwt.verify(token, "hey", function (err, authData) {
      if (authData === undefined) {
        res.status(200).json({
          status: "Token expired",
          results: "fail",
        });
      } else {
        if (decoded.role === "admin") {
          res.status(200).json({
            status: "success",
            message: "password is changed",
          });
        } else {
          res.status(200).json({
            status: "You are not admin",
            results: "fail",
          });
        }
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, "labas");

  // 3) Check if user still exists
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};
