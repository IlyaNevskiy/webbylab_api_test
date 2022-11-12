import { Router } from 'express';
import { movieController } from '../../controllers';
import {authMiddleware, ControllerWrapper, isExistMoviesMiddleware, ValidatorMiddleware} from '../../middlewares';
import { MovieSchema } from '../../shared/validators';

const moviesRouter: Router = Router();

moviesRouter.get('/', authMiddleware, ControllerWrapper(movieController.getAll.bind(movieController)));
moviesRouter.get('/:id', authMiddleware, isExistMoviesMiddleware(), ControllerWrapper(movieController.getOne.bind(movieController)));
moviesRouter.post('/', authMiddleware, ValidatorMiddleware(MovieSchema), ControllerWrapper(movieController.createMovie.bind(movieController)));
moviesRouter.post('/import', authMiddleware, ControllerWrapper(movieController.importByFile.bind(movieController)));
moviesRouter.put('/:id', authMiddleware, isExistMoviesMiddleware(), ValidatorMiddleware(MovieSchema), ControllerWrapper(movieController.updateMovie.bind(movieController)));
moviesRouter.delete('/:id', authMiddleware, isExistMoviesMiddleware(), ControllerWrapper(movieController.deleteMovie.bind(movieController)));

export default moviesRouter;
