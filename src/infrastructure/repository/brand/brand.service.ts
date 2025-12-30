import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/toast/message";
import { RequestService } from "../../utilities/response";

class BrandService {
    async GetBrand(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Brand.Get, {
                    ...params
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async GetBrandById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Brand.GetById}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };


    async AddBrandAdmin(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.Brand.Add,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm mới thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Thêm mới không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async UpdateBrandAdmin(id: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .putForm(`${Endpoint.Brand.Update}/${id}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Cập nhật không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async DeleteBrandAdmin(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Brand.Delete}/${id}`, {})
                .then(response => {
                    if (response) {
                        SuccessMessage("Xóa thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Xóa không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const brandService = new BrandService();

export default brandService;