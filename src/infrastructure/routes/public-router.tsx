import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { isTokenStoraged } from '../utilities/storage';

export const PublicRoute = ({ component: Component }: any) => {
    const storage = isTokenStoraged();

    if (!storage) {
        return Component;
    } else {
        // Nếu đã đăng nhập, điều hướng về homepage
        return <Navigate to={ROUTE_PATH.MAIN_LAYOUT} />;
    }
};