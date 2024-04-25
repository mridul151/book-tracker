const ApiResponse = {
    success: (data = null, message = 'Success') => {
      return {
        success: true,
        message: message,
        data: data
      };
    },
    error: (message = 'Internal Server Error', statusCode = 500) => {
      return {
        success: false,
        message: message,
        statusCode: statusCode
      };
    }
  };
const apiHandler = (handler) => {
    return async (req, res, next) => {
      let responseSent = false; // Flag to track whether response has been sent
      
      const sendResponse = (response) => {
        if (!responseSent) {
          res.json(response);
          responseSent = true;
        }
      };
  
      try {
        const result = await handler(req, res, next);
        sendResponse(ApiResponse.success(result));
      } catch (error) {
        console.error('API Error:', error);
        const statusCode = error.statusCode || 500;
        sendResponse(ApiResponse.error(error.message, statusCode));
      }
    };
  };
  
module.exports=apiHandler;