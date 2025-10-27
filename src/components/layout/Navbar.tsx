import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动事件，动态修改导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="logo">
          SimuSoft
        </Link>

        {/* 桌面导航 */}
        <div className="desktop-nav">
          <Link to="/" className="nav-link">首页</Link>
          <Link to="/resume" className="nav-link">个人简历</Link>
          <Link to="/projects" className="nav-link">项目管理</Link>
          <Link to="/papers" className="nav-link">论文管理</Link>
          <Link to="/life" className="nav-link">生活记录</Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 移动端导航菜单 */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>首页</Link>
          <Link to="/resume" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>个人简历</Link>
          <Link to="/projects" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>项目管理</Link>
          <Link to="/papers" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>论文管理</Link>
          <Link to="/life" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>生活记录</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;