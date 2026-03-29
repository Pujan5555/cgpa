const gradePoints = {
  "A+": 4.0,
  "A": 3.75,
  "A-": 3.5,
  "B+": 3.25,
  "B": 3.0,
  "B-": 2.75,
  "C+": 2.5,
  "C": 2.25,
  "D": 2.0,
  "F": 0.0
};

function addCourse() {
  const div = document.createElement("div");
  div.classList.add("course");

  div.innerHTML = `
    <input type="number" placeholder="Credit" class="credit">

    <select class="grade">
      ${Object.entries(gradePoints)
        .map(([grade, point]) => 
          `<option value="${grade}">${grade} (${point.toFixed(2)})</option>`
        ).join("")}
    </select>

    <button class="danger" onclick="this.parentElement.remove()">✕</button>
  `;

  document.getElementById("courses").appendChild(div);
}

function calculateCGPA() {
  const credits = document.querySelectorAll(".credit");
  const grades = document.querySelectorAll(".grade");

  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < credits.length; i++) {
    let c = parseFloat(credits[i].value);
    let g = gradePoints[grades[i].value];

    if (!isNaN(c)) {
      totalCredits += c;
      totalPoints += c * g;
    }
  }

  let cgpa = totalPoints / totalCredits;

  document.getElementById("cgpaResult").innerText =
    totalCredits ? `CGPA: ${cgpa.toFixed(2)}` : "Enter valid data";
}

function calculateTarget() {
  let current = parseFloat(document.getElementById("currentCGPA").value);
  let completed = parseFloat(document.getElementById("completedCredits").value);
  let target = parseFloat(document.getElementById("targetCGPA").value);
  let remaining = parseFloat(document.getElementById("remainingCredits").value);

  let required =
    ((target * (completed + remaining)) - (current * completed)) / remaining;

  document.getElementById("targetResult").innerText =
    isFinite(required) ? `Required GPA: ${required.toFixed(2)}` : "Invalid input";
}

// Auto add first course
addCourse();