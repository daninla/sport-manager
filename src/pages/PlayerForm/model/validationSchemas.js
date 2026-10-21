import * as Yup from 'yup';

export const playerFormSchema = Yup.object().shape({
  fullName: Yup.string().trim().required(),
  age: Yup.number().min(1).max(130),
  sex: Yup.string().matches(/(male)|(gemale)|(else)/),
  email: Yup.string().email(),
  role: Yup.string(),
  city: Yup.string(),
  status: Yup.string(),
  ukrRate: Yup.number().min(0),
  club: Yup.string(),
  notes: Yup.array(),
});
