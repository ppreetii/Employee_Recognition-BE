// const fs = require("fs");

// ** Uncomment this code to generate employee data
/*
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
    let employee = {
      id,
      name,
      designation,
      employee_of_the_day: Math.floor(Math.random() * (60 - 0 + 1)) + 0,
      employee_of_the_week: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
      employee_of_the_month: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
    };
    let bonus =
      employee.employee_of_the_day * 20 +
      employee.employee_of_the_week * 50 +
      employee.employee_of_the_month * 500;
    employee.bonusStars = bonus > 5000 ? 5000 : bonus;
    employees.push(employee);
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

// ** Uncomment this code to generate task data
/*
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
      const randomTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ).getTime();
      const date_assigned = new Date(
        randomTime + Math.floor(Math.random() * 86400000)
      ); // random number of milliseconds to add to current day to get date_assigned
      const daysToAdd = Math.floor(Math.random() * 2) + 2; // random number of days to add to date_assigned to get the deadline
      const deadline = new Date(date_assigned.getTime() + daysToAdd * 86400000); // convert days to milliseconds and add to date_assigned
      let date_started;
      if (status !== "ToDo") {
        date_started = new Date(
          date_assigned.getTime() +
            Math.floor(
              Math.random() * (deadline.getTime() - date_assigned.getTime())
            )
        ); // random number of milliseconds to add to date_assigned to get date_started, before deadline
      }
      let date_completed;
      if (status === "Done") {
        const maxCompletionTime = deadline.getTime() + 2 * 86400000;
        date_completed = new Date(
          Math.min(
            maxCompletionTime,
            date_assigned.getTime() + Math.floor(Math.random() * 4) * 86400000
          )
        ); // random number of days to add to date_assigned to get date_completed, but maximum of 2 days late from deadline
      } else if (status === "InProgress") {
        date_completed = null;
      }
      const employeeId =
        employees[Math.floor(Math.random() * employees.length)].id;

      tasks.push({
        id,
        summary,
        description,
        status,
        date_assigned: convertDateFormat(date_assigned),
        deadline: convertDateFormat(deadline),
        date_started: date_started ? convertDateFormat(date_started) : null,
        date_completed: date_completed
          ? convertDateFormat(date_completed)
          : null,
        employeeId,
        createdAt: convertDateFormat(currentDate),
        updatedAt: convertDateFormat(currentDate),
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return tasks;
}

function convertDateFormat(date) {
  const formattedDateString = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  return formattedDateString;
}

function randomTime(date) {
  currentDateObj.getTime() -
    (currentDateObj.getTime() -
      currentDateObj.getTimezoneOffset() * 60 * 1000 -
      currentDate.getTime()) *
      Math.random();
}

const employeeData = JSON.parse(fs.readFileSync("employee_data.json", "utf8"));
const testData = generateTaskData(employeeData, "2022-01-01");
fs.writeFile("task_data.json", JSON.stringify(testData), (err) => {
  if (err) throw err;
  console.log("Test data written to task_data.json");
});
*/