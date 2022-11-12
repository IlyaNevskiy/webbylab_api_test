import { Application } from 'express';
import moviesRouter from './api/movies.route';
import sessionRouter from './api/session.route';
import userRouter from './api/user.route';

class AppRouter {
  constructor(private app: Application) {}
  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/v1/movies', moviesRouter);
    this.app.use('/api/v1/users', userRouter);
    this.app.use('/api/v1/sessions', sessionRouter);
  }
}

export default AppRouter;
