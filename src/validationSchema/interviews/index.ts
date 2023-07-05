import * as yup from 'yup';

export const interviewValidationSchema = yup.object().shape({
  questions: yup.string().required(),
  user_id: yup.string().nullable(),
});
