import * as Zod from 'zod';

export const playerFormSchema = Zod.object({
  user_email: Zod.string().trim().toLowerCase().email(),
  city: Zod.string().trim().min(10),
  birth_date: Zod.coerce.date().max(new Date()),
  sex: Zod.enum(['male', 'female']),
  rank_category: Zod.string().trim().max(10).optional(),
  ukr_rating: Zod.coerce.number().min(0).max(100),
  club: Zod.string().trim().min(1).optional(),
  notes: Zod.string().trim().optional(),
});
