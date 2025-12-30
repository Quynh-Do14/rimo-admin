import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/toast/message";
import { RequestService } from "../../utilities/response";
import Cookies from "js-cookie";
import { clearSesionStorage } from "../../utilities/storage";
class AuthService {
    async login(data: any, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Auth.Login, {
                    ...data
                })
                .then(response => {
                    if (response) {
                        const token = {
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken,
                        }
                        Cookies.set("token", JSON.stringify(token), {
                            path: "/", // Cookie có hiệu lực toàn bộ domain
                            secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong production
                            httpOnly: false, // Đặt false vì client-side sử dụng
                            sameSite: "strict", // Ngăn ngừa CSRF
                            expires: 7, // Thời gian hết hạn cookie (7 ngày)
                        });
                    }
                    setLoading(false);
                    onBack();
                    SuccessMessage("Đăng nhập thành công", "")
                    return response;
                });
        } catch (error: any) {
            console.error(error)
            FailMessage("Đăng nhập không thành công", error.response.data.message)
        } finally {
            setLoading(false);
        }
    }
    async logout(setLoading: Function) {
        setLoading(true)
        try {
            localStorage.clear();
            clearSesionStorage();
            Cookies.remove('token', { path: '/' });
            SuccessMessage("Đăng xuất thành công", "")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            // window.location.reload()
            // window.location.href(config.routes.web.home)
        };
    };


    async profile(setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Auth.Profile).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }


    // async updateProfile(data: any, onBack: Function, setLoading: Function) {
    //     setLoading(true)
    //     try {
    //         return await RequestService
    //             .putForm(Endpoint.Auth.ProfileUpdate, {
    //                 ...data
    //             })
    //             .then(response => {
    //                 if (response) {
    //                     onBack();
    //                     SuccessMessage("Cập nhật thành công", "")
    //                 }
    //                 setLoading(false);
    //                 return response;
    //             });
    //     } catch (error: any) {
    //         console.error(error)
    //         FailMessage("Cập nhật không thành công", error.response.data.message)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    async register(data: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.post(Endpoint.Auth.Register, {
                ...data
            }).then(response => {
                setLoading(false)
                SuccessMessage("Đăng kí thành công", "")
                return response;
            });
        } catch (error: any) {
            FailMessage("Đăng nhập không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    // async changePassword(data: object, onBack: Function, setLoading: Function) {
    //     try {
    //         return await RequestService.put(Endpoint.Auth.ChangePassword,
    //             { ...data },
    //         ).then(response => {
    //             setLoading(false)
    //             SuccessMessage("Thay đổi mật khẩu thành công", "Tài khoản của bạn sẽ được đăng xuất")
    //             onBack()
    //             return response;
    //         });
    //     } catch (error: any) {
    //         FailMessage("Thay đổi mật khẩu không thành công", error.response.data.message)
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async forgotPassword(data: object, setLoading: Function) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(Endpoint.Auth.ForgotPassword,
    //             { ...data },
    //         ).then((response) => {
    //             if (response) {
    //                 setLoading(false);
    //                 SuccessMessage("Gửi Email thành công", "Yêu cầu thiết lập lại mật khẩu của bạn gửi thành công. Kiểm tra Email để thiết lập lại mật khẩu");
    //                 return response;
    //             }
    //         });
    //     } catch (error) {
    //         FailMessage("Gửi Email không thành công", "Kiểm tra lại thông tin Email")
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    // async resetPassword(code: string, data: object, setLoading: Function) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.put(`${Endpoint.Auth.ResetPassword}?code=${code}`,
    //             { ...data },
    //         ).then((response) => {
    //             if (response) {
    //                 setLoading(false);
    //                 SuccessMessage("Đổi mật khẩu thành công", "");
    //                 return response;
    //             }
    //         });
    //     } catch (error) {
    //         FailMessage("Đổi mật khẩu không thành công", "Kiểm tra lại thông tin Email")
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async verifyEmail(code: string, onBack: Function, setLoading: Function) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.get(`${Endpoint.Auth.VerifyEmail}?code=${code}`,
    //             {},
    //         ).then((response) => {
    //             if (response) {
    //                 setLoading(false);
    //                 onBack(true);
    //                 return response;
    //             }
    //         });
    //     } catch (error) {
    //         onBack(false)
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async LoginGoogle(authCode: any, data: object, onBack: Function, setLoading: Function) {
    //     try {
    //         return await RequestService.post(`${Endpoint.Auth.Google}?code=${authCode}`,
    //             { ...data },
    //         ).then(response => {
    //             setLoading(false)
    //             SuccessMessage("Đăng nhập thành công", "")
    //             onBack()
    //             return response;
    //         });
    //     } catch (error: any) {
    //         FailMessage("Đăng nhập không thành công", error.response.data.message)
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

}

const authService = new AuthService();

export default authService;
