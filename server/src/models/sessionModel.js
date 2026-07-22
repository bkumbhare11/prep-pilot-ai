import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mode: {
      type: String,
      enum: ["interview", "practice"],
      required: true,
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    topics: {
      type: [String],
      required: function () {
        return this.mode === "practice";
      },
    },

    role: {
      type: String,
      trim: true,
      required: function () {
        return this.mode === "interview";
      },
    },

    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
      required: function () {
        return this.mode === "interview";
      },
    },

    techStack: {
      type: [String],
      required: function () {
        return this.mode === "interview";
      },
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    questionCount: {
      type: Number,
      min: 5,
      max: 30,
      required: true,
      default: 10,
    },
    questionType: {
      type: String,
      required: true,
      enum: ["theory", "mcq", "mixed"],
      default: "mixed",
    },

    answeredCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    errorMessage: {
      type: String,
      default: "",
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    overallFeedback: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    improvementTips: {
      type: [String],
      default: [],
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
