const templates = [
  {
    template: "resume1",
    category: "Resume",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{name}} - Resume</title>
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
        <h1>{{name}}</h1>
        <h2>{{title}}</h2>
        <p>{{address}}</p>
        <p>{{phone}} | {{email}}</p>
      </div>
    </div>

    <!-- Summary -->
    <div class="section">
      <h3>Summary</h3>
      <p>{{summary}}</p>
    </div>

    <!-- Professional Experience -->
    <div class="section">
      <h3>Professional Experience</h3>
      {{#experience}}
        <div class="experience">
          <div>
            <p class="experience-title">{{role}} at {{company}}</p>
            <p>{{description}}</p>
          </div>
          <div>
            <p>{{duration}}</p>
          </div>
        </div>
      {{/experience}}
    </div>

    <!-- Education -->
    <div class="section">
      <h3>Education</h3>
      {{#education}}
        <div class="education-item">
          <div>
            <p class="education-title">{{degree}}, {{college}}</p>
          </div>
          <div>
            <p>{{year}}</p>
          </div>
        </div>
      {{/education}}
    </div>

    <!-- Technical Skills -->
    <div class="section">
      <h3>Technical Skills</h3>
      <div class="skills-list">
        {{#skills}}
          <span>{{.}}</span>
        {{/skills}}
      </div>
    </div>

    <!-- Additional Information -->
    <div class="section">
      <h3>Additional Information</h3>
      <div class="info-list">
        <span><strong>Languages:</strong> {{languages}}</span>
        <span><strong>Certificates:</strong> {{certificates}}</span>
        <span><strong>Awards/Activities:</strong> {{awards}}</span>
      </div>
    </div>
  </div>
</body>
</html>
`
  },
  {
    template: "resume2",
    category: "Resume",
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
      rel="stylesheet"
      crossorigin="anonymous"
    />
    <title>{{name}} - CV</title>
  </head>
  <body>
    <div style="color: rgb(41, 50, 63)">
      <div class="d-flex flex-sm-row flex-column align-items-center">
        <div class="bg-info bg-gradient bg-opacity-10 p-2 ps-4 w-sm-75 w-100 text-sm-start text-center">
          <h1 class="fs-1 fw-bolder text-uppercase">{{name}}</h1>
          <h3 class="fs-4 text-uppercase">{{title}}</h3>
        </div>
        <div>
          <img
            src="{{profileImage}}"
            class="img-fluids object-fit-cover"
            alt="Profile Image"
            style="
              clip-path: polygon(
                50% 0,
                100% 30%,
                100% 70%,
                50% 100%,
                0 70%,
                0 30%
              );
              width: 250px;
              height: 250px;
            "
          />
        </div>
      </div>

      <div class="d-flex flex-sm-row flex-column-reverse align-items-stretch pb-4">
        <!-- Left Side -->
        <div style="width: 78%;" class="mx-auto mx-sm-0">
          <!-- Work Experience -->
          <div class="p-2">
            <h2
              class="fs-2 fw-bold text-white px-4 py-2"
              style="background-color: rgb(41, 50, 63); clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%); width: max-content;"
            >
              WORK EXPERIENCE
            </h2>
            <div class="px-2">
              {{#experience}}
              <div class="py-2">
                <h3 style="color: rgb(41, 50, 63)" class="fw-bold fs-5">
                  {{role}}
                </h3>
                <p class="fs-6 fw-medium">{{startDate}} to {{endDate}}</p>
                <h4 class="fw-medium fs-6">{{company}}</h4>
                <p class="fw-medium fs-6">{{description}}</p>
              </div>
              {{/experience}}
            </div>
          </div>

          <!-- Education -->
          <div class="d-flex flex-column p-2">
            <h2
              class="fs-2 fw-bold text-white px-4 py-2"
              style="background-color: rgb(41, 50, 63); clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%); width: max-content;"
            >
              Education
            </h2>
            <div class="px-2">
              {{#education}}
              <div>
                <h3 class="fs-4">{{degree}}</h3>
                <h4 class="h5">{{year}} | {{grade}}</h4>
                <h4 class="h5">{{institution}}</h4>
              </div>
              {{/education}}
            </div>
          </div>

          <!-- Projects -->
          <div class="d-flex flex-column p-2">
            <h2
              class="fs-2 fw-bold text-white px-4 py-2"
              style="background-color: rgb(41, 50, 63); clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%); width: max-content;"
            >
              PROJECTS
            </h2>
            <div style="color: rgb(41, 50, 63);" class="px-2">
              {{#projects}}
              <h4>{{.}}</h4>
              {{/projects}}
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div style="clip-path: polygon(0% 5%, 50% 0, 100% 5%, 100% 100%, 0 100%); background-color: rgb(41,50,63); color: white;"
          class="mx-auto p-4 w-sm-25">
          <!-- Contact -->
          <div class="pt-4">
            <h2 class="fs-5 font-medium pt-4 px-2">CONTACT ME</h2>
            <ul style="list-style-type: none;" class="p-0">
              <li>{{phone}}</li>
              <li>{{altPhone}}</li>
              <li>{{email}}</li>
              <li>{{address}}</li>
            </ul>
          </div>

          <!-- Skills -->
          <div class="pt-4">
            <h2 class="fs-5 font-medium px-2">SKILLS</h2>
            <ul>
              {{#skills}}
              <li>{{.}}</li>
              {{/skills}}
            </ul>
          </div>

          <!-- Achievements -->
          <div class="pt-4">
            <h2 class="fs-5 font-medium px-2">ACHIEVEMENTS</h2>
            <ul>
              {{#achievements}}
              <li>{{.}}</li>
              {{/achievements}}
            </ul>
          </div>

          <!-- Languages -->
          <div class="pt-4">
            <h2 class="fs-5 font-medium px-2">LANGUAGES</h2>
            <ul>
              {{#languages}}
              <li>{{.}}</li>
              {{/languages}}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`
  },
  {
  template: "resume3",
  category: "Resume",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{name}} - CV</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f7f7f7; }
    .container { display: flex; max-width: 1000px; margin: 30px auto; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .sidebar { width: 30%; background: #123456; color: #fff; padding: 30px 20px; }
    .sidebar img { width: 150px; height: 150px; border-radius: 50%; display: block; margin: 0 auto 20px; border: 5px solid #fff; }
    .sidebar h2 { font-size: 16px; margin: 20px 0 10px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 5px; }
    .sidebar p, .sidebar li { font-size: 14px; line-height: 1.6; }
    .sidebar ul { list-style: none; padding: 0; }
    .main { width: 70%; padding: 30px 40px; }
    .main h1 { font-size: 28px; margin: 0; }
    .main h1 span { color: #2a3c60; }
    .main h3 { font-size: 14px; font-weight: normal; margin-top: 5px; color: #666; }
    .section { margin: 25px 0; }
    .section h2 { font-size: 18px; margin-bottom: 10px; color: #2a3c60; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
    .work-item { margin-bottom: 20px; }
    .work-item h4 { margin: 0; font-size: 16px; color: #333; }
    .work-item span { float: right; font-size: 14px; color: #777; }
    .work-item ul { margin: 8px 0 0 15px; font-size: 14px; color: #444; }
    .reference { display: flex; justify-content: space-between; }
    .reference div { width: 45%; }
    .reference h4 { margin: 0 0 5px; font-size: 15px; color: #333; }
    .reference p { margin: 3px 0; font-size: 13px; color: #555; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <img src="{{profileImage}}" alt="Profile Picture">
      <h2>Contact</h2>
      <p>📞 {{phone}}</p>
      <p>✉️ {{email}}</p>
      <p>📍 {{address}}</p>
      <p>🌐 {{website}}</p>

      <h2>Education</h2>
      {{#education}}
      <p><strong>{{year}}</strong><br>{{institution}}<br>{{degree}}{{#gpa}}<br>GPA: {{gpa}}{{/gpa}}</p>
      {{/education}}

      <h2>Skills</h2>
      <ul>
        {{#skills}}
        <li>{{.}}</li>
        {{/skills}}
      </ul>

      <h2>Languages</h2>
      <ul>
        {{#languages}}
        <li>{{.}}</li>
        {{/languages}}
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main">
      <h1>{{name}} <span>{{surname}}</span></h1>
      <h3>{{title}}</h3>

      <div class="section">
        <h2>Profile</h2>
        <p>{{profile}}</p>
      </div>

      <div class="section">
        <h2>Work Experience</h2>
        {{#experience}}
        <div class="work-item">
          <h4>{{company}} <span>{{startDate}} - {{endDate}}</span></h4>
          <p>{{role}}</p>
          <ul>
            {{#responsibilities}}
            <li>{{.}}</li>
            {{/responsibilities}}
          </ul>
        </div>
        {{/experience}}
      </div>

      <div class="section">
        <h2>Reference</h2>
        <div class="reference">
          {{#references}}
          <div>
            <h4>{{name}}</h4>
            <p>{{position}}</p>
            <p>📞 {{phone}}</p>
            <p>✉️ {{email}}</p>
          </div>
          {{/references}}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`
},{
  template: "resume_highschool",
  category: "Resume",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{name}} - High School Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      color: #000;
      line-height: 1.5;
    }
    h1 {
      font-size: 22px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .contact {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .summary {
      margin-bottom: 20px;
      font-size: 14px;
    }
    h2 {
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 3px 0;
      margin: 20px 0 10px;
      text-align: center;
    }
    .section p, .section ul {
      font-size: 14px;
      margin: 5px 0;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    ul li::before {
      content: "▪ ";
      font-weight: bold;
    }
    .job {
      margin-bottom: 15px;
    }
    .job-title {
      font-style: italic;
      font-size: 14px;
    }
    .job-dates {
      float: right;
      font-size: 13px;
      font-style: italic;
    }
    .clear {
      clear: both;
    }
  </style>
</head>
<body>
  <h1>{{name}} {{surname}}</h1>

  <div class="contact">
    <div>
      <p>{{email}}</p>
      <p>{{city}}, {{state}}</p>
    </div>
    <div>
      <p>{{phone}}</p>
      <p>{{linkedin}}, {{website}}</p>
    </div>
  </div>

  <div class="summary">
    <p>{{summary}}</p>
  </div>

  <h2>Education</h2>
  <div class="section">
    {{#education}}
    <p><strong>{{school}}, {{schoolCity}}, {{schoolState}}</strong><br>{{grade}}</p>
    <ul>
      <li><strong>GPA:</strong> {{gpa}}</li>
      <li><strong>Relevant Coursework:</strong> {{coursework}}</li>
      <li><strong>Honors:</strong> {{honors}}</li>
      <li><strong>Clubs:</strong> {{clubs}}</li>
    </ul>
    {{/education}}
  </div>

  <h2>Major Achievements</h2>
  <div class="section">
    {{#achievements}}
    <div class="job">
      <p><strong>{{organization}}</strong> <span class="job-dates">{{startDate}} - {{endDate}}</span></p>
      <p class="job-title">{{role}}</p>
      <ul>
        {{#responsibilities}}
        <li>{{.}}</li>
        {{/responsibilities}}
      </ul>
      <div class="clear"></div>
    </div>
    {{/achievements}}
  </div>

  <h2>Additional Skills</h2>
  <div class="section">
    <ul>
      {{#skills}}
      <li>{{.}}</li>
      {{/skills}}
    </ul>
  </div>

  <h2>Awards, Honors, and Honorary Mentions</h2>
  <div class="section">
    <ul>
      {{#awards}}
      <li>{{.}}</li>
      {{/awards}}
    </ul>
  </div>
</body>
</html>
`
}



];

const dummyData ={
  name: "John Doe",
  title: "Full Stack Developer",
  address: "123 Main St, City, Country",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  summary: "Passionate developer with 5+ years of experience...",
  experience: [
    { role: "Frontend Developer", company: "ABC Corp", description: "Built React apps", duration: "2020-2022" },
    { role: "Backend Developer", company: "XYZ Ltd", description: "Developed APIs", duration: "2018-2020" }
  ],
  education: [
    { degree: "B.Sc Computer Science", college: "University A", year: "2014-2018" }
  ],
  skills: ["JavaScript", "React", "Node.js", "CSS"],
  languages: "English, Spanish",
  certificates: "AWS Certified Developer",
  awards: "Employee of the Year 2021"
};

// helper to replace placeholders
function renderTemplate(template, data) {
  // Handle array sections like {{#experience}} ... {{/experience}}
  template = template.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (_, key, content) => {
    if (Array.isArray(data[key])) {
      return data[key].map(item => {
        if (typeof item === 'object') {
          return content.replace(/{{(\w+)}}/g, (_, prop) => item[prop] || '');
        } else {
          return content.replace(/{{\.}}/g, () => item);
        }
      }).join('');
    }
    return '';
  });

  // Replace normal placeholders {{name}}, {{title}}, etc.
  template = template.replace(/{{(\w+)}}/g, (_, key) => data[key] || '');
  return template;
}

export {templates,dummyData,renderTemplate};