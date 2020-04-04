import {AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import User from "./users.model";

@Table({ modelName: 'Vote', timestamps: true, paranoid: false })
export default class Vote extends Model<Vote> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  initiativeId: number;
}
