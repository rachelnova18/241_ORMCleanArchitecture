const joi = require('joi');

function errorResponse(res, message, status, detail = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: detail,
     });
}

const komikSchema = joi.object({
    title: joi.string().trim().min(1).max(255).required(),
    description: joi.string().trim().allow(null, '').optional(),
    author: joi.string().trim().min(2).max(100).required(),
});