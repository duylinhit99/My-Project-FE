import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {
  BrowserRouter as Routers,
  Route,
  Routes as Router,
} from 'react-router-dom';
import Home from './pages/home.jsx';
import Blog from './components/blog/Blog.jsx';
import BlogDetail from './components/blog/BlogDetail.jsx';
import Index from './components/member/Index.jsx';
import UpdateMember from './components/account/UpdateMember.jsx';
import MyProducts from './components/product/MyProducts.jsx';
import AddProduct from './components/product/AddProduct.jsx';
import EditMyProduct from './components/product/EditMyProduct.jsx';
import DetailProduct from './components/product/DetailProduct.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routers>
      <App>
        <Router>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/detail/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Index />} />
          <Route path="/account/member" element={<UpdateMember />} />
          <Route path="/account/product" element={<MyProducts />} />
          <Route path="/account/product/add" element={<AddProduct />} />
          <Route path="/account/product/edit/:id" element={<EditMyProduct />} />
          <Route path="/product/detail/:id" element={<DetailProduct />} />
        </Router>
      </App>
    </Routers>
  </StrictMode>
);
