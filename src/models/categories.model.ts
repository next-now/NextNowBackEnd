import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import UserCategory from "./users-categories.model";
import User from "./users.model";

@Table({ modelName: 'Categories', timestamps: true, paranoid: false })
export default class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  description: string;

  @BelongsToMany(() => User, () => UserCategory)
  users: User[];

}
