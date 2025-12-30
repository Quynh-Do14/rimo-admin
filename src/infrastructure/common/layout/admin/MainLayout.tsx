import styles from "../../../../asset/css/admin/layout.module.css";
import Sidebar from "./Sider";
import Header from "./Header";
import { useEffect, useState } from "react";
import categoryProductService from "../../../repository/category/categoryProduct.service";
import categoryBlogService from "../../../repository/category/categoryBlog.service";
import { useRecoilState } from "recoil";
import { CategoryBlogState, CategoryProductState } from "../../../../core/atoms/category/categoryState";
import { BrandState } from "../../../../core/atoms/brand/brandState";
import { configImageURL } from "../../../helper/helper";
import brandService from "../../../repository/brand/brand.service";


export default function AdminLayout({ breadcrumb, title, redirect, children }: any) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [, setCategoryProductState] = useRecoilState(CategoryProductState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);
    const [, setBrandState] = useRecoilState(BrandState);

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

    const onGetListBlogCategoryAsync = async () => {
        try {
            await categoryBlogService.GetBlogCategory(
                {},
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

    const onGetListBrandAsync = async () => {
        try {
            await brandService.GetBrand(
                {},
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
    useEffect(() => {
        onGetListCategoryAsync().then(_ => { });
        onGetListBlogCategoryAsync().then(_ => { });
        onGetListBrandAsync().then(_ => { });
    }, []);

    return (
        <div className={styles.wrapper}>
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.full : ''}`}>
                <Header
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    breadcrumb={breadcrumb}
                    title={title}
                    redirect={redirect}
                />
                <div className={styles.pageContent}>{children}</div>
            </div>
        </div>
    );
}
