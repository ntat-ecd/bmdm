
import { SurveyPoint, CongressSession, Stats, CrisisItem } from './types';

export const INITIAL_STATS: Stats = {
  economy: 20,
  people: 30,
  stability: 40
};

export const SURVEY_POINTS: SurveyPoint[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    title: 'Thủ đô khó khăn',
    icon: '🏛️',
    representative: {
      name: 'Ông Vĩnh',
      role: 'Cán bộ hưu trí',
      avatar: '👨‍🦳'
    },
    description: [
      'Hàng người xếp hàng dài bên ngoài cửa hàng mậu dịch quốc doanh.',
      'Ông Vĩnh: "Thưa đại biểu, tôi đứng đây từ sáng sớm mà vẫn chưa đến lượt mua. Tem phiếu thì có, nhưng hàng hóa đâu mà mua chứ?"',
      'Ông Vĩnh: "Lương công chức thì chẳng đủ sống, giá lại tăng vùn vụt. Đồng tiền mất giá kinh khủng quá!"'
    ],
    keywords: ['LẠM PHÁT', 'KHAN HIẾM HÀNG HÓA'],
    options: [
      { 
        label: '(A) Ghi nhận tình hình thiếu lương thực, lạm phát.', 
        collects: true, 
        feedback: 'Đã ghi nhận LẠM PHÁT và KHAN HIẾM HÀNG HÓA.' 
      },
      { 
        label: '(B) Động viên người dân cố gắng, tin tưởng.', 
        collects: false, 
        feedback: 'Ông Vĩnh nhìn bạn với ánh mắt thất vọng.' 
      }
    ]
  },
  {
    id: 'rural',
    name: 'Miền Trung',
    title: 'Nông thôn bế tắc',
    icon: '🌾',
    representative: {
      name: 'Bác Năm',
      role: 'Nông dân lão thành',
      avatar: '👨‍🌾'
    },
    description: [
      'Cánh đồng lúa mênh mông nhưng lác đác người làm việc mệt mỏi.',
      'Bác Năm: "Làm nhiều cũng chẳng được hưởng bao nhiêu. Thóc lúa nộp khoán đủ, còn lại bán giá thấp lè tè."',
      'Bác Năm: "Chăn nuôi thêm vài con gà cũng bị coi là kinh tế tư nhân, sợ bị đánh tư sản. Khó khăn lắm!"'
    ],
    keywords: ['HỢP TÁC XÃ', 'CƠ CHẾ KHOÁN', 'TƯ NHÂN BỊ HẠN CHẾ'],
    options: [
      { 
        label: '(A) Ghi nhận vấn đề cơ chế khoán sản phẩm.', 
        collects: true, 
        feedback: 'Đã ghi nhận HỢP TÁC XÃ, CƠ CHẾ KHOÁN và HẠN CHẾ TƯ NHÂN.' 
      },
      { 
        label: '(B) Khuyên người dân an tâm lao động tập thể.', 
        collects: false, 
        feedback: 'Bác Năm lầm lũi quay đi.' 
      }
    ]
  },
  {
    id: 'hcmc',
    name: 'TP. Hồ Chí Minh',
    title: 'Nhà máy đình trệ',
    icon: '🏭',
    representative: {
      name: 'Anh Thành',
      role: 'Quản đốc nhà máy',
      avatar: '👨‍🔧'
    },
    description: [
      'Nhà máy cũ kỹ, máy móc hoen gỉ, công nhân ngồi rải rác chán nản.',
      'Anh Thành: "Thưa đại biểu, nhà máy đứng trước nguy cơ phá sản. Kế hoạch quá nặng, vật tư thiếu thốn."',
      'Anh Thành: "Cơ chế bao cấp này bó buộc quá! Có năng lực cũng chẳng thể phát huy được."'
    ],
    keywords: ['BAO CẤP', 'QUAN LIÊU', 'ĐÌNH ĐỐN SẢN XUẤT'],
    options: [
      { 
        label: '(A) Ghi nhận thực trạng quan liêu, bao cấp.', 
        collects: true, 
        feedback: 'Đã ghi nhận BAO CẤP, QUAN LIÊU và ĐÌNH ĐỐN.' 
      },
      { 
        label: '(B) Nhắc nhở công nhân tự lực cánh sinh.', 
        collects: false, 
        feedback: 'Anh Thành thở dài ngao ngán.' 
      }
    ]
  }
];

