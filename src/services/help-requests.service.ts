import HttpException from '../exceptions/HttpException';
import {isEmptyObject} from "../utils/util";
import HelpRequestsStore from "../stores/help-requests.store";
import {HelpRequest} from "../interfaces/help-request.interface";
import {CreateHelpRequestDto} from "../dtos/help-requests.dto";

class HelpRequestsService {
  private logger(message: string): void {
    console.log("[Help-Request-Service]", message);
  }
  private helpRequestStore = new HelpRequestsStore();

  public async findHelpRequestById(id: number): Promise<HelpRequest> {
    const helpRequest: HelpRequest = await this.helpRequestStore.findHelpRequestById(id);
    if (!helpRequest) throw new HttpException(404, "HelpRequest not found");

    return helpRequest;
  }

  public async createHelpRequest(helpRequestDto: CreateHelpRequestDto, userId: number): Promise<HelpRequest> {
    if (isEmptyObject(helpRequestDto)) throw new HttpException(400, "You're not helpRequestDto");
    this.logger("creating help request with " + JSON.stringify(helpRequestDto))
    return this.helpRequestStore.createNewHelpRequest({...helpRequestDto, userId, fulfilled:false} , helpRequestDto.categoriesIds);
  }

  public async updateHelpRequest(id: number, helpRequestDto: CreateHelpRequestDto): Promise<HelpRequest> {
    if (isEmptyObject(helpRequestDto)) throw new HttpException(400, "You're not helpRequestDto");

    return this.helpRequestStore.updateHelpRequest(helpRequestDto,id, helpRequestDto.categoriesIds);
  }

  public async deleteHelpRequest(id: number): Promise<void> {
    await this.helpRequestStore.deleteHelpRequest(id);
    return;
  }

  public async geOpenRequests() {
        return  this.helpRequestStore.getOpenHelpRequestsByFilter([1,2,3,4]);
    }
}

export default HelpRequestsService;