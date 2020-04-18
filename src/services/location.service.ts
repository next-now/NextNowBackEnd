import axios, {AxiosInstance} from "axios";

class LocationService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create()
    }

    public async getLatLongForAddress(address: string): Promise<{lat: number, lon: number}> {
       const reply:any = await this.api.get(`https://locationiq.org/v1/search.php?key=${process.env.GEO_API_TOKEN}&q=${address}&format=json`);
       const {lat, lon} = reply.data[0];
       return {lat, lon}
    }
}
export default LocationService;
