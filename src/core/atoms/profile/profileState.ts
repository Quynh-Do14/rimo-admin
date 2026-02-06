import { atom } from "recoil";
import { AuthInterface } from "../../../infrastructure/interface/auth/auth.interface";

export const ProfileState = atom({
    key: 'PROFILE_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <AuthInterface>{},

    }, // default value (aka initial value)
});