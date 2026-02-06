import styles from "../../../../asset/css/admin/layout.module.css";
import Sidebar from "./Sider";
import Header from "./Header";
import { useEffect, useState } from "react";
import categoryProductService from "../../../repository/category/categoryProduct.service";
import categoryBlogService from "../../../repository/category/categoryBlog.service";
import { useRecoilState } from "recoil";
import { CategoryAgencyState, CategoryBlogState, CategoryProductState } from "../../../../core/atoms/category/categoryState";
import { BrandState } from "../../../../core/atoms/brand/brandState";
import brandService from "../../../repository/brand/brand.service";
import { SeriesState } from "../../../../core/atoms/series/series";
import seriesService from "../../../repository/series/series.service";
import { ProductState } from "../../../../core/atoms/product/productState";
import productService from "../../../repository/product/product.service";
import categoryAgencyService from "../../../repository/category/categoryAgency.service";
import { ProfileState } from "../../../../core/atoms/profile/profileState";
import authService from "../../../repository/auth/auth.service";


export default function AdminLayout({ breadcrumb, title, redirect, children }: any) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [, setCategoryProductState] = useRecoilState(CategoryProductState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);
    const [, setCategoryAgencyState] = useRecoilState(CategoryAgencyState);
    const [, setBrandState] = useRecoilState(BrandState);
    const [, setSeriesState] = useRecoilState(SeriesState);
    const [, setProductState] = useRecoilState(ProductState);
    const [profileState, setProfileState] = useRecoilState(ProfileState);

    const onGetListCategoryAsync = async () => {
        try {
            await categoryProductService.GetCategory(
                {},
                () => { }
            ).then((res) => {
                setCategoryProductState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListSeriesAsync = async () => {
        try {
            await seriesService.GetSeries(
                {
                    limit: 1000
                },
                () => { }
            ).then((res) => {
                setSeriesState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListBlogCategoryAsync = async () => {
        try {
            await categoryBlogService.GetBlogCategory(
                {
                    limit: 1000
                },
                () => { }
            ).then((res) => {
                setCategoryBlogState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListAgencyCategoryAsync = async () => {
        try {
            await categoryAgencyService.GetAgencyCategory(
                {
                    limit: 1000
                },
                () => { }
            ).then((res) => {
                setCategoryAgencyState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListBrandAsync = async () => {
        try {
            await brandService.GetBrand(
                {
                    limit: 1000
                },
                () => { }
            ).then((res) => {
                setBrandState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListProductAsync = async () => {
        try {
            await productService.GetProduct(
                {
                    limit: 1000
                },
                () => { }
            ).then((res) => {
                setProductState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetProfileAsync = async () => {
        try {
            await authService.profile(
                () => { }
            ).then((res) => {
                setProfileState({
                    data: res.user
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListCategoryAsync().then(_ => { });
        onGetListSeriesAsync().then(_ => { });
        onGetListBlogCategoryAsync().then(_ => { });
        onGetListBrandAsync().then(_ => { });
        onGetListProductAsync().then(_ => { });
        onGetListAgencyCategoryAsync().then(_ => { });
        onGetProfileAsync().then(_ => { });
    }, []);

    return (
        <div className={styles.wrapper}>
            <Sidebar isOpen={isSidebarOpen} profileState={profileState.data} />
            <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.full : ''}`}>
                <Header
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    breadcrumb={breadcrumb}
                    title={title}
                    redirect={redirect}
                    profileState={profileState.data}
                />
                <div className={styles.pageContent}>{children}</div>
            </div>
        </div>
    );
}
