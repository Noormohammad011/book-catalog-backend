import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { BookRoute } from '../modules/book/book.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/book',
    route: BookRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
