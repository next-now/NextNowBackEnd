import UserModel from '../models/users.model';
import Category from '../models/categories.model';
import {User} from "../interfaces/users.interface";
import {Op} from "sequelize";

class UserStore {
    private users = UserModel;

    private static extractPureJSONObject(user: UserModel): User {
        return user && user.toJSON() as User;
    }

    private static async setUserCategories(user: UserModel, categoriesIds?: number[]): Promise<void> {

        const cats = await Category.findAll({where: {id: categoriesIds}});

        // @ts-ignore
        await user.setCategories(cats);
        await user.save();
    }

    public async createNewUser(userData: Omit<User, "id">, categoriesIds?: number[]): Promise<User> {
        const user: UserModel = await this.users.create(userData);
        await UserStore.setUserCategories(user, categoriesIds);
        return UserStore.extractPureJSONObject(user);
    }

    public async findUserByEmailOrUsername(email: string, username: string): Promise<User> {
        const user: UserModel = await this.users.findOne({
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
        const user: UserModel = await this.users.findByPk(userId, {
            include: [{
                model: Category,
                attributes: ["name", "description"]
            }]
        });
        return UserStore.extractPureJSONObject(user);

    }

    public async updateUser(userData: Partial<Omit<User, "id" | "walletId">>, id: number, categoriesIds: number[]): Promise<User> {
        await this.users.update(userData, {where: {id: id}});
        const user: UserModel = await this.users.findByPk(id);
        console.log(user);
        // @ts-ignore
        console.log(user.setCategories);
        await UserStore.setUserCategories(user, categoriesIds);
        return UserStore.extractPureJSONObject(user);

    }

    public async removeUser(id: number): Promise<void> {
        this.users.destroy({where: {id: id}});
    }
}

export default UserStore