exports.validate = async (schema, data) => {
    try {
      await schema.validateAsync(data, {
        abortEarly: false
      });
  
    } catch (error) {
      error = error.details?.map((err) => err.message).join(" ; ");
      throw new Error(error)
    }
};
