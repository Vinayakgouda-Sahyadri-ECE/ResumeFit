# ResumeFit: AI-Powered Resume & Cover Letter Assistant

ResumeFit is an intelligent, single-page web application that helps job seekers quickly **optimize their resumes** and **generate tailored cover letters** for specific job descriptions. By leveraging the power of **Google's Gemini AI**, ResumeFit analyzes your resume against a target role, delivers an **ATS-style Fit Score**, actionable feedback, and produces a polished cover letter you can download and use immediately.

---

## 🔗 Live Demo

[Visit the live demo of ResumeFit](https://resumefits.netlify.app/)

---

## ✨ Features

* **AI-Powered Resume Analysis** – Compare your resume to a job description to find key strengths and improvement areas.
* **Detailed ATS Report** – Get an overall **Fit Score** plus category scores (Tailoring, Content, ATS Essentials, etc.).
* **Qualitative Feedback** – "What's Great" and "Areas for Improvement" shown in clean, card-style summaries.
* **Automatic Cover Letter Generation** – Instantly create a professional, job-tailored cover letter highlighting your most relevant skills.
* **Versatile File Handling** – Paste text directly *or* upload `.txt` and `.pdf` files for both resume and job description.
* **AI-Powered File Validation** – Detects whether an uploaded file looks like a resume before processing.
* **PDF Downloads** – Export the analysis report, feedback summary, and generated cover letter as well-formatted PDF documents.
* **Fully Responsive Design** – Works smoothly on mobile, tablet, and desktop.
* **Single-Page Experience** – Input view transitions into the results view without page reloads for a smooth UX.

---

## 🚀 Getting Started

Follow these steps to run ResumeFit locally on your system.

### ✅ Prerequisites

You'll need:

* A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
* A text editor (VS Code, Sublime Text, Notepad++, etc.)

> **No build step required!** This project runs entirely in the browser—just open the HTML file.

---

## 📥 Installation & Setup

### 1. Download the Project Files

Download the following files and place them **all in the same folder**:

* `index.html`
* `styles.css`
* `script.js`
* `ResumeFit.png` (logo)

### 2. Get a Google Gemini API Key

1. Go to **Google AI Studio**.
2. Create or log in to your Google account.
3. Click **Create API Key** and follow the instructions.
4. Copy your newly generated key.

### 3. Add the API Key to the Code

Open `script.js` in your editor and find this line:

```js
const apiKey = 'YOUR_API_KEY'; // IMPORTANT: Add your API key here
```

Replace it with your actual key (keep the quotes):

```js
const apiKey = 'YOUR_API_KEY_HERE';
```

Save the file.

> ⚠️ **Security Note:** Never commit your real API key to a public repo. Use environment variables or a simple local config pattern if you plan to deploy beyond demos.

### 4. Run the Application

Locate `index.html` in your project folder and double-click it to open in your default browser. That’s it—ResumeFit will load and is ready to use!

---

## 🛠️ How to Use

1. **Provide Your Resume** – Paste your resume text into the left-hand text box **or** click **Upload File** to select a `.txt` or `.pdf` resume file.
2. **Provide the Job Description** – Paste or upload the target job description in the right-hand text box.
3. **Analyze** – Click **Analyze & Generate**.
4. **View Your Report** – The input view is replaced by the full analysis screen, showing:

   * ATS-style breakdown & Fit Score
   * Category-level scores
   * "What's Great" vs. "Areas for Improvement"
   * Generated cover letter
5. **Download PDFs** – Use the built-in buttons to export the report, feedback summary, and cover letter.

---

## 💻 Technologies Used

* **HTML5** – Application structure.
* **CSS3 & Tailwind CSS** – Responsive, modern styling and layout utilities.
* **JavaScript (ES6+)** – Client-side logic, UI interactivity, and AI requests.
* **Google Gemini API** – Core AI model powering analysis & content generation.
* **pdf.js** – Extracts text from uploaded PDF resumes/descriptions.
* **jsPDF** – Generates downloadable PDF reports and letters.

---

## 📁 File Structure

```
/
├── index.html        # Main application markup
├── styles.css        # Custom styles (Tailwind utilities may be imported/linked)
├── script.js         # Core application logic & API calls
└── ResumeFit.png     # App logo
```




