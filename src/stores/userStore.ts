import UserModel from '../models/users.model';
import {User} from "../interfaces/users.interface";
import {Op} from "sequelize";

class UserStore {
    private users = UserModel;

    private static extractPureJSONObject(user: UserModel): User {
        return user && user.toJSON() as User;
    }

    public async createNewUser(userData: Omit<User, "id">): Promise<User> {
        const user: UserModel = await this.users.create(userData);
        return UserStore.extractPureJSONObject(user);
    }
    public async findUserByEmailOrUsername(email: string, username: string): Promise<User>
    {
        const user:UserModel = await  this.users.findOne({
            where: {
                [Op.or]: {
                    email: email || "",
                    username: username || ""
                }
            }
        });

        return UserStore.extractPureJSONObject(user);
    }

    public async findUserById(userId: number): Promise<User> {
        const user:UserModel = await this.users.findByPk(userId);
        return UserStore.extractPureJSONObject(user);

    }

    public async updateUser(userData: Omit<User, "id">, id: number ) : Promise<User> {
        const user: UserModel = this.users.update(userData, { where: { id: id } });
        return UserStore.extractPureJSONObject(user);

    }

    public async removeUser(id: number): Promise<void> {
        this.users.destroy({where: {id: id}});
    }
}

export default UserStore