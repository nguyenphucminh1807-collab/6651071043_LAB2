export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Giới thiệu JobFinder</h1>
      <p className="mt-4 leading-relaxed text-slate-700">
        JobFinder là website tuyển dụng được xây dựng trong bài thực hành môn Thiết kế Web. Người dùng có thể tìm việc theo vị trí hoặc công ty, lọc theo khoảng lương và ngày đăng, xem thống kê thị trường qua biểu đồ và đọc chi tiết từng tin tuyển dụng.
      </p>
      <p className="mt-4 rounded-xl bg-brand-light/60 p-4 text-sm leading-relaxed text-slate-800">
        Lưu ý: toàn bộ doanh nghiệp và tin tuyển dụng trong website là <strong>dữ liệu minh họa</strong> do sinh viên soạn, không phải tin tuyển dụng thật và chưa được doanh nghiệp nào xác nhận.
      </p>
      <section id="chinh-sach" className="mt-10 scroll-mt-20">
        <h2 className="text-xl font-bold text-slate-900">Chính sách bảo mật</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Website không có máy chủ lưu trữ. Thông tin nhập vào các biểu mẫu đăng nhập, đăng ký và ứng tuyển chỉ được xử lý trên trình duyệt của bạn và không được gửi đi đâu.
        </p>
      </section>
      <section id="dieu-khoan" className="mt-8 scroll-mt-20">
        <h2 className="text-xl font-bold text-slate-900">Điều khoản sử dụng</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Website phục vụ mục đích học tập. Vui lòng không dùng các thông tin tuyển dụng minh họa để liên hệ hoặc nộp hồ sơ thật.
        </p>
      </section>
    </div>
  )
}
