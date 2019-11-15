import { Joi, celebrate } from 'celebrate';

const validate = Joi.object().keys({
  search: Joi.string(),
  category: Joi.string(),
  type: Joi.string(),
  page: Joi.number()
    .integer()
    .min(1),
  limit: Joi.number()
    .integer()
    .min(10)
    .max(50),
});

export default celebrate({
  params: validate,
});
