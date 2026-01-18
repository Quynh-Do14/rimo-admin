import axios from "axios";
import { Endpoint } from "../../../core/common/apiLink";

class DistrictApiService {
    async getAll(params: any, setLoading: Function) {
        setLoading(true);
        try {
            return await axios.get(Endpoint.APIDistrict.Get, {
                params: { ...params },
            })
                .then(response => {
                    setLoading(false)
                    return response.data;
                });
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async getDetail(code: string, setLoading: Function) {
        setLoading(true);
        try {
            return await axios.get(`${Endpoint.APIDistrict.Get}${code}?depth=2`,)
                .then(response => {
                    setLoading(false)
                    return response.data;
                });
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new DistrictApiService();
