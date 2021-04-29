import { validationResult } from 'express-validator';

const validate = validations => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ 
    status: 400,
    success: false,
    errors: errors.array(),
  });
};

export default validate;