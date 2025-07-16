ResumeFit: AI-Powered Resume & Cover Letter Assistant
ResumeFit is an intelligent web application designed to help job seekers optimize their application materials. By leveraging the power of Google's Gemini AI, this tool analyzes a user's resume against a specific job description to provide a detailed ATS-style report, qualitative feedback, and a custom-generated cover letter.

This project was built to demonstrate a practical application of modern web technologies and AI integration in a user-friendly, single-page application format.

✨ Features
AI-Powered Resume Analysis: Compares your resume against a job description to identify key strengths and areas for improvement.

Detailed ATS Report: Generates a scannable report with an overall "Fit Score" and a breakdown of categories like Tailoring, Content, and ATS Essentials.

Qualitative Feedback: Provides clear, actionable advice on "What's Great" and "Areas for Improvement" in easy-to-read cards.

Automatic Cover Letter Generation: Creates a professional cover letter tailored to the specific job, highlighting your most relevant skills.

Versatile File Handling: Supports both pasting text directly and uploading .txt and .pdf files for both the resume and job description.

AI-Powered File Validation: Intelligently checks if an uploaded file appears to be a resume before processing.

PDF Downloads: Allows users to download the detailed report, feedback summary, and cover letter as professional PDF documents.

Fully Responsive Design: Works seamlessly on all devices, from mobile phones to desktop computers.

🚀 Getting Started
To get this project running on your local machine, follow these simple steps.

Prerequisites
You will need a modern web browser (like Chrome, Firefox, or Safari) and a text editor (like VS Code, Sublime Text, or Notepad++).

Installation & Setup
Download the Project Files:

Download the index.html and report.html files.

Download the ResumeFit.png logo file.

Place all three files in the same folder on your computer.

Get a Google Gemini API Key:

This project requires a Google Gemini API key to function. You can get a free key from Google AI Studio.

Click on "Create API key" and follow the instructions.

Add the API Key to the Code:

Open the index.html file in your text editor.

Find the line of code (around line 241) that says:

const apiKey = ''; // IMPORTANT: Add your API key here

Paste your newly generated API key between the single quotes:

const apiKey = 'YOUR_API_KEY_HERE';

Save the index.html file.

Run the Application:

Find the index.html file in your project folder and double-click it. It will open in your default web browser, and the application will be ready to use!

🛠️ How to Use
Provide Your Resume: Either paste your resume text into the left-hand text box or use the "Upload File" button to select a .txt or .pdf file.

Provide the Job Description: Do the same for the job description in the right-hand text box.

Analyze: Click the "Analyze & Generate" button.

View Your Report: A new browser tab will automatically open, displaying your detailed analysis, feedback, and generated cover letter.

💻 Technologies Used
HTML5: For the core structure of the application.

CSS3 & Tailwind CSS: For modern, responsive styling and layout.

JavaScript (ES6+): For all client-side logic, interactivity, and API communication.

Google Gemini API: The core AI engine for analysis and content generation.

pdf.js: A library by Mozilla used to read and extract text from uploaded PDF files.

jsPDF: A library used to generate and download the final reports as PDF files.
