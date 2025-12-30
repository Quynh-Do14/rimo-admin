import { ROUTE_PATH } from "../../core/common/appRouter";
import BannerListPage from "../../pages/banner-management";
import AddBannerManagement from "../../pages/banner-management/add";
import SlugBannerManagement from "../../pages/banner-management/view";
import BlogListPage from "../../pages/blog-management";
import AddBlogManagement from "../../pages/blog-management/add";
import SlugBlogManagement from "../../pages/blog-management/slug";
import BrandListPage from "../../pages/brand-management";
import AddBrandManagement from "../../pages/brand-management/add";
import SlugBrandManagement from "../../pages/brand-management/slug";
import BlogCategoryListPage from "../../pages/category-blog-management";
import AddCategoryBlogManagement from "../../pages/category-blog-management/add";
import SlugCategoryBlogManagement from "../../pages/category-blog-management/view";
import LoginPage from "../../pages/login";
import ProductListPage from "../../pages/product-management";
import AddProductManagement from "../../pages/product-management/add";
import SlugProductManagement from "../../pages/product-management/slug";
import UserListPage from "../../pages/user-management";
import AddUserManagement from "../../pages/user-management/add";
import SlugUserManagement from "../../pages/user-management/view";
import AdminLayout from "../common/layout/admin/MainLayout";

export const privateRoutes = [
    {
        path: ROUTE_PATH.MAIN_LAYOUT,
        component: AdminLayout,
        private: true,
    },
    {
        path: ROUTE_PATH.LOGIN,
        component: LoginPage,
        private: false,
    },
    {
        path: ROUTE_PATH.USER_MANAGEMENT,
        component: UserListPage,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_USER_MANAGEMENT,
        component: AddUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_USER_MANAGEMENT,
        component: SlugUserManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.BANNER_MANAGEMENT,
        component: BannerListPage,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_BANNER_MANAGEMENT,
        component: AddBannerManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_BANNER_MANAGEMENT,
        component: SlugBannerManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT,
        component: BlogCategoryListPage,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_CATEGORY_BLOG_MANAGEMENT,
        component: AddCategoryBlogManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_CATEGORY_BLOG_MANAGEMENT,
        component: SlugCategoryBlogManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.BLOG_MANAGEMENT,
        component: BlogListPage,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_BLOG_MANAGEMENT,
        component: AddBlogManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_BLOG_MANAGEMENT,
        component: SlugBlogManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.BRAND_MANAGEMENT,
        component: BrandListPage,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_BRAND_MANAGEMENT,
        component: AddBrandManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_BRAND_MANAGEMENT,
        component: SlugBrandManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.PRODUCT_MANAGEMENT,
        component: ProductListPage,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_PRODUCT_MANAGEMENT,
        component: AddProductManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_PRODUCT_MANAGEMENT,
        component: SlugProductManagement,
        private: true,
    },
]
