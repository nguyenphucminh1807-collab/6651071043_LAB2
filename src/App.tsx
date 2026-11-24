import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollManager from './components/ScrollManager'
import FiltersProvider from './context/FiltersProvider'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const location = useLocation()

  return (
    <FiltersProvider>
      <div className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">Bỏ qua đến nội dung chính</a>
        <ScrollManager />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {/* Tính năng 3: key theo pathname → mỗi lần đổi route, trang mới được mount lại và chạy animation fade + translate */}
          <div key={location.pathname} className="page-enter">
            <Routes location={location}>
              <Route path="/" element={<ListPage />} />
              <Route path="/item/:id" element={<DetailPage />} />
              <Route path="/gioi-thieu" element={<AboutPage />} />
              <Route path="/dang-nhap" element={<AuthPage mode="login" />} />
              <Route path="/dang-ky" element={<AuthPage mode="register" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </FiltersProvider>
  )
}
