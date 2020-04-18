import * as bcrypt from 'bcrypt';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import {isEmptyObject} from '../utils/util';
import UserStore from "../stores/user.store";
import {User} from "../interfaces/users.interface";
import BlockchainService from "./blockchain.service";
import LocationService from "./location.service";

class UserService {
  public usersStore = new UserStore();
  private blockchainService = new BlockchainService();
  private locationService = new LocationService();

  public static extractUserWithoutPassword(user: User): CreatedUser
  {
    const {password, ...createdUser} = user;
    return createdUser;
  }

  public async findUserById(userId: number): Promise<CreatedUser> {
    const findUser: User = await this.usersStore.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");
    const balance:number = await  this.blockchainService.getWalletBalance(findUser.walletId);
    const createdUser = UserService.extractUserWithoutPassword(findUser);
    createdUser.balance = balance;
    return createdUser;
  }

  public async createUser(userData: CreateUserDto): Promise<CreatedUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.usersStore.findUserByEmailOrUsername(userData.email, userData.username);
    if (findUser && findUser.email === userData.email) throw new HttpException(409, `Your email ${userData.email} already exists`);
    if (findUser && findUser.username === userData.username) throw new HttpException(409, `Your username ${userData.username} already exists`);
    const wallet = await this.blockchainService.createWallet();
    const {lat, lon} = await this.locationService.getLatLongForAddress(userData.address);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.usersStore.createNewUser({ ...userData, password: hashedPassword, walletId: wallet, lat: lat, lon:lon}, userData.categoriesIds);
    return UserService.extractUserWithoutPassword(createUserData);
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<CreatedUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    if (userData.password)
    {
      userData.password = await bcrypt.hash(userData.password, 10)
    }
    const updateUser: User = await this.usersStore.updateUser(userData, userId, userData.categoriesIds);
    if (!updateUser) throw new HttpException(409, "You're not user");

   return UserService.extractUserWithoutPassword(updateUser);
  }

  public async deleteUserData(userId: number): Promise<void> {
    await this.usersStore.removeUser(userId);
    return;
  }
}

export default UserService;