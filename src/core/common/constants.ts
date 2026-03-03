import { ROUTE_PATH } from "./appRouter"
import section1 from "../../asset/img/section/section1.png"
import section2 from "../../asset/img/section/section2.png"
import section3 from "../../asset/img/section/section3.png"
import section4 from "../../asset/img/section/section4.png"

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
        id: 'media-library',
        text: 'Thư viện media',
        url: '#',
        icon: 'fas fa-photo-video',
        role: ["ADMIN", 'SELLER'],
        children: [
          {
            id: 'banner-management',
            text: 'Quản lý banner',
            url: ROUTE_PATH.BANNER_MANAGEMENT,
            icon: 'fas fa-image',
            role: ["ADMIN", 'SELLER']
          },
          {
            id: 'homepage-images',
            text: 'Hình ảnh trang chủ',
            url: ROUTE_PATH.SLOGAN_MANAGEMENT,
            icon: 'fas fa-images',
            role: ["ADMIN", 'SELLER']
          },
          {
            id: 'homepage-config',
            text: 'Cấu hình trang chủ', // Đã đổi tên
            url: ROUTE_PATH.CONFIG_PAGE_MANAGEMENT,
            icon: 'fas fa-home', // Đã đổi icon thành hình ngôi nhà
            role: ["ADMIN", 'SELLER']
          },
        ]
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
        id: 'content-page-other',
        text: 'Nội dung các trang', // Mục riêng cho các trang khác
        url: ROUTE_PATH.CONTENT_PAGE_MANAGEMENT, // Có thể cần thêm route riêng
        icon: 'fas fa-file-alt', // Icon văn bản
        role: ["ADMIN", 'SELLER', 'WRITTER']
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
  static DraftConfig = class {
    static List = [
      {
        label: 'Lưu nháp',
        value: true
      },
      {
        label: 'Hoàn thiện',
        value: false
      },
    ]
  }
  static StatusConfig = class {
    static List = [
      {
        label: 'Đã xử lí',
        value: true
      },
      {
        label: 'Chưa xử lí',
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
  static ConfigPage = class {
    static List = [
      {
        label: 'Tiêu đề Website',
        value: "TITLE_PAGE",
        isShowBackground: false,
        darkBackground: false,
        image: null
      },
      {
        label: 'Khung 1',
        value: "SECTION_1",
        isShowBackground: true,
        darkBackground: true,
        image: section1
      },
      {
        label: 'Khung 2',
        value: "SECTION_2",
        isShowBackground: true,
        darkBackground: true,
        image: section2
      },
      {
        label: 'Khung 3',
        value: "SECTION_3",
        isShowBackground: true,
        darkBackground: true,
        image: section3
      },
      {
        label: 'Khung 4',
        value: "SECTION_4",
        isShowBackground: true,
        darkBackground: false,
        image: section4
      },
    ]
    static ListIndex = [
      {
        label: 'Vị trí 1',
        value: "1",
      },
      {
        label: 'Vị trí 2',
        value: "2",
      },
      {
        label: 'Vị trí 3',
        value: "3",
      },
      {
        label: 'Vị trí 4',
        value: "4",
      },
    ]
  }

  static ContentPage = class {
    static ListType = [
      {
        label: 'Chân trang',
        value: "FOOTER",
      },
      {
        label: 'Giới thiệu',
        value: "INTRODUCE",
      },
      {
        label: 'Thông tin về điều kiện giao dịch chung',
        value: "GIAO_DICH_CHUNG",
      },
      {
        label: 'Chính sách bảo mật',
        value: "BAO_MAT",
      },
      {
        label: 'Chính sách mua hàng',
        value: "MUA_HANG",
      },
      {
        label: 'Chính sách bảo hành - đổi trả',
        value: "BAO_HANH",
      },
      {
        label: 'Thông tin về vận chuyển và giao nhận',
        value: "VAN_CHUYEN",
      },
      {
        label: 'Thông tin về các phương thức thanh toán',
        value: "THANH_TOAN",
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
