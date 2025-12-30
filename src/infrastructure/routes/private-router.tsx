import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { isTokenStoraged } from '../utilities/storage';

export const PrivateRoute = ({ component: RoutePath }: any) => {
    const storage = isTokenStoraged();

    if (storage) {
        return RoutePath
    }
    else {
        return <Navigate to={ROUTE_PATH.LOGIN} />
    }
}