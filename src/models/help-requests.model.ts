import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import Category from "./categories.model";
import User from "./users.model";
import HelpRequestCategory from "./helprequests-categories.model";

@Table({ modelName: 'HelpRequests', timestamps: true, paranoid: false })
export default class HelpRequest extends Model<HelpRequest> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  description: string;

  @AllowNull(false)
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  fulfilled: boolean;

  @AllowNull(false)
  @Column({type: DataType.DATE})
  expirationDate: string;

  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  durationInHours: number;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  location: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Category, () => HelpRequestCategory)
  categories: Category[];
}
