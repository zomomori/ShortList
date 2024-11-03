const express = require('express');
const cors = require('cors');
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const vertex_ai = new VertexAI({
  project: process.env.REACT_APP_PROJECT_ID,
  location: process.env.REACT_APP_LOCATION,
});

const textsi_1 = {text: `You are a recruiter tasked with identifying key skills and experience from a job description for the purpose of filtering resumes.  Your goal is to extract specific keywords that accurately reflect the job requirements and can be used to quickly identify suitable candidates.

    Instructions:
    
    1. Analyze the provided job description.
    2. Extract keywords that are single words or short phrases (2-3 words maximum) directly from the text.  Do not generalize or interpret the job requirements.
    3. Focus on skills, qualifications, software/tools, and experience mentioned in the job description. Include any specific degree or years of experience as keywords.
    4.  Return the extracted keywords as a list of Strings.
    
    Job Description:`};

const textsi_2 = {text: `You are a "Resume Summarizer." Your task is to create a concise summary of a provided resume, highlighting the individual's skills and qualifications.

    **Instructions:**
    
    1. Carefully analyze the resume content provided in the attached resume document.
    2. Extract the most relevant information, focusing on the individual's skills, qualifications, and experience.
    3. Generate a concise summary of the resume, no more than 180 words. This summary should provide a brief overview of the individual's professional background and key accomplishments.
    4. Be specific and avoid generic terms.  Prioritize technical skills, certifications, and relevant qualifications.
    5. Ensure the overall output is well-organized, easy to read, and highlights the individual's strengths.
    
    **Output Format:**
    [Concise summary of the resume]`
    }

app.post('/get-job-keywords', async (req, res) => {
  const { text1 } = req.body;
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: process.env.REACT_APP_MODEL,
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0,
      topP: 0.95,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'OFF' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'OFF' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'OFF' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'OFF' },
    ],
    systemInstruction: {
      parts: [textsi_1],
    },
  });

  const reqBody = {
    contents: [{ role: 'user', parts: [{text: text1}] }],
  };

  try {
    const streamingResp = await generativeModel.generateContentStream(reqBody);
    let aggregatedResponse = '';

    for await (const item of streamingResp.stream) {
      aggregatedResponse += JSON.stringify(item.candidates[0].content.parts[0].text);
    }
    const startIndex = aggregatedResponse.indexOf('[');
    const endIndex = aggregatedResponse.lastIndexOf(']');
    const cleanString = aggregatedResponse.substring(startIndex + 1, endIndex)
    .replace(/"""|\\\\"|\\n|\\r|\\t|\\"|\\'|['"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
    res.json({ response: cleanString });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
});

function getDocumentFromPdf(filePath) {
    // Read the PDF file from the specified file path
    const pdfData = fs.readFileSync(filePath);
  
    // Convert the binary data to a Base64 string
    const base64Data = pdfData.toString('base64');
  
    // Create the document object
    const document1 = {
      inlineData: {
        mimeType: 'application/pdf',
        data: base64Data
      }
    };
  
    return document1;
  }
  
app.post('/get-resume-summary', async (req, res) => {
    const { text1 } = req.body;
    
    console.log(text1);
    document1 = getDocumentFromPdf(text1);
    const generativeModel = vertex_ai.preview.getGenerativeModel({
        model: process.env.REACT_APP_MODEL,
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 0,
          topP: 0.95,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'OFF' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'OFF' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'OFF' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'OFF' },
        ],
        systemInstruction: {
          parts: [textsi_2],
        },
      });
    const reqBody = {
        contents: [{role: 'user', parts: [document1, {text: `Resume`}]}],
    };
    try {
        const streamingResp = await generativeModel.generateContentStream(reqBody);
        let aggregatedResponse = '';
    
        for await (const item of streamingResp.stream) {
          aggregatedResponse += JSON.stringify(item.candidates[0].content.parts[0].text);
        }
        const cleanString = aggregatedResponse.replace(/"""|\\\\"|\\n|\\r|\\t|\\"|\\'|['"]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
        console.log(cleanString);
        res.json({ response: cleanString });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content' });
    }
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
