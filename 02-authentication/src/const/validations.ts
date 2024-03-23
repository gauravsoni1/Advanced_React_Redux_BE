import * as joi from 'joi';

export const schemaValidation = (schema: joi.ObjectSchema<any>, data: Record<string, any>) => {
  const { error } = schema.validate(data);
  if (error) {
    throw error;
  }
};

export const createUserValidation = joi.object({
  username: joi.string().required().email(),
  password: joi.string().min(2),
});
