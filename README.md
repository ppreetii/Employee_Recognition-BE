[![CodeQL](https://github.com/ppreetii/Employee_Recognition-BE/actions/workflows/codeql.yml/badge.svg)](https://github.com/ppreetii/Employee_Recognition-BE/actions/workflows/codeql.yml)
## Employee_Recognition-BE

### Problem Definition

- Part 1 - There are 2 tables- employee, task. Consider the assignment data can be of one year long. Figure out the best way to declare employee of the day, week, month based on assigned task execution. Write down the SQL query where we will provide a particular date as input, based on that employee of the day, employee of the week, employee of the month will be extracted out.

- Part 2 - Write An API/Function to generate a multi worksheet excel file in the server based on the assigned task of the employees. Consider the above tables as a data source. Each employee data will be in a separate worksheet. The API/function should be asynchronous in nature.

- Part 3 - Write An API/Function which will execute some script at 00 hr. everyday. The script will collect data of the employee of that day who did most of the work and add in a separate table called emp_of_the_day (below). The script will be executed without any user intervention, automatically at that given time. It'll not hamper any existing task or process too.

