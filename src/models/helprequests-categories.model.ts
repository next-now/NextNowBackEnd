import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import Category from "./categories.model";
import HelpRequest from "./help-requests.model";

@Table({ modelName: 'HelpRequestCategories', timestamps: true, paranoid: false })
export default class HelpRequestCategory extends Model<HelpRequestCategory> {
  @ForeignKey(() => HelpRequest)
  @Column
  helpRequestId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
