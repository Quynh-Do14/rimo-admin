export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "auth/register"
        static Profile = "/users/me/profile"
        static RefreshToken = "/auth/refresh-token"
    }
    static Banner = class {
        static Get = "/banner"
        static GetById = "/banner"
        static Add = "/banner"
        static Update = "/banner"
        static Delete = "/banner"
    }
    static Product = class {
        static Get = "/product"
        static GetById = "/product"
        static Add = "/product"
        static Update = "/product"
        static Delete = "/product"
    }
    static Category = class {
        static Get = "/category"
        static GetById = "/category"
        static Add = "/category"
        static Update = "/category"
        static Delete = "/category"
    }
    static Blog = class {
        static Get = "/blog"
        static GetById = "/blog"
        static Add = "/blog"
        static Update = "/blog"
        static Delete = "/blog"
    }
    static BlogCategory = class {
        static Get = "/blog-category"
        static GetById = "/blog-category"
        static Add = "/blog-category"
        static Update = "/blog-category"
        static Delete = "/blog-category"
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
}