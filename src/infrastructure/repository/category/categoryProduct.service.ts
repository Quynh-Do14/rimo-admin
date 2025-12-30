import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/toast/message";
import { RequestService } from "../../utilities/response";

class CategoryProductService {
    async GetCategory(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Category.Get, {
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
    async GetCategoryById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Category.GetById}/${id}`)
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


    async AddCategoryAdmin(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.Category.Add,
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
    async UpdateCategoryAdmin(id: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .putForm(`${Endpoint.Category.Update}/${id}`,
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
    async DeleteCategoryAdmin(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Category.Delete}/${id}`, {})
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

const categoryProductService = new CategoryProductService();

export default categoryProductService;