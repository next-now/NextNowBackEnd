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

    public async findInitiativeById(userId: number): Promise<Initiative> {
        const initiative:InitiativeModel = await this.initiatives.findByPk(userId);
        return InitiativesStore.extractPureJSONObject(initiative);

    }

    public async updateInitiative(initiativeData: Omit<Initiative, "id"|"userId">, id: number, userId: number ) : Promise<Initiative> {
        const initiative: InitiativeModel = this.initiatives.update(initiativeData, { where: { id: id, userId: userId } });
        return InitiativesStore.extractPureJSONObject(initiative);

    }

    public async removeInitiative(id: number, userId: number): Promise<void> {
        this.initiatives.destroy({where: {id: id, userId: userId}});
    }
}

export default InitiativesStore