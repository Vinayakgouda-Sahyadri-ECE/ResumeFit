
# ResumeFit: AI-Powered Resume & Cover Letter Assistant

ResumeFit is an intelligent web application designed to help job seekers optimize their application materials. By leveraging the power of Google's Gemini AI, this tool analyzes a user's resume against a specific job description to provide a detailed ATS-style report, qualitative feedback, and a custom-generated cover letter.

This project was built to demonstrate a practical application of modern web technologies and AI integration in a user-friendly, single-page application format.

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

---

## 🚀 Getting Started

To get this project running on your local machine, follow these steps:

### Prerequisites

* A modern web browser (Chrome, Firefox, or Safari)
* A text editor (VS Code, Sublime Text, or Notepad++)

---

### Installation & Setup

1. **Download the Project Files**

   * Download the `index.html` and `report.html` files.
   * Download the `ResumeFit.png` logo file.
   * Place all three files in the same folder on your computer.

2. **Get a Google Gemini API Key**

   * Go to [Google AI Studio](https://aistudio.google.com/) and create an API key.

3. **Add the API Key to the Code**

   * Open `index.html` in your text editor.
   * Find the line (around **line 241**) that says:

     ```javascript
     const apiKey = ''; // IMPORTANT: Add your API key here
     ```
   * Replace with your key:

     ```javascript
     const apiKey = 'YOUR_API_KEY_HERE';
     ```
   * Save the file.

4. **Run the Application**

   * Double-click `index.html` to open in your default browser.

---

## 🛠️ How to Use

1. Paste or upload your **resume** on the left.
2. Paste or upload the **job description** on the right.
3. Click **Analyze & Generate**.
4. A new tab will display:

   * Detailed analysis report
   * Feedback summary
   * Auto-generated cover letter

---

## 💻 Technologies Used

* **HTML5** – Core structure
* **CSS3 & Tailwind CSS** – Styling and responsiveness
* **JavaScript (ES6+)** – Logic and API communication
* **Google Gemini API** – AI-powered analysis
* **pdf.js** – Extract text from PDFs
* **jsPDF** – Generate downloadable PDFs


