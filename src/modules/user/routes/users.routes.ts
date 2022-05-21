import { Router } from "express";
import UsersController from "../controllers/UserController";

const usersRouter = Router();
const usersController = new UsersController()

usersRouter.route('/').get(usersController.index);
usersRouter.route('/:userId').delete(usersController.destroyUser);
usersRouter.route('/').post(usersController.createUser);
usersRouter.route('/').put(usersController.updateUser)

export default usersRouter;