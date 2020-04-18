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
import Category from "./categories.model";

@Table({ modelName: 'Users', timestamps: true, paranoid: false })
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password: string;

  @AllowNull(false)
  @Column({type: DataType.STRING(255), unique: true})
  username: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING( 255),
    field: 'wallet-id',
    unique: true
  })
  walletId: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'giver-profile-active'
  })
  giverProfileActive: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'has-car'
  })
  hasCar: boolean;

  @Column({
    type: DataType.TIME,
    field: 'availability-start-time'
  })
  availabilityStartTime: string;

  @Column({
    type: DataType.TIME,
    field: 'availability-end-time'
  })
  availabilityEndTime: string;

  @Column(DataType.STRING)
  address: string;

  @Column(DataType.DOUBLE)
  lat: number;

  @Column(DataType.DOUBLE)
  lon: number;

  @BelongsToMany(() => Category, () => UserCategory)
  categories: Category[];
}
