import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/sendEmail.js";
import { success } from "zod";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password: hashPassword,
      email,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      data: userData,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: err.message,
    });
  }
};

export const profile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile",
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `localhosh:3000/api/auth/reset-password/${resetToken}`;

    await sendMail({
      to: user.email,
      subject: "Reset your PrepPilot password",
      html: `<h1>Password Reset Request</h1>
             <p>Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link will expire in 15 minutes.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Reset token generated successfully",
      resetToken,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to generate reset token",
      error: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(hashedToken);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: err.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      res.status(400).json({
        success: false,
        message: "New password cannot be same as old password.",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: err.message,
    });
  }
};
