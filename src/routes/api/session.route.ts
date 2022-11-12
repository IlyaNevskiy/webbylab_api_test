import { Router } from 'express';
import { UserAuthType } from '../../shared/constants';
import { sessionController } from '../../controllers';
import {checkPassword, ControllerWrapper, isExistUserMiddleware, ValidatorMiddleware} from '../../middlewares';
import { SessionSchema } from '../../shared/validators';

const sessionRouter: Router = Router();

sessionRouter.post('/',
  ValidatorMiddleware(SessionSchema),
  isExistUserMiddleware(UserAuthType.LOGIN),
  checkPassword(),
  ControllerWrapper(sessionController.login.bind(sessionController))
);

export default sessionRouter;
