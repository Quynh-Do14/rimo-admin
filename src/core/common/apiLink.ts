export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "auth/register"
        static Profile = "/auth/profile"
        static RefreshToken = "/auth/refresh-token"
    }
    static Banner = class {
        static Get = "/banner/private"
        static GetById = "/banner/private"
        static Add = "/banner"
        static Update = "/banner"
        static Delete = "/banner"
    }
    static Product = class {
        static Get = "/product/private"
        static GetById = "/product/private"
        static Add = "/product"
        static Update = "/product"
        static Delete = "/product"
    }
    static ProductSeries = class {
        static Get = "/product-series"
        static GetById = "/product-series"
        static Add = "/product-series"
        static Update = "/product-series"
        static Delete = "/product-series"
    }
    static Series = class {
        static Get = "/series"
        static GetById = "/series"
        static Add = "/series"
        static Update = "/series"
        static Delete = "/series"
    }
    static Category = class {
        static Get = "/category"
        static GetById = "/category/private"
        static Add = "/category"
        static Update = "/category"
        static Delete = "/category"
    }
    static Blog = class {
        static Get = "/blog/private"
        static GetById = "/blog/private"
        static Add = "/blog"
        static Update = "/blog"
        static Delete = "/blog"
    }
    static BlogCategory = class {
        static Get = "/blog-category"
        static GetById = "/blog-category/private"
        static Add = "/blog-category"
        static Update = "/blog-category"
        static Delete = "/blog-category"
    }
    static AgencyCategory = class {
        static Get = "/agency-category"
        static GetById = "/agency-category"
        static Add = "/agency-category"
        static Update = "/agency-category"
        static Delete = "/agency-category"
    }
    static Brand = class {
        static Get = "/brand"
        static GetById = "/brand"
        static Add = "/brand"
        static Update = "/brand"
        static Delete = "/brand"
    }
    static User = class {
        static Get = "/users"
        static GetById = "/users"
        static Create = "/users"
        static Update = "/users"
        static Delete = "/users"
    }

    static Agency = class {
        static Get = "/agency/private"
        static GetById = "/agency/private"
        static Add = "/agency"
        static Update = "/agency"
        static Delete = "/agency"
    }

    static APIDistrict = class {
        static Get = "https://provinces.open-api.vn/api/v1/p/"
    }

    static Video = class {
        static Get = "/video/private"
        static GetById = "/video/private"
        static Add = "/video"
        static Update = "/video"
        static Delete = "/video"
    }
    static Contact = class {
        static Get = "/contact"
        static GetById = "/contact"
        static Add = "/contact"
        static UpdateStatus = "/contact"
    }
    static Slogan = class {
        static Get = "/slogan/private"
        static GetById = "/slogan/private"
        static Add = "/slogan"
        static Update = "/slogan"
        static UpdateIndex = "/slogan/update-index"
        static Delete = "/slogan"
    }
}