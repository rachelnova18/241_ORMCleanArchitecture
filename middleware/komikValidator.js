const joi = require('joi');

function errorResponse(res, message, status, detail = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: detail,
     });
}