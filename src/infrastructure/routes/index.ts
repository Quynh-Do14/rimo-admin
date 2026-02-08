import { ROUTE_PATH } from "../../core/common/appRouter";
import AgencyListPage from "../../pages/agency-management";
import AddAgencyManagement from "../../pages/agency-management/add";
import SlugAgencyManagement from "../../pages/agency-management/slug";
import BannerListPage from "../../pages/banner-management";
import AddBannerManagement from "../../pages/banner-management/add";
import SlugBannerManagement from "../../pages/banner-management/view";
import BlogListPage from "../../pages/blog-management";
import AddBlogManagement from "../../pages/blog-management/add";
import SlugBlogManagement from "../../pages/blog-management/slug";
import BrandListPage from "../../pages/brand-management";
import AddBrandManagement from "../../pages/brand-management/add";
import SlugBrandManagement from "../../pages/brand-management/slug";
import AgencyCategoryListPage from "../../pages/category-agency-management";
import AddCategoryAgencyManagement from "../../pages/category-agency-management/add";
import SlugCategoryAgencyManagement from "../../pages/category-agency-management/view";
import BlogCategoryListPage from "../../pages/category-blog-management";
import AddCategoryBlogManagement from "../../pages/category-blog-management/add";
import SlugCategoryBlogManagement from "../../pages/category-blog-management/view";
import ProductCategoryListPage from "../../pages/category-product-management";
import AddProductCategoryManagement from "../../pages/category-product-management/add";
import SlugProductCategoryManagement from "../../pages/category-product-management/slug";
import ContactListPage from "../../pages/contact-management";
import LoginPage from "../../pages/login";
import ProductListPage from "../../pages/product-management";
import AddProductManagement from "../../pages/product-management/add";
import SlugProductManagement from "../../pages/product-management/slug";
import ProductSeriesListPage from "../../pages/product-series-management";
import AddProductSeriesManagement from "../../pages/product-series-management/add";
import SlugProductSeriesManagement from "../../pages/product-series-management/slug";
import SeriesListPage from "../../pages/series-management";
import AddSeriesManagement from "../../pages/series-management/add";
import SlugSeriesManagement from "../../pages/series-management/view";
import UserListPage from "../../pages/user-management";
import AddUserManagement from "../../pages/user-management/add";
import SlugUserManagement from "../../pages/user-management/view";
import VideoListPage from "../../pages/video-management";
import AddVideoManagement from "../../pages/video-management/add";
import SlugVideoManagement from "../../pages/video-management/view";
import AdminLayout from "../common/layout/admin/MainLayout";

export const privateRoutes = [
    {
        path: ROUTE_PATH.MAIN_LAYOUT,
        component: AdminLayout,
        private: true,
        role: ["ADMIN", 'SELLER', 'WRITTER']
    },
    {
        path: ROUTE_PATH.USER_MANAGEMENT,
        component: UserListPage,
        private: true,
        role: ["ADMIN"],
    },
    {
        path: ROUTE_PATH.ADD_USER_MANAGEMENT,
        component: AddUserManagement,
        private: true,
        role: ["ADMIN"],
    },
    {
        path: ROUTE_PATH.VIEW_USER_MANAGEMENT,
        component: SlugUserManagement,
        private: true,
        role: ["ADMIN"],
    },

    {
        path: ROUTE_PATH.BANNER_MANAGEMENT,
        component: BannerListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_BANNER_MANAGEMENT,
        component: AddBannerManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_BANNER_MANAGEMENT,
        component: SlugBannerManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT,
        component: BlogCategoryListPage,
        private: true,
        role: ["ADMIN", 'WRITTER']
    },
    {
        path: ROUTE_PATH.ADD_CATEGORY_BLOG_MANAGEMENT,
        component: AddCategoryBlogManagement,
        private: true,
        role: ["ADMIN", 'WRITTER']
    },
    {
        path: ROUTE_PATH.VIEW_CATEGORY_BLOG_MANAGEMENT,
        component: SlugCategoryBlogManagement,
        private: true,
        role: ["ADMIN", 'WRITTER']
    },

    {
        path: ROUTE_PATH.BLOG_MANAGEMENT,
        component: BlogListPage,
        private: true,
        role: ["ADMIN", 'WRITTER']
    },
    {
        path: ROUTE_PATH.ADD_BLOG_MANAGEMENT,
        component: AddBlogManagement,
        private: true,
        role: ["ADMIN", 'WRITTER']
    },
    {
        path: ROUTE_PATH.VIEW_BLOG_MANAGEMENT,
        component: SlugBlogManagement,
        private: true,
        role: ["ADMIN", 'WRITTER']
    },

    {
        path: ROUTE_PATH.BRAND_MANAGEMENT,
        component: BrandListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_BRAND_MANAGEMENT,
        component: AddBrandManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_BRAND_MANAGEMENT,
        component: SlugBrandManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.PRODUCT_MANAGEMENT,
        component: ProductListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_PRODUCT_MANAGEMENT,
        component: AddProductManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_PRODUCT_MANAGEMENT,
        component: SlugProductManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.CATEGORY_PRODUCT_MANAGEMENT,
        component: ProductCategoryListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_CATEGORY_PRODUCT_MANAGEMENT,
        component: AddProductCategoryManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_CATEGORY_PRODUCT_MANAGEMENT,
        component: SlugProductCategoryManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.AGENCY_MANAGEMENT,
        component: AgencyListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_AGENCY_MANAGEMENT,
        component: AddAgencyManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_AGENCY_MANAGEMENT,
        component: SlugAgencyManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.CATEGORY_AGENCY_MANAGEMENT,
        component: AgencyCategoryListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_CATEGORY_AGENCY_MANAGEMENT,
        component: AddCategoryAgencyManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_CATEGORY_AGENCY_MANAGEMENT,
        component: SlugCategoryAgencyManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.VIDEO_MANAGEMENT,
        component: VideoListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.ADD_VIDEO_MANAGEMENT,
        component: AddVideoManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
    {
        path: ROUTE_PATH.VIEW_VIDEO_MANAGEMENT,
        component: SlugVideoManagement,
        private: true,
        role: ["ADMIN", 'SELLER']
    },

    {
        path: ROUTE_PATH.CONTACT_MANAGEMENT,
        component: ContactListPage,
        private: true,
        role: ["ADMIN", 'SELLER']
    },
]
