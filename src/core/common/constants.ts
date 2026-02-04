import { ROUTE_PATH } from "./appRouter"

export interface MenuInterface {
  id: string
  text: string
  url: string
  icon: string
  children?: MenuInterface[]
}

export default class Constants {

  static Menu = class {
    static PrivateList: MenuInterface[] = [
      {
        id: 'user-management',
        text: 'Quản lý người dùng',
        url: ROUTE_PATH.USER_MANAGEMENT,
        icon: 'fas fa-users'
      },
      {
        id: 'banner-management',
        text: 'Quản lý banner',
        url: ROUTE_PATH.BANNER_MANAGEMENT,
        icon: 'fas fa-images'
      },
      {
        id: 'categories',
        text: 'Quản lý danh mục',
        url: '#',
        icon: 'fas fa-folder-tree',
        children: [
          {
            id: 'category-product',
            text: 'Danh mục sản phẩm',
            url: ROUTE_PATH.CATEGORY_PRODUCT_MANAGEMENT,
            icon: 'fas fa-boxes'
          },
          {
            id: 'category-blog',
            text: 'Danh mục tin tức',
            url: ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT,
            icon: 'fas fa-folder-open'
          },
          {
            id: 'series',
            text: 'Dòng sản phẩm',
            url: ROUTE_PATH.CATEGORY_AGENCY_MANAGEMENT,
            icon: 'fas fa-layer-group'
          }
        ]
      },
      {
        id: 'product-management',
        text: 'Quản lý sản phẩm',
        url: ROUTE_PATH.PRODUCT_MANAGEMENT,
        icon: 'fas fa-box-open',
      },
      {
        id: 'agency-management',
        text: 'Quản lý đại lý',
        url: ROUTE_PATH.AGENCY_MANAGEMENT,
        icon: 'fas fa-store-alt'
      },
      {
        id: 'blog-management',
        text: 'Quản lý tin tức',
        url: ROUTE_PATH.BLOG_MANAGEMENT,
        icon: 'fas fa-newspaper'
      },
      {
        id: 'video-management',
        text: 'Quản lý video',
        url: ROUTE_PATH.VIDEO_MANAGEMENT,
        icon: 'fas fa-video'
      },
      {
        id: 'contact-management',
        text: 'Quản lý liên hệ',
        url: ROUTE_PATH.CONTACT_MANAGEMENT,
        icon: 'fas fa-address-book'
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
      {
        label: 'Người dùng',
        value: 4
      }
    ]
  }
  static BannerType = class {
    static List = [
      {
        label: 'Banner chính',
        value: "MAIN_BANNER"
      },
      {
        label: 'Banner phụ',
        value: "SUB_BANNER"
      }
    ]
    static BannerTypeConfig = class {
      static Main = {
        label: 'Banner chính',
        value: "MAIN_BANNER"
      }
      static Sub = {
        label: 'Banner phụ',
        value: "SUB_BANNER"
      }
    }
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
