import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AllBlogs from './views/AllBlogs';
import EditBlog from './views/EditBlog';
import NewBlog from './views/NewBlog';
import ReadBlog from './views/ReadBlog';
import Login from './views/Login';
import Signup from './views/Signup';

import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path ="/login" element={<Login />} />
      <Route path ="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);