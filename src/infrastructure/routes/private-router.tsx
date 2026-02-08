import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { isTokenStoraged } from '../utilities/storage';
import { useEffect, useState } from 'react';
import authService from '../repository/auth/auth.service';
import { AuthInterface } from '../interface/auth/auth.interface';

export const PrivateRoute = ({ component: RoutePath, role }: any) => {
    const storage = isTokenStoraged();
    const [profileState, setProfileState] = useState<AuthInterface>()
    const onGetProfileAsync = async () => {
        try {
            await authService.profile(
                () => { }
            ).then((res) => {
                setProfileState(res.user)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetProfileAsync().then(_ => { });
    }, []);
    const isRole: boolean = role && profileState && role?.includes(profileState.role_name);
    if (!storage) {
        // Không có token → chưa đăng nhập
        return <Navigate to={ROUTE_PATH.LOGIN} />
    }
    if (profileState) {
        if (role && !isRole) {
            // Có token nhưng không đúng role → không có quyền
            return <Navigate to={ROUTE_PATH.MAIN_LAYOUT} />
        }

        // Có token và đúng role (hoặc route không yêu cầu role)
        return RoutePath;
    }

}