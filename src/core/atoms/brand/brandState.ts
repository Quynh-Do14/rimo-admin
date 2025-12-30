import { atom } from "recoil";

export const BrandState = atom({
    key: 'BRAND_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<any>>[],

    }, // default value (aka initial value)
});
