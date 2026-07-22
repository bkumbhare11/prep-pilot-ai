import Session from "../models/sessionModel.js";
import Question from "../models/questionsModel.js";
import { genrateQuestion, evaluateAnswers } from "../services/aiService.js";
import { success } from "zod";
import mongoose from "mongoose";

export const createSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessionDetails = req.body;

    const title =
      sessionDetails.mode === "interview"
        ? `${sessionDetails.role} Mock Interview`
        : sessionDetails.title;

    const session = await Session.create({
      ...sessionDetails,
      title,
      user: userId,
    });

    try {
      const questions = await genrateQuestion(session);

      const questionsDocs = questions.map((question) => ({
        ...question,
        session: session._id,
      }));

      const savedQuestions = await Question.insertMany(questionsDocs);

      session.status = "in-progress";
      await session.save();

      return res.status(201).json({
        success: true,
        message: "Session created successfully",
        data: {
          session,
          questions: savedQuestions,
        },
      });
    } catch (error) {
      await Session.findByIdAndDelete(session._id);
      throw error;
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create session",
      error: err.message,
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, userAnswer } = req.body;

    const question = await Question.findOne({
      _id: questionId,
      session: sessionId,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    let isFirstAnswer = !question.userAnswer;

    question.userAnswer = userAnswer;
    await question.save();

    if (isFirstAnswer) {
      await Session.findByIdAndUpdate(sessionId, {
        $inc: {
          answeredCount: 1,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Answer Received",
      data: question,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error submitting answer",
      error: err.message,
    });
  }
};

export const finishSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const questions = await Question.find({ session: sessionId });

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Questions not found",
      });
    }

    let hasUnanswered = questions.some((question) => !question.userAnswer);

    if (hasUnanswered) {
      return res.status(400).json({
        success: false,
        message: "All questions must be answered",
      });
    }

    const answersArray = questions.map((question) => {
      return {
        questionId: question._id,
        question: question.question,
        type: question.type,
        expectedAnswer: question.expectedAnswer,
        correctAnswer: question.correctAnswer,
        userAnswer: question.userAnswer,
      };
    });

    const evaluationResult = await evaluateAnswers(answersArray);
    console.log(evaluationResult);

    for (const result of evaluationResult.results) {
      await Question.findByIdAndUpdate(result.questionId, {
        score: result.score,
        feedback: result.feedback,
        idealAnswer: result.idealAnswer,
      });
    }

    const overallScore = Math.round(
      (evaluationResult.results.reduce((sum, item) => sum + item.score, 0) /
        (evaluationResult.results.length * 10)) *
        100,
    );

    session.overallScore = overallScore;
    session.overallFeedback = evaluationResult.overallFeedback;
    session.strengths = evaluationResult.strengths;
    session.weaknesses = evaluationResult.weaknesses;
    session.improvementTips = evaluationResult.improvementTips;
    session.status = "completed";
    session.completedAt = new Date();

    await session.save();

    return res.status(200).json({
      success: true,
      message: "Interview evaluated successfully",
      session,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error finishing session",
      error: err.message,
    });
  }
};

export const getResult = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await Session.findOne({
      _id: sessionId,
      user: userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Interview is not completed yet",
      });
    }

    const questions = await Question.find({ session: sessionId });

    res.status(200).json({
      success: true,
      message: "Session result fetched successfully",
      data: {
        session,
        questions,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching result",
      error: err.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, search } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let query = {
      user: userId,
    };

    const searchTerm = search?.trim();

    if (searchTerm) {
      query.$or = [
        {
          title: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          role: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ];
    }

    const sessions = await Session.find(query)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalSessions = await Session.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "History fetched successfully",
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
      message: "Error fetching history",
      error: err.message,
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await Session.findOne({
      _id: sessionId,
      user: userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }
    const questions = await Question.find({ session: sessionId });

    res.status(200).json({
      success: true,
      message: "Session found succeccfully",
      data: {
        session,
        questions,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get session",
      error: err.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const stats = await Session.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalSessions: {
            $sum: 1,
          },

          completedSessions: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "completed"],
                },
                1,
                0,
              ],
            },
          },

          incompleteSessions: {
            $sum: {
              $cond: [
                {
                  $ne: ["$status", "completed"],
                },
                1,
                0,
              ],
            },
          },

          practiceSessions: {
            $sum: {
              $cond: [
                {
                  $eq: ["$mode", "practice"],
                },
                1,
                0,
              ],
            },
          },

          interviewSessions: {
            $sum: {
              $cond: [
                {
                  $eq: ["$mode", "interview"],
                },
                1,
                0,
              ],
            },
          },

          averageScore: {
            $avg: {
              $cond: [
                {
                  $eq: ["$status", "completed"],
                },
                "$overallScore",
                null,
              ],
            },
          },
        },
      },
    ]);

    const recentSessions = await Session.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: stats[0],
        recentSessions,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard stats",
      error: error.message,
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await Session.findOne({ _id: sessionId, user: userId });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await session.deleteOne();
    await Question.deleteMany({ session: sessionId });

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot delete session",
      error: err.message,
    });
  }
};
