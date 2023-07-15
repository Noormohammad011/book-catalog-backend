import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const UserValidator = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};