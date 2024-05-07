import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Posts from './posts';
import NewPost from './new_post';
import NavBar from './nav_bar';
import Post from './post';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/posts/:postID" element={<Post />} />
        <Route path="*" element={<div>post not found </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
