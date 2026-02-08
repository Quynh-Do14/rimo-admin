import { ROUTE_PATH } from "./appRouter"

export interface MenuInterface {
  id: string
  text: string
  url: string
  icon: string
  children?: MenuInterface[]
  role: Array<"ADMIN" | "SELLER" | "WRITTER">
}

export default class Constants {

  static Menu = class {
    static PrivateList: MenuInterface[] = [
      {
        id: 'user-management',
        text: 'Quản lý người dùng',
        url: ROUTE_PATH.USER_MANAGEMENT,
        icon: 'fas fa-users',
        role: ["ADMIN"]
      },
      {
        id: 'banner-management',
        text: 'Quản lý banner',
        url: ROUTE_PATH.BANNER_MANAGEMENT,
        icon: 'fas fa-images',
        role: ["ADMIN", 'SELLER']
      },
      {
        id: 'categories',
        text: 'Quản lý danh mục',
        url: '#',
        icon: 'fas fa-folder-tree',
        role: ["ADMIN", "WRITTER", 'SELLER'],
        children: [
          {
            id: 'category-product',
            text: 'Danh mục sản phẩm',
            url: ROUTE_PATH.CATEGORY_PRODUCT_MANAGEMENT,
            icon: 'fas fa-boxes',
            role: ["ADMIN", 'SELLER']
          },
          {
            id: 'category-blog',
            text: 'Danh mục tin tức',
            url: ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT,
            icon: 'fas fa-folder-open',
            role: ["ADMIN", 'WRITTER']
          },
          {
            id: 'series',
            text: 'Dòng sản phẩm',
            url: ROUTE_PATH.CATEGORY_AGENCY_MANAGEMENT,
            icon: 'fas fa-layer-group',
            role: ["ADMIN", 'SELLER']
          }
        ]
      },
      {
        id: 'product-management',
        text: 'Quản lý sản phẩm',
        url: ROUTE_PATH.PRODUCT_MANAGEMENT,
        icon: 'fas fa-box-open',
        role: ["ADMIN", 'SELLER']
      },
      {
        id: 'agency-management',
        text: 'Quản lý đại lý',
        url: ROUTE_PATH.AGENCY_MANAGEMENT,
        icon: 'fas fa-store-alt',
        role: ["ADMIN", 'SELLER']
      },
      {
        id: 'blog-management',
        text: 'Quản lý tin tức',
        url: ROUTE_PATH.BLOG_MANAGEMENT,
        icon: 'fas fa-newspaper',
        role: ["ADMIN", 'WRITTER']
      },
      {
        id: 'video-management',
        text: 'Quản lý video',
        url: ROUTE_PATH.VIDEO_MANAGEMENT,
        icon: 'fas fa-video',
        role: ["ADMIN", 'WRITTER']
      },
      {
        id: 'contact-management',
        text: 'Quản lý liên hệ',
        url: ROUTE_PATH.CONTACT_MANAGEMENT,
        icon: 'fas fa-address-book',
        role: ["ADMIN", 'SELLER']
      },
    ]
  }

  static DefaultURL = 'idai.vn/'
  static TOKEN = 'token'
  static DEBOUNCE_SEARCH = 800

  static Params = class {
    static limit = 'limit'
    static page = 'page'
    static searchName = 'searchName'
    static search = 'search'
    static idDanhMuc = 'idDanhMuc'
    static parentId = 'parentId'
  }

  static PaginationClientConfigs = class {
    static Size = 8
    static LimitSize = 60
    static AllSize = 9000
    static PageSizeList = [
      { label: '8', value: 8 },
      { label: '16', value: 16 },
      { label: '48', value: 48 }
    ]
  }

  static PaginationConfigs = class {
    static Size = 10
    static SizeSearchPage = 8
    static LimitSize = 60
    static AllSize = 9000
    static PageSizeList = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 }
    ]
  }

  static UseParams = class {
    static Id = ':id'
  }
  static Roles = class {
    static List = [
      {
        label: 'Quản trị viên',
        value: 1
      },
      {
        label: 'Seller',
        value: 2
      },
      {
        label: 'Viết bài',
        value: 3
      },
    ]
  }

  static DisableAccount = class {
    static List = [
      {
        label: 'Khả dụng',
        value: true
      },
      {
        label: 'Vô hiệu hóa',
        value: false
      },
    ]
  }
  static DisplayConfig = class {
    static List = [
      {
        label: 'Hiển thị',
        value: true
      },
      {
        label: 'Không hiển thị',
        value: false
      },
    ]
  }
  static BannerType = class {
    static List = [
      {
        label: 'Trang chủ',
        value: "HOMEPAGE"
      },
      {
        label: 'Giới thiệu',
        value: "INTRODUCE"
      },
      {
        label: 'Đại lý',
        value: "AGENCY"
      },
      {
        label: 'Liên hệ',
        value: "CONTACT"
      },
      {
        label: 'Chính sách',
        value: "POLICY"
      },
    ]
  }
  static AdminStatusConfig = class {
    static Show = [
      {
        label: 'Hiển thị',
        value: true
      },
      {
        label: 'Không hiển thị',
        value: false
      }
    ]
    static TypeBlog = [
      {
        label: 'Tin chính',
        value: true
      },
      {
        label: 'Tin khác',
        value: false
      }
    ]
    static Approve = [
      {
        label: 'Đã duyệt',
        value: "true"
      },
      {
        label: 'Chưa duyệt',
        value: "false"
      }
    ]
  }
}