export const CONGRESS_SESSIONS: CongressSession[] = [
  {
    id: 1,
    title: 'Phiên 1: Kinh tế và Cơ chế',
    intro: 'Trong phiên thảo luận về Kinh tế, lạm phát đang ở mức 774.7%, sản xuất bế tắc vì cơ chế cũ.',
    question: 'Quan điểm nào sau đây phù hợp nhất để đưa vào Báo cáo Chính trị?',
    options: [
      {
        label: 'Củng cố kinh tế quốc doanh, hạn chế tư nhân.',
        impact: { economy: -20, people: -20, stability: -20 },
        feedback: 'Sai lầm! Nền kinh tế tiếp tục trì trệ.',
        resolutionText: 'Duy trì cơ chế bao cấp, ưu tiên kinh tế quốc doanh.',
        isInnovation: false
      },
      {
        label: 'Phát triển kinh tế nhiều thành phần, thừa nhận kinh tế tư nhân.',
        impact: { economy: 30, people: 30, stability: 30 },
        feedback: 'Chính xác! Tạo động lực mạnh mẽ cho sản xuất.',
        resolutionText: 'Phát triển kinh tế hàng hóa nhiều thành phần, vận dụng cơ chế thị trường.',
        isInnovation: true
      },
      {
        label: 'Cải cách nhỏ lẻ nhưng giữ nguyên quản lý vĩ mô.',
        impact: { economy: -20, people: -20, stability: -20 },
        feedback: 'Không hiệu quả! Chưa giải quyết được gốc rễ vấn đề.',
        resolutionText: 'Thực hiện những cải tiến nhỏ lẻ nhưng giữ nguyên bao cấp.',
        isInnovation: false
      }
    ]
  },
  {
    id: 2,
    title: 'Phiên 2: Nông nghiệp',
    intro: 'Vấn đề lương thực nhức nhối, nông dân thiếu động lực vì cơ chế hợp tác xã cũ.',
    question: 'Giải pháp nào giúp đảm bảo an ninh lương thực?',
    options: [
      {
        label: 'Tăng cường tuyên truyền nông dân vào hợp tác xã.',
        impact: { economy: -20, people: -20, stability: -20 },
        feedback: 'Sai lầm! Người dân không còn mặn mà với làm chung.',
        resolutionText: 'Tiếp tục duy trì mô hình hợp tác xã tập trung.',
        isInnovation: false
      },
      {
        label: 'Khoán sản phẩm đến người lao động, khuyến khích kinh tế hộ.',
        impact: { economy: 30, people: 30, stability: 30 },
        feedback: 'Tuyệt vời! Nông dân sẽ tích cực sản xuất.',
        resolutionText: 'Thực hiện khoán sản phẩm đến người lao động (Khoán 10).',
        isInnovation: true
      },
      {
        label: 'Mở rộng nông trường quốc doanh bằng đầu tư công.',
        impact: { economy: -20, people: -20, stability: -20 },
        feedback: 'Lãng phí! Không giải quyết được động lực cá nhân.',
        resolutionText: 'Tập trung đầu tư cho các nông trường quốc doanh lớn.',
        isInnovation: false
      }
    ]
  },
  {
    id: 3,
    title: 'Phiên 3: Xây dựng Đảng',
    intro: 'Nạn quan liêu, tham nhũng làm suy giảm niềm tin của nhân dân.',
    question: 'Giải pháp nào giúp khôi phục niềm tin của quần chúng?',
    options: [
      {
        label: 'Kỷ luật nội bộ âm thầm để giữ gìn uy tín.',
        impact: { economy: -20, people: -20, stability: -20 },
        feedback: 'Sai lầm! Dân chúng cần sự minh bạch.',
        resolutionText: 'Xử lý nội bộ kín đáo để bảo vệ hình ảnh Đảng.',
        isInnovation: false
      },
      {
        label: 'Nhìn thẳng vào sự thật, phê bình công khai.',
        impact: { economy: 30, people: 30, stability: 30 },
        feedback: 'Đúng đắn! Sự trung thực tạo ra sức mạnh đổi mới.',
        resolutionText: 'Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.',
        isInnovation: true
      },
      {
        label: 'Thay cán bộ trẻ nhưng giữ nguyên lề lối cũ.',
        impact: { economy: -20, people: -20, stability: -20 },
        feedback: 'Vô ích! "Bình mới rượu cũ" không giải quyết được gì.',
        resolutionText: 'Thay đổi nhân sự nhưng không đổi mới tư duy quản lý.',
        isInnovation: false
      }
    ]
  }
];

export const CRISIS_ITEMS: CrisisItem[] = [];
