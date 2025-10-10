import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';

import Home from './pages/home.jsx';
import Blog from './components/blog/Blog.jsx';
import BlogDetail from './components/blog/BlogDetail.jsx';
import Index from './components/member/Index.jsx';
import UpdateMember from './components/account/UpdateMember.jsx';
import MyProducts from './components/product/MyProducts.jsx';
import AddProduct from './components/product/AddProduct.jsx';
import EditMyProduct from './components/product/EditMyProduct.jsx';
import DetailProduct from './components/product/DetailProduct.jsx';
import NotFound from './components/404/NotFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Các route có layout */}
        <Route
          path="/"
          element={
            <App>
              <Home />
            </App>
          }
        />
        <Route
          path="/blog"
          element={
            <App>
              <Blog />
            </App>
          }
        />
        <Route
          path="/blog/detail/:id"
          element={
            <App>
              <BlogDetail />
            </App>
          }
        />
        <Route
          path="/login"
          element={
            <App>
              <Index />
            </App>
          }
        />
        <Route
          path="/account/member"
          element={
            <App>
              <UpdateMember />
            </App>
          }
        />
        <Route
          path="/account/product"
          element={
            <App>
              <MyProducts />
            </App>
          }
        />
        <Route
          path="/account/product/add"
          element={
            <App>
              <AddProduct />
            </App>
          }
        />
        <Route
          path="/account/product/edit/:id"
          element={
            <App>
              <EditMyProduct />
            </App>
          }
        />
        <Route
          path="/product/detail/:id"
          element={
            <App>
              <DetailProduct />
            </App>
          }
        />

        {/* Trang 404 nằm ngoài App => không có header/footer/menu */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>
);
