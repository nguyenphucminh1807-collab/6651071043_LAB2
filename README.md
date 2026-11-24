# JobFinder – Website tuyển dụng / tìm việc

Bài thực hành **Thiết kế Web – Buổi 2** (GV: Nguyễn Thiện Dương).

- **Sinh viên:** Nguyễn Phúc Minh – **MSSV:** 6651071043
- **Repository :** `6651071043_LAB2`
- **Link GitHub:** _https://github.com/nguyenphucminh1807-collab/6651071043_LAB2.git_
- **Link website đã deploy:** _https://6651071043-lab-2.vercel.app/_

## Kết quả cá nhân hóa theo MSSV

| Đại lượng | Tính toán | Kết quả |
|---|---|---|
| S | 6+6+5+1+0+7+1+0+4+3 | **33** |
| D | 33 mod 15 | **3** → Tuyển dụng / Tìm việc |
| F | 43 mod 10 | **3** → Biểu đồ thống kê · Lọc theo khoảng giá/ngày · Animation chuyển trang |
| C | 6 mod 5 | **1** → Emerald `#059669` |

## Công nghệ

TypeScript (`strict: true`, không dùng `any`) · Vite 5 · React 18 (Hooks) · Tailwind CSS 3 · React Router v6 · Recharts · ESLint 9 · Vitest. State chỉ dùng `useState`/`useMemo`/Context API, không có thư viện state ngoài.

## Tính năng

**Ba tính năng bắt buộc (F = 3)**

1. **Biểu đồ thống kê** (`components/ChartSection.tsx`, `stats.ts`): 4 thẻ KPI + biểu đồ cột theo ngành, biểu đồ tròn tỷ lệ ngành, biểu đồ phân bố lương, biểu đồ theo địa điểm. Mọi số liệu được tính từ `src/data/data.json`; mỗi biểu đồ có tooltip, tiêu đề, tóm tắt bằng văn bản và bảng dữ liệu thay thế. Chunk biểu đồ chỉ được tải khi người dùng cuộn tới gần.
2. **Lọc theo khoảng lương/ngày** (`components/FilterPanel.tsx`, `filterJobs.ts`): lương tối thiểu/tối đa (nhập tay hoặc chọn nhanh), ngày đăng từ–đến, nút *Áp dụng* / *Xóa bộ lọc*, chip hiển thị bộ lọc đang bật, kiểm tra min > max và ngày bắt đầu > ngày kết thúc, empty state khi không có kết quả. Lọc lương theo nguyên tắc **khoảng lương của tin giao với khoảng đã chọn**.
3. **Animation chuyển trang** (`App.tsx`, `index.css`): mỗi route nằm trong phần tử `key={pathname}` nên được mount lại và chạy animation `page-enter` (fade-in + translateY 14px, 380 ms). Tự tắt khi người dùng bật `prefers-reduced-motion`.

**Khác:** tìm kiếm theo vị trí/công ty/kỹ năng (không phân biệt dấu, debounce 300 ms), trang chi tiết `/item/:id` (có form ứng tuyển demo, xử lý ID không tồn tại), đăng nhập/đăng ký (demo, chỉ validate), trang giới thiệu, 404, bộ lọc được giữ khi quay lại từ trang chi tiết.

> Toàn bộ 33 tin tuyển dụng và tên doanh nghiệp là **dữ liệu minh họa** tự soạn, không phải tin thật.

## Responsive (đúng đề bài)

`< 640px`: 1 cột · `640–1024px`: 2 cột · `≥ 1025px`: 3 cột, `≥ 1280px`: 4 cột (cấu hình trong `tailwind.config.js`).

## Cấu trúc thư mục

```text
6651071043_LAB2/
├── public/            favicon.svg, _redirects
├── src/
│   ├── components/    Header, Footer, HeroSection, JobCard, SearchBar, FilterPanel,
│   │                  Statistics, ChartSection, Loading, EmptyState, ...
│   ├── pages/         ListPage, DetailPage, NotFoundPage, AboutPage, AuthPage
│   ├── data/          data.json (33 việc làm), jobs.ts
│   ├── types/         job.ts
│   ├── context/       FiltersContext.ts, FiltersProvider.tsx
│   ├── hooks/         useFilters.ts, useDebouncedCallback.ts
│   ├── filterJobs.ts  logic lọc
│   ├── stats.ts       logic thống kê
│   ├── utils.ts       4 hàm bắt buộc + formatSalaryRange, formatDate
│   ├── utils.test.ts  file test của giảng viên (giữ nguyên)
│   └── App.tsx, main.tsx, index.css
├── design/wireframe.svg
├── submission/        nội dung hỗ trợ làm file PDF nộp bài
├── eslint.config.js, tsconfig.json, tailwind.config.js, vite.config.ts, vitest.config.ts
├── vercel.json, netlify.toml
└── package.json
```

## Cài đặt & chạy

```bash
npm install
npm run dev          # http://localhost:5173
npm run test         # Vitest
npx tsc --noEmit     # kiểm tra TypeScript
npx eslint .         # kiểm tra ESLint
npm run build        # build production vào dist/
npm run preview      # chạy thử bản build
```

## Triển khai

**Vercel (khuyến nghị):** đẩy mã lên GitHub → vercel.com → *Add New Project* → chọn repo → Framework *Vite* → Deploy. File `vercel.json` đã cấu hình rewrite để tải lại `/item/:id` không bị 404.

**Netlify:** *Add new site → Import from Git*, build `npm run build`, publish `dist`. `netlify.toml` và `public/_redirects` đã cấu hình sẵn.

## Lighthouse

Mở bản đã deploy trong Chrome → DevTools → Lighthouse → chế độ **Mobile** → Performance = 99 · Accessibility = 100 · Best Practices = 100
