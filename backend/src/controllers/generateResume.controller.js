// resumeTemplate.js
function generateResumeHTML(data) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${data.name} - Resume</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #000000;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        line-height: 1.4;
      }
      .container {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 2px solid #0073b1;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .header-text {
        max-width: 70%;
      }
      .header-text h1 {
        color: #0073b1;
        margin: 0;
        font-size: 28px;
        font-weight: bold;
      }
      .header-text h2 {
        margin: 5px 0 10px 0;
        font-size: 18px;
        font-weight: bold;
        color: #444;
      }
      .header-text p {
        margin: 2px 0;
        font-size: 14px;
      }
      .header img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
      }
      .section {
        margin-bottom: 20px;
      }
      .section h3 {
        background-color: #e6f0f7;
        color: #0073b1;
        padding: 5px 10px;
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 10px 0;
        text-transform: uppercase;
      }
      .experience, .education-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .experience div:first-child, .education-item div:first-child {
        max-width: 75%;
      }
      .experience-title, .education-title {
        font-weight: bold;
      }
      .skills-list, .info-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 14px;
      }
      .skills-list span, .info-list span {
        background-color: #f0f0f0;
        padding: 3px 8px;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="header-text">
          <h1>${data.name}</h1>
          <h2>${data.title}</h2>
          <p>${data.address}</p>
          <p>${data.phone} | ${data.email}</p>
        </div>
      </div>

      <!-- Summary -->
      <div class="section">
        <h3>Summary</h3>
        <p>${data.summary}</p>
      </div>

      <!-- Professional Experience -->
      <div class="section">
        <h3>Professional Experience</h3>
        ${data.experience.map(exp => `
        <div class="experience">
          <div>
            <div class="experience-title">${exp.position}, ${exp.company}</div>
            <ul>
              ${exp.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
          <div>${exp.startDate} — ${exp.endDate}</div>
        </div>
        `).join('')}
      </div>

      <!-- Education -->
      <div class="section">
        <h3>Education</h3>
        ${data.education.map(edu => `
        <div class="education-item">
          <div>
            <div class="education-title">${edu.degree}</div>
            <div>${edu.institution}</div>
          </div>
          <div>${edu.startDate} — ${edu.endDate}</div>
        </div>
        `).join('')}
      </div>

      <!-- Technical Skills -->
      <div class="section">
        <h3>Technical Skills</h3>
        <div class="skills-list">
          ${data.skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>
      </div>

      <!-- Additional Information -->
      <div class="section">
        <h3>Additional Information</h3>
        <div class="info-list">
          <span><strong>Languages:</strong> ${data.languages}</span>
          <span><strong>Certificates:</strong> ${data.certificates}</span>
          <span><strong>Awards/Activities:</strong> ${data.awards}</span>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

export {generateResumeHTML};
