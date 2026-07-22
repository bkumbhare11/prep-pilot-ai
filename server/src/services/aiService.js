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
- Every question must include exactly 4 options.
- Every question must include options and correctAnswer.
`;
  }

  if (questionType === "theory") {
    return `
- Generate only theory questions.
- Every question must have type: "theory".
- Every question must include expectedAnswer.
- If the ideal answer requires code, also include idealCodeSnippet and idealCodeLanguage.
`;
  }

  return `
- Generate a balanced mix of MCQ and theory questions.
- MCQ questions must include options and correctAnswer.
- Theory questions must include expectedAnswer.
- If the ideal answer requires code, also include idealCodeSnippet and idealCodeLanguage.
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
- Return ONLY valid JSON.
- Do NOT include explanations outside the JSON.
- JSON must be an array.
${getQuestionType(session.questionType)}

General Rules:
- Keep questions practical, realistic and interview-relevant.
- Every question must be self-contained.
- Never generate duplicate questions.
- Never wrap JSON inside markdown.

Question Code Rules:
- If the QUESTION contains code:
  - Put only the question text inside "question".
  - Put the code inside "codeSnippet".
  - Put the programming language inside "language".
  - Preserve indentation.
  - Never include markdown code fences.
- If the question has no code:
  - codeSnippet = ""
  - language = ""

MCQ Rules:
- Must contain exactly 4 options.
- correctAnswer must exactly match one option.

Theory Rules:
- Provide the best explanation inside "idealAnswer".
- If an example code is required:
  - Put ONLY explanation inside "idealAnswer".
  - Put ONLY code inside "idealCodeSnippet".
  - Put language inside "idealCodeLanguage".
  - Never use markdown code fences.
- If code is not required:
  - idealCodeSnippet = ""
  - idealCodeLanguage = ""

Example:

[
  {
    "question": "Explain the difference between let and const.",
    "type": "theory",
    "codeSnippet": "",
    "language": "",
    "idealAnswer": "let allows reassignment whereas const does not.",
    "idealCodeSnippet": "",
    "idealCodeLanguage": ""
  },
  {
    "question": "What will be logged to the console?",
    "type": "mcq",
    "codeSnippet": "const arr = [1,2,3];\\nconsole.log(arr.length);",
    "language": "javascript",
    "options": [
      "2",
      "3",
      "undefined",
      "Error"
    ],
    "correctAnswer": "3"
  }
]
`;
};

const buildInterviewPrompt = (session) => {
  return `
You are an expert technical interviewer.

Generate ${session.questionCount} ${session.difficulty} level mock interview questions.

Candidate Details:

- Role: ${session.role}
- Experience Level: ${session.experienceLevel}
- Tech Stack: ${session.techStack.join(", ")}

Question Type:
${session.questionType}

Rules:
- Return ONLY valid JSON.
- Do NOT include explanations outside the JSON.
- JSON must be an array.
${getQuestionType(session.questionType)}

General Rules:
- Questions must match the candidate's role, experience level and tech stack.
- Keep questions practical, realistic and interview-relevant.
- Every question must be self-contained.
- Never generate duplicate questions.
- Never wrap JSON inside markdown.

Question Code Rules:
- If the QUESTION contains code:
  - Put only the question text inside "question".
  - Put the code inside "codeSnippet".
  - Put the programming language inside "language".
  - Preserve indentation.
  - Never include markdown code fences.
- If the question has no code:
  - codeSnippet = ""
  - language = ""

MCQ Rules:
- Must contain exactly 4 options.
- correctAnswer must exactly match one option.

Theory Rules:
- Provide the best explanation inside "idealAnswer".
- If an example code is required:
  - Put ONLY explanation inside "idealAnswer".
  - Put ONLY code inside "idealCodeSnippet".
  - Put language inside "idealCodeLanguage".
  - Never use markdown code fences.
- If code is not required:
  - idealCodeSnippet = ""
  - idealCodeLanguage = ""

Example:

[
  {
    "question": "Explain the difference between let and const.",
    "type": "theory",
    "codeSnippet": "",
    "language": "",
    "idealAnswer": "let allows reassignment whereas const does not.",
    "idealCodeSnippet": "",
    "idealCodeLanguage": ""
  },
  {
    "question": "What will be logged to the console?",
    "type": "mcq",
    "codeSnippet": "const arr = [1,2,3];\\nconsole.log(arr.length);",
    "language": "javascript",
    "options": [
      "2",
      "3",
      "undefined",
      "Error"
    ],
    "correctAnswer": "3"
  }
]
`;
};

export const evaluateAnswersPrompt = (answersArray) => {
  return `
You are a senior technical interviewer.

Evaluate the candidate's answers professionally and objectively.

Instructions:

- Evaluate EVERY question in the input array.
- Never skip any question.
- Return EXACTLY one result for every input question.
- Do NOT modify the questionId.
- Return the exact same questionId received in the input.
- Return ONLY valid JSON.
- Do NOT include Markdown.
- Do NOT wrap the response inside \`\`\`json.
- Do NOT include any explanation before or after the JSON.

========================
MCQ Evaluation
========================

- Compare userAnswer with correctAnswer.
- If userAnswer exactly matches correctAnswer:
  - score = 10
- Otherwise:
  - score = 0
- Do NOT generate idealAnswer.
- Do NOT generate idealCodeSnippet.
- Do NOT generate idealCodeLanguage.
- Feedback should briefly explain why the selected answer is correct or incorrect.
- Feedback MUST reference ONLY the current question.

========================
Theory Evaluation
========================

- Compare userAnswer with idealAnswer.
- Use the complete score range from 0 to 10.
- Partial understanding should receive partial marks.
- Give 10 only for a technically complete and accurate answer.

Generate:

- idealAnswer
- idealCodeSnippet
- idealCodeLanguage

Rules:

- idealAnswer should contain ONLY the explanation.
- If code is required:
  - Put ONLY code inside idealCodeSnippet.
  - Set idealCodeLanguage correctly.
- If code is not required:
  - idealCodeSnippet = ""
  - idealCodeLanguage = ""
- Never include Markdown code fences.

========================
Feedback Rules
========================

Feedback MUST:

- Be based ONLY on the current question.
- Never reference another question.
- Never mention concepts, APIs, functions or code that are not present in the current question.
- If the question contains code, explain THAT code only.
- Be concise, constructive and specific.
- Avoid generic feedback.

========================
Overall Interview Feedback
========================

After evaluating every question generate:

- overallFeedback
- strengths
- weaknesses
- improvementTips

Rules:

- overallFeedback should summarize the entire performance.
- strengths should contain 2-5 concise points.
- weaknesses should contain 2-5 concise points.
- improvementTips should contain practical and actionable suggestions.

Candidate Answers:

${JSON.stringify(answersArray)}

Return JSON in exactly this format:

{
  "results": [
    {
      "questionId": "same questionId",
      "score": 8,
      "feedback": "Concise constructive feedback.",

      "idealAnswer": "Best possible explanation.",

      "idealCodeSnippet": "",

      "idealCodeLanguage": ""
    }
  ],

  "overallFeedback": "Overall interview summary.",

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
