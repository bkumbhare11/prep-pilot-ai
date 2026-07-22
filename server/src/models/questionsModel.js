import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["mcq", "theory"],
      required: true,
    },

    options: {
      type: [String],
      default: [],
      required: function () {
        return this.type === "mcq";
      },
    },

    correctAnswer: {
      type: String,
      default: "",
      required: function () {
        return this.type === "mcq";
      },
    },

    codeSnippet: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    idealAnswer: {
      type: String,
      default: "",
    },

    idealCodeSnippet: {
      type: String,
      default: "",
    },

    idealCodeLanguage: {
      type: String,
      default: "",
    },

    userAnswer: {
      type: String,
      default: "",
    },

    feedback: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
