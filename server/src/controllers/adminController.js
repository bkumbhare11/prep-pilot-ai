import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import Question from "../models/questionsModel.js";
import { success } from "zod";

export const adminDashboard = async (req, res) => {
  try {
    let [totalUsers, totalSessions, interviewSessions, practiceSessions] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        Session.countDocuments(),
        Session.countDocuments({ mode: "interview" }),
        Session.countDocuments({ mode: "practice" }),
      ]);

    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: {
        totalUsers,
        totalSessions,
        interviewSessions,
        practiceSessions,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error getting dashboard",
      error: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const sessions = await Session.find({ user: userId });

    const sessionIds = sessions.map((session) => session._id);

    await Question.deleteMany({
      session: { $in: sessionIds },
    });

    await Session.deleteMany({
      user: userId,
    });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err.message,
    });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const searchTerm = search?.trim();

    const query = {};

    if (searchTerm) {
      const matchedUsers = await User.find({
        $or: [
          {
            name: { $regex: searchTerm, $options: "i" },
          },
          {
            email: { $regex: searchTerm, $options: "i" },
          },
        ],
      });

      const userIds = matchedUsers.map((user) => user._id);

      query.user = { $in: userIds };
    }

    const sessions = await Session.find(query)
      .populate("user", "name email")
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalSessions = await Session.countDocuments();

    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      data: {
        sessions,
        pagination: {
          totalSessions,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalSessions / limitNumber),
          limit: limitNumber,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching sessions",
      error: err.message,
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }
    await Question.deleteMany({
      session: sessionId,
    });

    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting session",
      error: err.message,
    });
  }
};
