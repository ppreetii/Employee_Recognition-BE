"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `
        CREATE PROCEDURE get_employee_of_the_day(IN status VARCHAR(255), IN input_date DATE)
        BEGIN
        DECLARE result_count INT;
        DECLARE time_taken INT;
        DECLARE employee_name VARCHAR(255);
        DECLARE employee_designation VARCHAR(255);
        DECLARE employee_id INT;
        DECLARE total_tasks INT;

        SELECT COUNT(*) INTO result_count FROM employee_of_the_days WHERE DATE(date) = input_date;
        
        IF result_count = 0 THEN

            /*query for Completed task */  
            SELECT TIMESTAMPDIFF(MINUTE,task.date_assigned, task.date_completed) AS timeTaken, emp.name, emp.designation, COUNT(task.employeeId) AS totalTasks,emp.id
            INTO time_taken, employee_name, employee_designation, total_tasks,employee_id
            FROM tasks AS task
            LEFT JOIN employees AS emp ON task.employeeId = emp.id
            WHERE DATE(task.date_completed) = input_date AND task.status = 'Done' AND DATE(task.date_completed) <= DATE(task.deadline)
            GROUP BY task.employeeId
            ORDER BY totalTasks DESC, timeTaken ASC, emp.name ASC
            LIMIT 1;

            IF employee_name IS NULL AND employee_designation IS NULL AND employee_id IS NULL THEN
            /*query for InProgress task */
            SELECT TIMESTAMPDIFF(MINUTE,task.date_assigned, task.date_started) AS timeTaken, emp.name, emp.designation, COUNT(task.employeeId) AS totalTasks, emp.id
            INTO time_taken, employee_name, employee_designation, total_tasks,employee_id
            FROM tasks AS task
            LEFT JOIN employees AS emp ON task.employeeId = emp.id
            WHERE task.status = status 
            AND DATE(date_started) >= DATE(task.date_assigned)
            AND DATE(task.date_started) <= DATE(task.deadline) 
            AND DATE(task.date_started)  <= DATE(input_date)
            AND DATE(input_date)  >= DATE(task.date_assigned)
            AND DATE(input_date)  <= DATE(task.deadline)
          
            GROUP BY task.employeeId
            ORDER BY totalTasks DESC, timeTaken ASC, emp.name ASC
            LIMIT 1;

            END IF;
            
            IF employee_name IS NOT NULL AND employee_designation IS NOT NULL AND employee_id IS NOT NULL THEN
            INSERT INTO employee_of_the_days (date, name, designation,employeeId) 
            VALUES (input_date, employee_name, employee_designation,employee_id);
            END IF;

        END IF;    
        
        /* return the result */
        SELECT 
            name,
            designation,
            employeeId,
            date
        FROM 
            employee_of_the_days
        WHERE 
        DATE(date) = input_date;
        
        END
      `,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `DROP PROCEDURE IF EXISTS get_employee_of_the_day;`,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
