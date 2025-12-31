import { atom } from "recoil";

export const SeriesState = atom({
    key: 'SERIES_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<any>>[],

    }, // default value (aka initial value)
});
