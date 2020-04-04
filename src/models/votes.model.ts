import {AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import User from "./users.model";
import Initiative from "./initiative.model";

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
  @ForeignKey(() => Initiative)
  @Column
  initiativeId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Initiative)
  initiative: Initiative;
}
