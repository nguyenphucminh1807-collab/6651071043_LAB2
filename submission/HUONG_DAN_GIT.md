# Hướng dẫn commit thật (Windows PowerShell)

Đề yêu cầu **≥ 14 commit trải đều trong 5 tiếng**, message dạng `[HH:MM] mô tả`. Hãy commit **ngay khi hoàn thành từng việc thật**, dùng giờ hệ thống lúc đó. Không backdate hay sửa lịch sử, vì giảng viên có thể kiểm tra.

```powershell
cd 6651071043_LAB2
git init
git branch -M main
```

Gợi ý chia nhịp commit khi bạn đọc/hiểu/chỉnh từng phần của dự án:

```powershell
git add package.json package-lock.json tsconfig.json vite.config.ts vitest.config.ts index.html .gitignore
git commit -m "[HH:MM] Khởi tạo dự án Vite + React 18 + TypeScript strict"

git add tailwind.config.js postcss.config.js src/index.css public
git commit -m "[HH:MM] Cấu hình Tailwind, màu Emerald và breakpoint 640/1024"

git add src/types src/data
git commit -m "[HH:MM] Thêm interface Job và data.json 33 việc làm"

git add src/utils.ts src/utils.test.ts
git commit -m "[HH:MM] Viết 4 hàm tiện ích và file test của giảng viên"

git add eslint.config.js
git commit -m "[HH:MM] Cấu hình ESLint với 2 rule bổ sung"

git add src/components/Header.tsx src/components/Footer.tsx src/components/Logo.tsx src/components/ScrollManager.tsx
git commit -m "[HH:MM] Xây dựng Header, Footer và điều hướng"

git add src/components/HeroSection.tsx src/components/SearchBar.tsx src/hooks
git commit -m "[HH:MM] Thêm Hero và thanh tìm kiếm debounce"

git add src/components/JobCard.tsx src/components/CompanyLogo.tsx src/components/EmptyState.tsx src/components/Loading.tsx
git commit -m "[HH:MM] Tạo JobCard, EmptyState, Loading"

git add src/pages/ListPage.tsx src/context src/main.tsx
git commit -m "[HH:MM] Dựng trang danh sách việc làm"

git add src/pages/DetailPage.tsx src/pages/NotFoundPage.tsx src/App.tsx
git commit -m "[HH:MM] Thêm trang chi tiết /item/:id và 404"

git add src/filterJobs.ts src/components/FilterPanel.tsx
git commit -m "[HH:MM] Tính năng 2: lọc theo khoảng lương và ngày"

git add src/stats.ts src/components/Statistics.tsx src/components/ChartSection.tsx src/components/LazyOnVisible.tsx
git commit -m "[HH:MM] Tính năng 1: biểu đồ thống kê"

git add src/index.css src/App.tsx
git commit -m "[HH:MM] Tính năng 3: animation chuyển trang"   # nếu bạn chỉnh thêm; nếu không có thay đổi, bỏ qua

git add src/pages/AboutPage.tsx src/pages/AuthPage.tsx design
git commit -m "[HH:MM] Thêm trang giới thiệu, đăng nhập/đăng ký và wireframe"

git add README.md vercel.json netlify.toml submission
git commit -m "[HH:MM] Viết README và cấu hình deploy"
```

Đẩy lên GitHub:

```powershell
git remote add origin https://github.com/<tên-bạn>/6651071043-lab2-tuyen-dung-tim-viec.git
git push -u origin main
```
