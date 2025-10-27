import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, Twitter, Linkedin } from 'react-feather';
import '../../types/css/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">SimuSoft</div>
          <div className="footer-links">
            <Link to="/" className="footer-link">首页</Link>
            <Link to="/resume" className="footer-link">个人简历</Link>
            <Link to="/projects" className="footer-link">项目管理</Link>
            <Link to="/papers" className="footer-link">论文管理</Link>
            <Link to="/life" className="footer-link">生活记录</Link>
          </div>
          <div className="footer-social">
            <button type="button" className="social-icon" aria-label="GitHub"><GitHub size={20} /></button>
            <button type="button" className="social-icon" aria-label="Twitter"><Twitter size={20} /></button>
            <button type="button" className="social-icon" aria-label="Linkedin"><Linkedin size={20} /></button>
        </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} SimuSoft. 保留所有权利。
        </div>
      </div>
    </footer>
  );
};

export default Footer;