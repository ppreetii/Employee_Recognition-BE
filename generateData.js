// const fs = require("fs");

/*
// ** Uncomment this code to generate employee data

const jobTitles = [
  "Accountant",
  "Administrative Assistant",
  "Business Analyst",
  "Chief Executive Officer",
  "Chief Financial Officer",
  "Chief Operating Officer",
  "Data Analyst",
  "Database Administrator",
  "Financial Analyst",
  "Human Resources Manager",
  "Information Security Analyst",
  "Marketing Manager",
  "Network Administrator",
  "Operations Manager",
  "Product Manager",
  "Project Manager",
  "Sales Representative",
  "Software Developer",
  "Systems Administrator",
  "Web Developer",
];

function getRandomJobTitle() {
  const randomIndex = Math.floor(Math.random() * jobTitles.length);
  return jobTitles[randomIndex];
}

function generateEmployeeData(count) {
  const employees = [];

  for (let i = 1; i <= count; i++) {
    const id = i;
    const name = `Employee ${i}`;
    const designation = getRandomJobTitle();
    
    employees.push({
      id,
      name,
      designation
    });
  }

  return employees;
}

const testData = generateEmployeeData(100);
fs.writeFile("employee_data.json", JSON.stringify(testData), (err) => {
  if (err) throw err;
  console.log("Test data written to employee_data.json");
});

*/

// ======================================================================================================================

/*
// ** Uncomment this code to generate task data
const statuses = ["ToDo", "InProgress", "Done"];

function getRandomStatus() {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

function generateTaskData(employees, startDate) {
  const tasks = [];

  const currentDateObj = new Date();

  let currentDate = new Date(startDate);
  while (currentDate <= currentDateObj) {
    const numTasks = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numTasks; i++) {
      const id = tasks.length + 1;
      const summary = `Task ${id} Summary`;
      const description = `Task ${id} Description`;
      const status = getRandomStatus();
      const randomTime =
        currentDateObj.getTime() -
        (currentDateObj.getTime() -
          currentDateObj.getTimezoneOffset() * 60 * 1000 -
          currentDate.getTime()) *
          Math.random();
      const dateAssigned = new Date(randomTime).toISOString().slice(0, 10);
      const employeeId =
        employees[Math.floor(Math.random() * employees.length)].id;

      tasks.push({
        id,
        summary,
        description,
        status,
        dateAssigned,
        employeeId,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return tasks;
}

const employeeData = JSON.parse(fs.readFileSync("employee_data.json", "utf8"));
const testData = generateTaskData(employeeData, "2022-01-01");
fs.writeFile("task_data.json", JSON.stringify(testData), (err) => {
  if (err) throw err;
  console.log("Test data written to task_data.json");
});

*/
