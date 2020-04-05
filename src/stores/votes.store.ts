import VoteModel from '../models/votes.model';

class VotesStore {
    private votes = VoteModel;

    public async addVote(userId: number, initiativeId: number): Promise<void>
    {
        await this.votes.findOrCreate({where:{userId: userId, initiativeId:initiativeId}});
    }

    public async removeVote(userId: number, initiativeId: number): Promise<void>
    {
        await this.votes.destroy({where: {userId: userId, initiativeId: initiativeId}});
    }

    public async getVoteStatus(userId: number, initiativeId: number): Promise<boolean>
    {
        const res: any = await this.votes.findOne({where: {userId: userId, initiativeId: initiativeId}});
        return res !== null;
    }

    public async getVoteCount(initiativeId: number): Promise<number>
    {
        const res = await this.votes.findAndCountAll({where: {initiativeId: initiativeId}});
        return res.count;
    }
}
export default VotesStore