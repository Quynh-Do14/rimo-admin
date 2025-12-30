import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/toast/message";
import { RequestService } from "../../utilities/response";

class UserService {
    async GetUser(param: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.User.Get, {
                    ...param
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

    async GetUserById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.User.GetById}/${id}`)
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
    async CreateUser(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.User.Create,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm vào người dùng thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Thêm vào người dùng không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }


    async UpdateUser(id: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.User.Update}/${id}`,
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

    async DeleteUser(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.User.Delete}/${id}`, {})
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

const userService = new UserService();

export default userService;