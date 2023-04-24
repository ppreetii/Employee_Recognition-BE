const {validate} = require('../../validation-schemas/validation');
const {getEmployeeSchema} = require('../../validation-schemas/employee');
const employeeServices = require('../../services/employee')


exports.getEmployee = async (req,res,next) =>{
    try { 
        const {employeeId} = req.params;
        await validate(getEmployeeSchema, employeeId);
        const data = await employeeServices.getEmployee(employeeId);
        
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
}