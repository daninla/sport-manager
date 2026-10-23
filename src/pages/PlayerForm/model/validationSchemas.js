import * as Zod from 'zod';

export const playerFormSchema = Zod.object({
  user_email: Zod.string().trim().toLowerCase().email(),
  city: Zod.string().trim().min(10),
  birth_date: Zod.preprocess((val) => {
    if (!val) return undefined;

    const date = new Date(val);
    return isNaN(date.getTime()) ? undefined : date;
  }, Zod.date().max(new Date())),
  sex: Zod.enum(['male', 'female']),
  club: Zod.string().trim().optional(),
  ukr_rating: Zod.coerce.number().min(0).max(100),
  rank_category: Zod.string().trim().max(10).optional(),
  notes: Zod.string().trim().optional(),
});
