import * as Yup from 'yup';

export const playerFormSchema = Yup.object().shape({
  fullName: Yup.string().trim().required(),
  age: Yup.number(),
  city: Yup.string(),
  status: Yup.string(),
  ukrRate: Yup.number(),
  worldRate: Yup.number(),
  club: Yup.string(),
  notes: Yup.array(),
});
