window.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;
  
    let uploadedResumeContent = '';
    let uploadedJdContent = '';
    let analysisCompleted = false;
    let reportJson = null;

    
    const mainContent = document.getElementById('main-content');
    const resumeInput = document.getElementById('resume-input');
    const jobDescInput = document.getElementById('job-desc-input');
    const analyzeButton = document.getElementById('analyze-button');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultsSection = document.getElementById('results-section');
    const generalErrorMessage = document.getElementById('general-error-message');
    const generalErrorText = document.getElementById('general-error-text');

   
    const resumeUploadInput = document.getElementById('resume-upload-input');
    const resumeUploadSuccess = document.getElementById('resume-upload-success');
    const resumeUploadError = document.getElementById('resume-upload-error');
    const resumeFilename = document.getElementById('resume-filename');
    const resumeErrorText = document.getElementById('resume-error-text');
    const resumeClearButton = document.getElementById('resume-clear-button');
    const resumeClearErrorButton = document.getElementById('resume-clear-error-button');

    
    const jdUploadInput = document.getElementById('jd-upload-input');
    const jdUploadSuccess = document.getElementById('jd-upload-success');
    const jdFilename = document.getElementById('jd-filename');
    const jdClearButton = document.getElementById('jd-clear-button');

    const tabFeedback = document.getElementById('tab-feedback');
    const tabReport = document.getElementById('tab-report');
    const tabCoverLetter = document.getElementById('tab-cover-letter');

    const panelFeedback = document.getElementById('panel-feedback');
    const panelReport = document.getElementById('panel-report');
    const panelCoverLetter = document.getElementById('panel-cover-letter');

    const reportContainer = document.getElementById('report-container');
    const strengthsCard = document.getElementById('strengths-card');
    const improvementsCard = document.getElementById('improvements-card');
    const coverLetterContentWrapper = document.getElementById('cover-letter-content-wrapper');

    const copyButton = document.getElementById('copy-button');
    const downloadReportButton = document.getElementById('download-report-button');
    const downloadFeedbackButton = document.getElementById('download-feedback-button');
    const downloadCoverLetterButton = document.getElementById('download-cover-letter-button');
    const copyAlert = document.getElementById('copy-alert');

    
    function setLoading(isLoading, message = 'Analyzing...') {
        if (isLoading) {
            buttonText.textContent = message;
            loadingSpinner.classList.remove('hidden');
            analyzeButton.disabled = true;
        } else {
            buttonText.textContent = analysisCompleted ? 'Analyze Again' : 'Analyze & Generate';
            loadingSpinner.classList.add('hidden');
            analyzeButton.disabled = false;
        }
        generalErrorMessage.classList.add('hidden');
    }

    function showGeneralError(message) {
        generalErrorText.textContent = message;
        generalErrorMessage.classList.remove('hidden');
    }

    async function callGeminiAPI(payload) {
    const response = await fetch('/.netlify/functions/apiProxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result.text;  // Adjust depending on your proxy response
}

        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const result = await response.json();
        if (!result.candidates || result.candidates.length === 0) {
            throw new Error('Invalid response from AI.');
        }
        return result.candidates[0].content.parts[0].text;
    }

    
    async function validateResumeContent(text) {
        const prompt = `Is the following text from a professional resume? Answer only with "yes" or "no".\n\nText: "${text.substring(0, 500)}..."`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        try {
            const responseText = await callGeminiAPI(payload);
            return responseText.trim().toLowerCase().includes('yes');
        } catch (error) {
            console.error("Validation API call failed:", error);
            return false; // Fail safely
        }
    }

    async function getAIAssistance() {
        const resume = uploadedResumeContent || resumeInput.value;
        const jobDesc = uploadedJdContent || jobDescInput.value;

        if (!resume.trim() || !jobDesc.trim()) {
            showGeneralError('Please provide both a resume and a job description.');
            return;
        }

        setLoading(true);
        try {
            const prompt = `As an expert ATS resume analyzer, analyze the provided resume against the job description. Return a JSON object with the following structure:
                {
                  "overall_score": <a number between 1 and 100>,
                  "strengths": [<an array of strings highlighting what matches well>],
                  "improvements": [<an array of strings with actionable suggestions>],
                  "report": [
                    { "category": "Tailoring", "score": <a number>, "checks": [ { "name": "Keywords", "passed": <boolean> }, { "name": "Skills Match", "passed": <boolean> } ] },
                    { "category": "Content", "score": <a number>, "checks": [ { "name": "Quantifying Impact", "passed": <boolean> }, { "name": "Spelling & Grammar", "passed": <boolean> } ] },
                    { "category": "ATS Essentials", "score": <a number>, "checks": [ { "name": "ATS Parse Rate", "passed": <boolean> }, { "name": "Contact Info", "passed": <boolean> } ] }
                  ],
                  "cover_letter": "<a professional cover letter string>"
                }
            `;
            const payload = {
                contents: [{ role: 'user', parts: [{ text: `Resume:\n${resume}\n\nJob Description:\n${jobDesc}` }, { text: prompt }] }],
                generationConfig: { responseMimeType: 'application/json' }
            };

            const aiResponseText = await callGeminiAPI(payload);
            reportJson = JSON.parse(aiResponseText);

            renderFeedback(reportJson.strengths, reportJson.improvements);
            renderFullReport(reportJson.overall_score, reportJson.report);
            coverLetterContentWrapper.innerHTML = reportJson.cover_letter.replace(/\n/g, '<br>');

            mainContent.classList.add('hidden');
            resultsSection.classList.remove('hidden');

            analysisCompleted = true;

        } catch (error) {
            console.error('Error in AI processing chain:', error);
            showGeneralError('An error occurred during AI analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    }


    function renderFeedback(strengths, improvements) {
        strengthsCard.innerHTML = `
            <div class="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 mr-2"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88Z"></path></svg>
                <h3 class="text-lg font-semibold text-green-800">What's Great</h3>
            </div>
            <ul class="list-disc list-inside text-green-700 space-y-2">
                ${strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>`;
        improvementsCard.innerHTML = `
            <div class="flex items-center mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600 mr-2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
                <h3 class="text-lg font-semibold text-yellow-800">Areas for Improvement</h3>
            </div>
            <ul class="list-disc list-inside text-yellow-700 space-y-2">
                ${improvements.map(i => `<li>${i}</li>`).join('')}
            </ul>`;
    }

    function renderFullReport(overallScore, reportData) {
        const scoreColor = overallScore < 40 ? 'text-red-500' : overallScore < 70 ? 'text-yellow-500' : 'text-green-500';
        let reportHtml = `
            <div class="text-center border-b pb-4 mb-4">
                <h3 class="text-xl font-bold text-slate-800">Your Score</h3>
                <p class="text-5xl font-bold ${scoreColor}">${overallScore}<span class="text-3xl text-slate-400">/100</span></p>
            </div>
            <div class="space-y-2">
        `;

        reportData.forEach(category => {
            const categoryColor = category.score < 40 ? 'text-red-500' : category.score < 70 ? 'text-yellow-500' : 'text-green-500';
            reportHtml += `
                <div class="border rounded-lg">
                    <button class="accordion-toggle w-full flex justify-between items-center p-4 text-left font-semibold">
                        <span>${category.category}</span>
                        <div class="flex items-center">
                            <span class="font-bold mr-4 ${categoryColor}">${category.score}%</span>
                            <svg class="w-5 h-5 transform transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                        </div>
                    </button>
                    <div class="accordion-content px-4 pb-4">
                        <ul class="space-y-2 pt-2 border-t">
                            ${category.checks.map(check => `
                                <li class="flex items-center">
                                    ${check.passed
                                        ? `<svg class="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`
                                        : `<svg class="w-5 h-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`
                                    }
                                    <span>${check.name}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        reportHtml += `</div>`;
        reportContainer.innerHTML = reportHtml;
    }

    
    async function handleFileUpload(event, isResume) {
        const file = event.target.files[0];
        if (!file) return;

        analyzeButton.disabled = true;
        generalErrorMessage.classList.add('hidden');

        const inputEl = isResume ? resumeInput : jobDescInput;
        const successEl = isResume ? resumeUploadSuccess : jdUploadSuccess;
        const errorEl = isResume ? resumeUploadError : null;
        const filenameEl = isResume ? resumeFilename : jdFilename;
        const errorTextEl = isResume ? resumeErrorText : null;

        inputEl.placeholder = 'Reading file...';

        const processFileContent = async (content, filename) => {
            let isValid = true;
            if (isResume) {
                inputEl.placeholder = 'Validating file with AI...';
                isValid = await validateResumeContent(content);
            }

            if (isValid) {
                if (isResume) {
                    uploadedResumeContent = content;
                } else {
                    uploadedJdContent = content;
                }
                filenameEl.textContent = filename;
                inputEl.classList.add('hidden');
                successEl.classList.remove('hidden');
                if (errorEl) errorEl.classList.add('hidden');
            } else {
                if (errorTextEl) errorTextEl.textContent = "File does not appear to be a resume.";
                inputEl.classList.add('hidden');
                successEl.classList.add('hidden');
                if (errorEl) errorEl.classList.remove('hidden');
            }
            analyzeButton.disabled = false;
            inputEl.placeholder = isResume ? "Upload a .txt or .pdf file..." : "Upload a .txt or .pdf file...";
        };

        if (file.type === 'application/pdf') {
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const typedarray = new Uint8Array(e.target.result);
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        fullText += textContent.items.map(item => item.str).join(' ') + '\n';
                    }
                    await processFileContent(fullText, file.name);
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error("Error parsing PDF:", error);
                if(isResume && errorTextEl) errorTextEl.textContent = "Could not read the PDF file.";
                else showGeneralError("Could not read the PDF file for the Job Description.");
                if(errorEl) errorEl.classList.remove('hidden');
                analyzeButton.disabled = false;
            }
        } else { // Assume .txt
            const reader = new FileReader();
            reader.onload = async (e) => {
                await processFileContent(e.target.result, file.name);
            };
            reader.onerror = () => {
                if(isResume && errorTextEl) errorTextEl.textContent = "Failed to read the text file.";
                else showGeneralError("Failed to read the text file for the Job Description.");
                if(errorEl) errorEl.classList.remove('hidden');
                analyzeButton.disabled = false;
            };
            reader.readAsText(file);
        }
    }

    function handleClearFile(isResume) {
        if (isResume) {
            uploadedResumeContent = '';
            resumeUploadInput.value = '';
            resumeInput.classList.remove('hidden');
            resumeUploadSuccess.classList.add('hidden');
            resumeUploadError.classList.add('hidden');
        } else {
            uploadedJdContent = '';
            jdUploadInput.value = '';
            jobDescInput.classList.remove('hidden');
            jdUploadSuccess.classList.add('hidden');
        }
    }

    function downloadAsPdf(type) {
        if (!reportJson) return;
        const doc = new jsPDF();
        let y = 15;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('ResumeFit Analysis Report', 105, y, { align: 'center' });
        y += 10;

        if (type === 'report') {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Overall Score:', 105, y, { align: 'center' });
            y += 10;

            const scoreColor = reportJson.overall_score < 40 ? '#ef4444' : reportJson.overall_score < 70 ? '#f59e0b' : '#22c55e';
            doc.setFontSize(28);
            doc.setTextColor(scoreColor);
            doc.text(`${reportJson.overall_score} / 100`, 105, y, { align: 'center' });
            y += 15;
            doc.setTextColor('#000000');

            reportJson.report.forEach(cat => {
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(`${cat.category} (${cat.score}%)`, 14, y);
                y += 8;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
                cat.checks.forEach(check => {
                    doc.text(`- ${check.name}: ${check.passed ? 'Passed' : 'Failed'}`, 20, y);
                    y += 7;
                });
                y += 5;
            });
            doc.save('resume-report.pdf');

        } else if (type === 'feedback') {
             doc.setFontSize(16);
             doc.setFont('helvetica', 'bold');
             doc.text("Feedback Summary", 14, y);
             y += 10;

             doc.setFontSize(14);
             doc.setTextColor('#166534'); // green
             doc.text("What's Great", 14, y);
             y += 8;
             doc.setFont('helvetica', 'normal');
             doc.setFontSize(12);
             doc.setTextColor('#000000');
             const strengths = doc.splitTextToSize(reportJson.strengths.map(s => `• ${s}`).join('\n'), 180);
             doc.text(strengths, 14, y);
             y += strengths.length * 5 + 10;

             doc.setFontSize(14);
             doc.setFont('helvetica', 'bold');
             doc.setTextColor('#d97706'); // yellow
             doc.text("Areas for Improvement", 14, y);
             y += 8;
             doc.setFont('helvetica', 'normal');
             doc.setFontSize(12);
             doc.setTextColor('#000000');
             const improvements = doc.splitTextToSize(reportJson.improvements.map(i => `• ${i}`).join('\n'), 180);
             doc.text(improvements, 14, y);
             doc.save('resume-feedback.pdf');

        } else if (type === 'cover-letter') {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("Generated Cover Letter", 14, y);
            y += 10;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            const letter = doc.splitTextToSize(reportJson.cover_letter, 180);
            doc.text(letter, 14, y);
            doc.save('cover-letter.pdf');
        }
    }


    
    analyzeButton.addEventListener('click', getAIAssistance);
    resumeUploadInput.addEventListener('change', (e) => handleFileUpload(e, true));
    jdUploadInput.addEventListener('change', (e) => handleFileUpload(e, false));
    resumeClearButton.addEventListener('click', () => handleClearFile(true));
    resumeClearErrorButton.addEventListener('click', () => handleClearFile(true));
    jdClearButton.addEventListener('click', () => handleClearFile(false));

   
    const tabs = [tabReport, tabFeedback, tabCoverLetter];
    const panels = [panelReport, panelFeedback, panelCoverLetter];

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.replace('tab-active', 'tab-inactive'));
            panels.forEach(p => p.classList.add('hidden'));

            tab.classList.replace('tab-inactive', 'tab-active');
            panels[index].classList.remove('hidden');
        });
    });


    reportContainer.addEventListener('click', function(e) {
        const toggle = e.target.closest('.accordion-toggle');
        if (toggle) {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('svg');
            icon.classList.toggle('rotate-180');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    });

    copyButton.addEventListener('click', () => {
        const coverLetterContent = coverLetterContentWrapper.innerText ?? '';
        navigator.clipboard.writeText(coverLetterContent)
            .then(() => {
                copyAlert.classList.remove('opacity-0');
                setTimeout(() => copyAlert.classList.add('opacity-0'), 3000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
                showGeneralError('Could not copy text to clipboard.');
            });
    });

    downloadReportButton.addEventListener('click', () => downloadAsPdf('report'));
    downloadFeedbackButton.addEventListener('click', () => downloadAsPdf('feedback'));
    downloadCoverLetterButton.addEventListener('click', () => downloadAsPdf('cover-letter'));
});

