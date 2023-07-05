import * as yup from 'yup';

export const workValidationSchema = yup.object().shape({
  files: yup.string().required(),
  user_id: yup.string().nullable(),
});
