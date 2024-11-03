// const getResumeKeywords = async () => {
//   const response = await fetch('http://localhost:3001/get-resume-keywords', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       text1: { text: 'Your job description here...' },
//       textsi_1: { text: 'Your system instruction here...' },
//     }),
//   });

//   const data = await response.json();
//   setResponse(data.response);
// };

const getJobDescKeywords = async (jobDesc) => {
  const response = await fetch('http://localhost:3001/get-job-keywords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text1: jobDesc
    }),
  });

  const data = await response.json();
  return(data.response);
};

const getResumeSummary = async (filePath) => {
  const response = await fetch('http://localhost:3001/get-resume-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text1: filePath
    }),
  });

  const data = await response.json();
  return data.response;
};


const getResumeKeywords = async (resumeFile, jobDesc) => {
  const response = await fetch('http://localhost:3001/get-resume-keywords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document1: resumeFile
    }),
  });

  const data = await response.json();
  return(data.response);
};

export { getJobDescKeywords, getResumeSummary };