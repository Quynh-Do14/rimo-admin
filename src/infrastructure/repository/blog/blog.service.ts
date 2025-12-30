import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/toast/message";
import { RequestService } from "../../utilities/response";


class BlogService {
    async GetBlog(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Blog.Get, {
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
    async GetBlogById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Blog.GetById}/${id}`)
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


    async AddBlogAdmin(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.Blog.Add,
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
    async UpdateBlogAdmin(id: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .putForm(`${Endpoint.Blog.Update}/${id}`,
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
    async DeleteBlogAdmin(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Blog.Delete}/${id}`, {})
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

const blogService = new BlogService();

export default blogService;