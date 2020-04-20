import HelpRequestModel from '../models/help-requests.model';
import Category from '../models/categories.model';
import User from '../models/users.model';
import {HelpRequest} from "../interfaces/help-request.interface";
import Sequelize, {Op} from "sequelize";

class HelpRequestsStore {
    private helpRequests = HelpRequestModel;

    private static extractPureJSONObject(obj: HelpRequestModel): HelpRequest {
        return obj && obj.toJSON() as HelpRequest;
    }

    public async createNewHelpRequest(helpRequestData: Omit<HelpRequest, "id"> , categoriesIds:number[]): Promise<HelpRequest> {
        const helpRequest: HelpRequestModel = await this.helpRequests.create(helpRequestData);
        await HelpRequestsStore.setHelpRequestCategories(helpRequest, categoriesIds);
        return HelpRequestsStore.extractPureJSONObject(helpRequest);
    }

    private static async setHelpRequestCategories(helpRequest: HelpRequestModel, categoriesIds?: number[]): Promise<void> {
        const cats = await Category.findAll({where: {id: categoriesIds}});
        console.log(cats);
        // @ts-ignore
        await helpRequest.setCategories(cats);
        await helpRequest.save();
        console.log("saved for request " + helpRequest.id);
    }


    public async findHelpRequestById(id: number): Promise<HelpRequest> {
        const user: HelpRequestModel = await this.helpRequests.findByPk(id, {
            include: [{
                model: Category,
                attributes: ["name", "description"]
            }, User]
        });
        return HelpRequestsStore.extractPureJSONObject(user);

    }

    public async updateHelpRequest(helpRequestData: Partial<Omit<HelpRequest, "id">>, id: number, categoriesIds:number[]): Promise<HelpRequest> {
        await this.helpRequests.update(helpRequestData, {where: {id: id}});
        const helpR: HelpRequestModel = await this.helpRequests.findByPk(id);
        if (helpRequestData.categoriesIds != null)
        {
            await HelpRequestsStore.setHelpRequestCategories(helpR, categoriesIds);
        }
        return HelpRequestsStore.extractPureJSONObject(helpR);
    }

    public async deleteHelpRequest(id: number): Promise<void> {
        this.helpRequests.destroy({where: {id: id}});
    }

    public async getOpenHelpRequestsByFilter(categoriesIds: number[]): Promise<HelpRequest[]> {
       const res:HelpRequestModel[]  = await this.helpRequests.findAll({
           where:{
               fulfilled: false,
               // expirationDate: {
               //     [Op.lt]: Sequelize.literal('NOW()')
               // }
           },
           include: [{
                model: Category,
               required: false,
                where: {
                    id: {
                        [Op.in]: categoriesIds
                    }
                }
            }, User]
        });
       return res.map( (obj: HelpRequestModel) => HelpRequestsStore.extractPureJSONObject(obj))
    }
}

export default HelpRequestsStore