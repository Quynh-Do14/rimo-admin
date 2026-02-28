import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/toast/message";
import { RequestService } from "../../utilities/response";

class UploadService {
    async UploadSingle(data: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.Upload.Single,
                    data
                )
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Tải ảnh ko thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }

    }
}
const uploadService = new UploadService();

export default uploadService;