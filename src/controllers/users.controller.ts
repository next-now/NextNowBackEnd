import {NextFunction, Request, Response} from 'express';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import {User} from '../interfaces/users.interface';
import UserService from '../services/users.service';
import BlockchainService from "../services/blockchain.service";
import {RequestWithUser} from "../interfaces/auth.interface";
import HttpException from "../exceptions/HttpException";

class UsersController {
  public userService = new UserService();
  public blockchainService = new BlockchainService();

  private static verifyUserHasAccess(id: number, user: Pick<User, "id">): void {
    if (user.id !== id)
      throw new HttpException(403, "You don't have access to this resource");
  }

  public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      const findOneUserData: CreatedUser = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const createUserData: CreatedUser = await this.userService.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);
    const userData: CreateUserDto = req.body;
    try {
      UsersController.verifyUserHasAccess(userId, req.user);
      const updateUserData: CreatedUser = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      UsersController.verifyUserHasAccess(userId, req.user);
      await this.userService.deleteUserData(userId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
