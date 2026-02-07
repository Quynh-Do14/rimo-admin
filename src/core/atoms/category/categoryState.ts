import { atom } from "recoil";
import { CategoryProductInterface } from "../../../infrastructure/interface/category/categoryProduct.interface";
import { CategoryAgencyInterface } from "../../../infrastructure/interface/category/categoryAgency.interface";
import { CategoryBlogInterface } from "../../../infrastructure/interface/category/categoryBlog.interface";

export const CategoryBlogState = atom({
    key: 'CATEGORY_BLOG_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryBlogInterface>>[],

    }, // default value (aka initial value)
});

export const CategoryProductState = atom({
    key: 'CATEGORY_PRODUCT_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryProductInterface>>[],

    }, // default value (aka initial value)
});

export const CategoryAgencyState = atom({
    key: 'CATEGORY_AGENCY_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryAgencyInterface>>[],

    }, // default value (aka initial value)
});
