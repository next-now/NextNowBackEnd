import * as bcrypt from 'bcrypt';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import {isEmptyObject} from '../utils/util';
import UserStore from "../stores/userStore";
import {User} from "../interfaces/users.interface";
import InitiativesStore from "../stores/initiatives.store";
import {Initiative} from "../interfaces/initiatives.interface";
import {CreateInitiativeDto} from "../dtos/initiatives.dto";

class InitiativeService {
  public initiativeStore = new InitiativesStore();

  public async findInitiativeById(id: number): Promise<Initiative> {
    const initiative: Initiative = await this.initiativeStore.findInitiativeById(id);
    if (!initiative) throw new HttpException(404, "You're not user");

    return initiative;
  }

  public async createInitiative(initiativeDto: CreateInitiativeDto, userId: number): Promise<Initiative> {
    if (isEmptyObject(initiativeDto)) throw new HttpException(400, "You're not initiativeDto");

    return this.initiativeStore.createNewInitiative({ ...initiativeDto, userId: userId});
  }

  public async updateInitiative(initiativeId: number, userId: number, initiativeDto: CreateInitiativeDto): Promise<Initiative> {
    if (isEmptyObject(initiativeDto)) throw new HttpException(400, "You're not initiativeDto");

    return this.initiativeStore.updateInitiative(initiativeDto, initiativeId, userId);
  }

  public async deleteInitiative(id: number, userId: number): Promise<void> {
    await this.initiativeStore.removeInitiative(id, userId);
    return;
  }
}

export default InitiativeService;