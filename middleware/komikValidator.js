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

const idSchema = joi.object({
    id: joi.number().integer().positive().required(),
});

function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false,
        });

        if (error) {
            return errorResponse(
                res,
                "Validation error",
                400,
                error.details.map((item) => ({
                    field: item.path.join("."),
                    message: item.message,
                }))
            );
        }
        req.body = value;
        next();
    };
}

function validateParams(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            return errorResponse(
                res,
                "Validation error",
                400,
                error.details.map((item) => ({
                    field: item.path.join("."),
                    message: item.message,
                }))
            );
        }
        req.params = value;
        next();
    }
}