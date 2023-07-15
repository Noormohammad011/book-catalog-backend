import { format } from 'date-fns';
import { z } from 'zod';
import { genre } from './book.constants';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(255),
    genre: z.enum([...genre] as [string, ...string[]], {
      required_error: 'Genre is required!',
    }),
    publicationDate: z
      .date()
      .refine(date => typeof date !== 'undefined', {
        message: 'Publication date is required',
      })
      .refine(date => date !== null && !isNaN(date.getTime()), {
        message: 'Invalid publication date',
      })
      .refine(date => !isNaN(date.getMonth()), {
        message: 'Invalid publication date',
      })
      .refine(date => !isNaN(date.getDate()), {
        message: 'Invalid publication date',
      })
      .refine(date => !isNaN(date.getFullYear()), {
        message: 'Invalid publication date',
      })
      .refine(
        date => format(date, 'MM/dd/yyyy') === format(date, 'MM/dd/yyyy'),
        {
          message:
            'Invalid publication date format. Expected format: month/day/year',
        },
      ),
    author: z
      .string({
        required_error: 'Author is required!',
      })
      .nonempty(),
    reviews: z.array(z.string()).optional(),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(255).optional(),
    genre: z.enum([...genre] as [string, ...string[]], {}).optional(),
    publicationDate: z
      .date()
      .optional()
      .refine(
        date => {
          if (typeof date === 'undefined') return true;
          return date !== null && !isNaN(date.getTime());
        },
        {
          message: 'Invalid publication date',
        },
      )
      .refine(
        date => {
          if (typeof date === 'undefined') return true;
          return !isNaN(date.getMonth());
        },
        {
          message: 'Invalid publication date',
        },
      )
      .refine(
        date => {
          if (typeof date === 'undefined') return true;
          return !isNaN(date.getDate());
        },
        {
          message: 'Invalid publication date',
        },
      )
      .refine(
        date => {
          if (typeof date === 'undefined') return true;
          return !isNaN(date.getFullYear());
        },
        {
          message: 'Invalid publication date',
        },
      )
      .refine(
        date => {
          if (typeof date === 'undefined') return true;
          return format(date, 'MM/dd/yyyy') === format(date, 'MM/dd/yyyy');
        },
        {
          message:
            'Invalid publication date format. Expected format: month/day/year',
        },
      ),
  }),
});

export const BookValidator = {
  createBookZodSchema,
  updateBookZodSchema,
};
