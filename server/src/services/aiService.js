import { GoogleGenerativeAI } from "@google/generative-ai";
import { json } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL,
});

function getQuestionType(questionType) {
  if (questionType === "mcq") {
    return `
- Generate only MCQ questions.
- Every question must have type: "mcq".
- Every question must include options and correctAnswer.
`;
  }

  if (questionType === "theory") {
    return `
- Generate only theory questions.
- Every question must have type: "theory".
- Every question must include expectedAnswer.
`;
  }

  return `
- Generate a balanced mix of MCQ and theory questions.
- MCQ questions must include options and correctAnswer.
- Theory questions must include expectedAnswer.
`;
}

const buildPracticePrompt = (session) => {
  return `
You are an expert technical interviewer.

Generate ${session.questionCount} ${session.difficulty} level practice questions.

Topics:
${session.topics.join(", ")}

Question Type:
${session.questionType}

Rules:
- Return only valid JSON.
- Do not include markdown.
- Do not include code fences.
- Do not include explanations outside JSON.
- JSON must be an array.
${getQuestionType(session.questionType)}
- For MCQ questions, options must contain exactly 4 options.
- correctAnswer must match one option exactly.
- Keep questions practical and interview-relevant.
- Each question must be self-contained and complete.
- If a question is code-based, include the complete code snippet inside the "question" field.
- Never ask "What is the output of the following code?" or similar unless the complete code snippet is included in the question.

JSON format:
[
  {
    "question": "Question text",
    "type": "theory",
    "expectedAnswer": "Expected answer text"
  },
  {
    "question": "Question text",
    "type": "mcq",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A"
  }
]
`;
};

const buildInterviewPrompt = (session) => {
  return `
You are an expert technical interviewer.

Generate ${session.questionCount} ${session.difficulty} level mock interview questions.

Candidate details:
Role: ${session.role}
Experience Level: ${session.experienceLevel}
Tech Stack: ${session.techStack.join(", ")}

Question Type:
${session.questionType}

Rules:
- Return only valid JSON.
- Do not include markdown.
- Do not include code fences.
- Do not include explanations outside JSON.
- JSON must be an array.
${getQuestionType(session.questionType)}
- For MCQ questions, options must contain exactly 4 options.
- correctAnswer must match one option exactly.
- Questions should match the role, experience level, and tech stack.
- Keep questions practical and interview-relevant.
- Each question must be self-contained and complete.
- If a question is code-based, include the complete code snippet inside the "question" field.
- Never ask "What is the output of the following code?" or similar unless the complete code snippet is included in the question.

JSON format:
[
  {
    "question": "Question text",
    "type": "theory",
    "expectedAnswer": "Expected answer text"
  },
  {
    "question": "Question text",
    "type": "mcq",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A"
  }
]
`;
};

export const evaluateAnswersPrompt = (answersArray) => {
  return `
You are a senior technical interviewer.

Evaluate the candidate's answers.

Instructions:
- Evaluate EVERY question in the input array.
- Do NOT skip any question.
- Return EXACTLY one result for each input question.
- Do NOT modify the questionId. Return the exact same questionId received in the input.
- If question type is "mcq", compare userAnswer with correctAnswer.
- If question type is "theory" or "coding", compare userAnswer with expectedAnswer.
- Score must be an integer between 0 and 10.
- Give concise, constructive feedback.
- Provide the best possible ideal answer.
- Also provide an overall interview feedback, strengths, weaknesses and improvement tips.
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT wrap the response inside \`\`\`json.
- Do NOT add any explanation before or after the JSON.
For MCQ questions, scoring must be strict:
- If userAnswer matches correctAnswer, score 10.
- If userAnswer does not match correctAnswer, score 0.

Candidate Answers:
${JSON.stringify(answersArray)}

Return JSON in the following format:

{
  "results": [
    {
      "questionId": "same questionId",
      "score": 8,
      "feedback": "Short constructive feedback.",
      "idealAnswer": "Best possible answer."
    }
  ],
  "overallFeedback": "Overall interview performance summary.",
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "improvementTips": [
    "Improvement Tip 1",
    "Improvement Tip 2"
  ]
}
`;
};

let prompt = "";

export const genrateQuestion = async (session) => {
  try {
    if (session.mode === "practice") {
      console.log(session);
      prompt = buildPracticePrompt(session);
    }

    if (session.mode === "interview") {
      console.log(session);
      prompt = buildInterviewPrompt(session);
    }

    const result = await model.generateContent(prompt);
    console.log(result);

    const response = result.response;

    const text = response.text();
    // console.log(text);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanText);
    // console.log(questions);
    console.log(Array.isArray(questions));

    return questions;

    // console.log(prompt);
  } catch (err) {
    throw err;
  }
};

export const evaluateAnswers = async (answersArray) => {
  try {
    prompt = evaluateAnswersPrompt(answersArray);

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const evaluation = JSON.parse(text);

    return evaluation;
  } catch (err) {
    throw err;
  }
};
