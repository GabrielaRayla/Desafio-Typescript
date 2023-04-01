import { Router } from "express";
import { AccountsController, LoginController } from "../controllers/userController.js";
const route = Router();
const accountsController = new AccountsController();
const loginController = new LoginController();
route.post("/accounts", accountsController.createUser);
route.post("/login", loginController.login);
// route.post("/accounts/login", accountsController.login);
// route.get('/getAll', accountsController.getAllUsers);
// route.patch('/accounts/', accountsController.updateUser);
// route.delete('/delete', accountsController.deleteUser);
export { route };
