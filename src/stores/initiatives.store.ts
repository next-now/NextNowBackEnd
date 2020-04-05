import InitiativeModel from '../models/initiative.model';
import {Initiative} from "../interfaces/initiatives.interface";

class InitiativesStore {
    private initiatives = InitiativeModel;

    private static extractPureJSONObject(initiative: InitiativeModel): Initiative {
        return initiative && initiative.toJSON() as Initiative;
    }

    public async createNewInitiative(initiativeData: Omit<Initiative, "id">): Promise<Initiative> {
        const initiative: InitiativeModel = await this.initiatives.create(initiativeData);
        return InitiativesStore.extractPureJSONObject(initiative);
    }

    public async findInitiativeById(id: number): Promise<Initiative> {
        const initiative:InitiativeModel = await this.initiatives.findByPk(id);
        return InitiativesStore.extractPureJSONObject(initiative);

    }

    public async updateInitiative(initiativeData: Omit<Initiative, "id"|"userId"|"rewarded">, id: number) : Promise<void> {
        await this.initiatives.update(initiativeData, { where: { id: id } });
        return ;
    }

    public async removeInitiative(id: number, userId: number): Promise<void> {
       await this.initiatives.destroy({where: {id: id, userId: userId}});
    }

    public async markAsRewarded(initiativeId: number) {
        const initiative: InitiativeModel = await this.initiatives.findOne( {where: {id: initiativeId}});
        initiative.set({rewarded: true}, {});
        await initiative.save();
    }
}
export default InitiativesStore