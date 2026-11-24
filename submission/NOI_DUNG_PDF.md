# Mẫu nội dung file PDF nộp LMS

Điền các mục còn trống rồi dán vào Word/Google Docs → Xuất PDF.

1. **Họ tên:** Nguyễn Phúc Minh  **MSSV:** 6651071043
2. **Biến thể cá nhân hóa**
   - S = 6+6+5+1+0+7+1+0+4+3 = 33
   - D = 33 mod 15 = 3 → Tuyển dụng / Tìm việc
   - F = 43 mod 10 = 3 → Biểu đồ thống kê · Lọc theo khoảng giá/ngày · Animation chuyển trang
   - C = 6 mod 5 = 1 → Emerald #059669
3. **Link GitHub:** ……………………………
4. **Link website đã deploy:** ……………………………
5. **Link video demo (≤ 3 phút):** ……………………………
6. **4 ảnh chụp kiểm tra chất lượng (chụp từ máy của bạn):**
   - `npx tsc --noEmit` (0 lỗi)
   - `npx eslint .` (0 lỗi, 0 cảnh báo)
   - `npm run test` (toàn bộ test pass)
   - Lighthouse Mobile trên bản deploy
7. **Đoạn giải thích kỹ thuật 150–250 từ** – bạn tự viết bằng lời của mình. Gợi ý các ý nên có cho tính năng *Animation chuyển trang*:
   - Vấn đề: React Router đổi route nhưng không tự có hiệu ứng.
   - Cách làm: bọc `<Routes>` trong một `div` có `key={location.pathname}` để React unmount/mount lại khi đổi route; class `.page-enter` chạy `@keyframes` (opacity 0→1, translateY 14px→0, 380 ms).
   - Vì sao dùng CSS thay vì thư viện: nhẹ, không tăng bundle, chạy bằng compositor.
   - Truy cập được: `@media (prefers-reduced-motion: reduce)` tắt animation.
   - Hạn chế: chỉ có hiệu ứng vào, chưa có hiệu ứng thoát.
