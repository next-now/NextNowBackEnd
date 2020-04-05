import {AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import User from "./users.model";
import Initiative from "./initiative.model";
import {DataTypes} from "sequelize";

@Table({ modelName: 'Transaction', timestamps: true, paranoid: false })
export default class Transaction extends Model<Transaction> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  amount: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  uuid: string;

  @AllowNull(false)
  @ForeignKey(() => Initiative)
  @Column
  initiativeId: number;

  @BelongsTo(() => Initiative)
  initiative: Initiative;
}
