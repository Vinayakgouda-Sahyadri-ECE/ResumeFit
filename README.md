

# ResumeFit: AI-Powered Resume & Cover Letter Assistant

ResumeFit is an intelligent web application designed to help job seekers optimize their application materials. By leveraging the power of Google's Gemini AI, this tool analyzes a user's resume against a specific job description to provide a detailed ATS-style report, qualitative feedback, and a custom-generated cover letter.

This project was built to demonstrate a practical application of modern web technologies and AI integration in a user-friendly, single-page application format.

https://68778b660ee2a1a491f8e303--resumefits.netlify.app/
---

## ✨ Features

* **AI-Powered Resume Analysis:** Compares your resume against a job description to identify key strengths and areas for improvement.
* **Detailed ATS Report:** Generates a scannable report with an overall "Fit Score" and a breakdown of categories like Tailoring, Content, and ATS Essentials.
* **Qualitative Feedback:** Provides clear, actionable advice on "What's Great" and "Areas for Improvement" in easy-to-read cards.
* **Automatic Cover Letter Generation:** Creates a professional cover letter tailored to the specific job, highlighting your most relevant skills.
* **Versatile File Handling:** Supports both pasting text directly and uploading `.txt` and `.pdf` files for both the resume and job description.
* **AI-Powered File Validation:** Intelligently checks if an uploaded file appears to be a resume before processing.
* **PDF Downloads:** Allows users to download the detailed report, feedback summary, and cover letter as professional PDF documents.
* **Fully Responsive Design:** Works seamlessly on all devices, from mobile phones to desktop computers.
* **Single-Page Experience:** The entire application runs on a single page, with the report dynamically replacing the input view for a smooth user experience.

---

## 🚀 Getting Started

To get this project running on your local machine, follow these simple steps.

### Prerequisites

* A modern web browser (Chrome, Firefox, or Safari)
* A text editor (VS Code, Sublime Text, or Notepad++)

---

### Installation & Setup

1. **Download the Project Files:**

   * Download the `index.html` file.
   * Download the `ResumeFit.png` logo file.
   * Place both files in the same folder on your computer.

2. **Get a Google Gemini API Key:**

   * This project requires a Google Gemini API key to function. You can get a free key from [Google AI Studio](https://aistudio.google.com/).
   * Click on **Create API key** and follow the instructions.

3. **Add the API Key to the Code:**

   * Open the `index.html` file in your text editor.
   * Find the line of code (around **line 332**) that says:

     ```javascript
     const apiKey = ''; // IMPORTANT: Add your API key here
     ```
   * Paste your newly generated API key between the single quotes:

     ```javascript
     const apiKey = 'YOUR_API_KEY_HERE';
     ```
   * Save the `index.html` file.

4. **Run the Application:**

   * Find the `index.html` file in your project folder and double-click it.
     It will open in your default web browser, and the application will be ready to use!

---

## 🛠️ How to Use

1. **Provide Your Resume:** Either paste your resume text into the left-hand text box or use the **Upload File** button to select a `.txt` or `.pdf` file.
2. **Provide the Job Description:** Do the same for the job description in the right-hand text box.
3. **Analyze:** Click the **Analyze & Generate** button.
4. **View Your Report:** The input view will be replaced by a full report, including detailed analysis, feedback, and a generated cover letter, all on the same page.

---

## 💻 Technologies Used

* **HTML5:** For the core structure of the application.
* **CSS3 & Tailwind CSS:** For modern, responsive styling and layout.
* **JavaScript (ES6+):** For all client-side logic, interactivity, and API communication.
* **Google Gemini API:** The core AI engine for analysis and content generation.
* **pdf.js:** A library by Mozilla used to read and extract text from uploaded PDF files.
* **jsPDF:** A library used to generate and download the final reports as PDF files.


