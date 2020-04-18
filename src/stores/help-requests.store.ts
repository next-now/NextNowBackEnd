import HelpRequestModel from '../models/help-requests.model';
import Category from '../models/categories.model';
import User from '../models/users.model';
import {HelpRequest} from "../interfaces/help-request.interface";
import {Op} from "sequelize";

class HelpRequestsStore {
    private helpRequests = HelpRequestModel;

    private static extractPureJSONObject(obj: HelpRequestModel): HelpRequest {
        return obj && obj.toJSON() as HelpRequest;
    }

    public async createNewHelpRequest(helpRequestData: Omit<HelpRequest, "id">): Promise<HelpRequest> {
        const helpRequest: HelpRequestModel = await this.helpRequests.create(helpRequestData);
        return HelpRequestsStore.extractPureJSONObject(helpRequest);
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

    public async updateHelpRequest(helpRequestData: Partial<Omit<HelpRequest, "id">>, id: number): Promise<HelpRequest> {
        await this.helpRequests.update(helpRequestData, {where: {id: id}});
        const helpR: HelpRequestModel = await this.helpRequests.findByPk(id);
        return HelpRequestsStore.extractPureJSONObject(helpR);

    }

    public async deleteHelpRequest(id: number): Promise<void> {
        this.helpRequests.destroy({where: {id: id}});
    }

    public async getOpenHelpRequestsByFilter(categoriesIds: number[]): Promise<HelpRequest[]> {
        const now:number = new Date.now() as number;
       const res:HelpRequestModel[]  = await this.helpRequests.findAll({
            include: [{
                model: Category,
                where: {
                    id: {
                        [Op.in]: categoriesIds
                    },
                    fulfilled: false,
                    expirationDate: {
                        [Op.lt]: now
                    }

                }
            }]
        });
       return res.map( (obj: HelpRequestModel) => HelpRequestsStore.extractPureJSONObject(obj))
    }
}

export default HelpRequestsStore