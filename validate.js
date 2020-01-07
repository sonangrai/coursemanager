//Validation From JOI
const Joi = require("@hapi/joi");

const registervalidation = data => {
    const userschema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string()
            .min(8)
            .required()
    });
    return userschema.validate(data);
};

module.exports.registervalidation = registervalidation;

const loginvalidation = data => {
    const userschema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string()
            .min(8)
            .required()
    });
    return userschema.validate(data);
};

module.exports.loginvalidation = loginvalidation;