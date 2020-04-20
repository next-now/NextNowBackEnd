import axios, {AxiosInstance} from "axios";

class LocationService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create()
    }

    public async getLatLongForAddress(address: string): Promise<{lat: number, lon: number}> {
        console.log(`getting location for ${address}`);
        try {
       const reply:any = await this.api.get(`https://locationiq.org/v1/search.php?key=${process.env.GEO_API_TOKEN}&q=${address}&format=json`);
       const {lat, lon} = reply.data[0];

       return {lat, lon}
        }
        catch (e) {
            console.log("Error in location service: ", e)
            return {lat: 45.501, lon: -73.5673}
        }
    }
}
export default LocationService;
