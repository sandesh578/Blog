import './App.css';
import TopBar from './components/topBar/TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Blog from './components/blog/Blog';
import Footer from './components/footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PostForm from './components/postForm/PostForm';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <>
      <Router>
        <TopBar />
        <Profile />
        <PostForm />
        <Blog />
        <Routes>
          <Route exact to='/' component={<Home />} />
          <Route to='/login' element={<Login />} />
          <Route to='/register' element={<Register />} />
          <Route to='/blogs' element={<Blog />} />
          <Route to='/admin' element={<PostForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
