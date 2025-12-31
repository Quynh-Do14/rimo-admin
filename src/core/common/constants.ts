import { ROUTE_PATH } from "./appRouter"

export default class Constants {

  static Menu = class {
    static PrivateList = [
      {
        id: 1,
        text: 'Quản lý người dùng',
        url: ROUTE_PATH.USER_MANAGEMENT,
        icon: 'fas fa-users'
      },
      {
        id: 2,
        text: 'Quản lý banner',
        url: ROUTE_PATH.BANNER_MANAGEMENT,
        icon: 'fas fa-images'
      },
      {
        id: 3,
        text: 'Quản lý thương hiệu',
        url: ROUTE_PATH.BRAND_MANAGEMENT,
        icon: 'fas fa-copyright' // Icon phù hợp hơn cho thương hiệu
      },
      {
        id: 4, // Đã sửa id từ 3 thành 4
        text: 'Quản lý dòng sản phẩm',
        url: ROUTE_PATH.SERIES_MANAGEMENT,
        icon: 'fas fa-layer-group' // Icon phù hợp hơn cho dòng sản phẩm
      },
      {
        id: 5, // Đã sửa id từ 4 thành 5
        text: 'Quản lý sản phẩm',
        url: '', // Để trống vì có menu con
        icon: 'fas fa-boxes',
        children: [
          {
            id: 51, // Đã sửa id từ 41 thành 51
            text: 'Danh sách sản phẩm',
            url: ROUTE_PATH.PRODUCT_MANAGEMENT,
            icon: 'fas fa-list' // Icon phù hợp cho danh sách
          },
          {
            id: 52, // Đã sửa id từ 42 thành 52
            text: 'Thông số sản phẩm',
            url: ROUTE_PATH.PRODUCT_SERIES_MANAGEMENT,
            icon: 'fas fa-sliders-h' // Icon phù hợp cho thông số/cài đặt
          }
        ]
      },
      {
        id: 6, // Đã sửa id từ 5 thành 6
        text: 'Quản lý danh mục tin tức',
        url: ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT,
        icon: 'fas fa-folder-open'
      },
      {
        id: 7, // Đã sửa id từ 6 thành 7
        text: 'Quản lý tin tức',
        url: ROUTE_PATH.BLOG_MANAGEMENT,
        icon: 'fas fa-newspaper'
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
