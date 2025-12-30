import { atom } from "recoil";

interface Product {
    url: string
    text: string
}

export const ProductState = atom({
    key: 'PRODUCT_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<Product>>[],

    }, // default value (aka initial value)
});
