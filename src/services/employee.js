const Employee = require("../models/employee");

const getEmployee = async (id) => {
  try {
    const employee = await Employee.findOne({
      attributes: ["name", "designation","bonusStars","employee_of_the_day","employee_of_the_week","employee_of_the_month"],
      where:{
        id
      }
    });
    
    if (!employee) {
      throw new Error("Employee Not Found");
    }

    return {
      id: 'EMPK-'+id,
      ...employee.dataValues
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getEmployee,
};
