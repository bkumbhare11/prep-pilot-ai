import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import Question from "../models/questionsModel.js";
import { success } from "zod";

export const adminDashboard = async (req, res) => {
  try {
    let [
      totalUsers,
      totalSessions,
      interviewSessions,
      practiceSessions,
      completedSessions,
      pendingSessions,
      failedSessions,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Session.countDocuments(),
      Session.countDocuments({ mode: "interview" }),
      Session.countDocuments({ mode: "practice" }),
      Session.countDocuments({ status: "completed" }),
      Session.countDocuments({ status: "in-progress" }),
      Session.countDocuments({ status: "failed" }),
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: {
        totalUsers,
        totalSessions,
        interviewSessions,
        practiceSessions,
        completedSessions,
        pendingSessions,
        failedSessions,
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
    const { page = 1, limit = 10, search } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const searchTerm = search?.trim();
    const query = { role: "user" };

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const totalUsers = await User.countDocuments({ role: "user" });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        users,
        pagination: {
          totalUsers,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalUsers / limitNumber),
          limit: limitNumber,
        },
      },
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
          { name: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      })
        .select("_id")
        .lean();

      const userIds = matchedUsers.map((user) => user._id);

      query.$or = [
        {
          title: { $regex: searchTerm, $options: "i" },
        },
      ];

      if (userIds.length > 0) {
        query.$or.push({ user: { $in: userIds } });
      }
    }

    const sessions = await Session.find(query)
      .populate("user", "name email")
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalSessions = await Session.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      data: {
        sessions,
        pagination: {
          totalSessions,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalSessions / limitNumber) || 1,
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
