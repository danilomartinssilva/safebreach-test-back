import { Router } from "express";
import UsersController from "../controllers/UserController";

const usersRouter = Router();
const usersController = new UsersController()

usersRouter.route('/').get(usersController.index);

export default usersRouter;