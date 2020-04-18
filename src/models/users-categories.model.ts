import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import User from "./users.model";
import Category from "./categories.model";

@Table({ modelName: 'UsersCategories', timestamps: true, paranoid: false })
export default class UserCategory extends Model<UserCategory> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
