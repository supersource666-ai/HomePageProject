import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, GitHub, BookOpen, Calendar, ArrowRight, ChevronRight } from 'react-feather';
import ThreeModel from './ThreeModel';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动事件，用于动态效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-50">
      {/* 专业酷炫英雄区 */}
      <section className={`hero-section pro-hero flex flex-col items-center justify-center min-h-[85vh] py-10 md:py-16 relative overflow-hidden transition-all duration-700 ${scrolled ? 'py-6' : ''}`}>
        {/* 背景渐变动画效果 */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 opacity-20 rounded-full blur-3xl absolute -top-40 -left-40 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="w-[400px] h-[400px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 opacity-20 rounded-full blur-2xl absolute -bottom-24 -right-24 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-grid-slate-200/10 dark:bg-grid-slate-700/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))]"></div>
        </div>
        
        <div className="container flex flex-col items-center justify-center text-center relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8 md:mb-12 flex flex-col items-center gap-4 md:gap-6 w-full">
            {/* 3D模型容器 - 添加进入动画 */}
            <div className="w-full max-w-md h-48 md:h-64 mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <ThreeModel />
            </div>
            
            {/* 标题 - 添加渐变和进入动画 */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              仿真 · 科研 · 创新
            </h1>
            
            {/* 副标题 - 添加进入动画 */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              专业一站式学术与科研平台，极致高效，极简体验。
            </p>
            
            {/* 按钮 - 添加进入动画和悬停效果 */}
            <button
              className="btn btn-primary px-8 py-4 text-lg font-medium rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 mt-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              onClick={() => navigate('/projects')}
            >
              立即体验 <ArrowRight size={20} className="ml-2 inline transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        
        {/* 滚动指示器 */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
          <span className="text-sm text-slate-500 dark:text-slate-400 mb-2">向下滚动</span>
          <ChevronRight size={20} className="rotate-90 text-slate-400" />
        </div> */}
      </section>

      {/* 专业功能区 */}
      <section className="features-section py-12 md:py-20 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400">
              核心功能
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              全方位覆盖学术科研与个人展示需求，简洁高效的功能体验
            </p>
          </div>
          
          <div className="features-grid pro-features grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard icon={<FileText size={48} />} title="简历" link="/resume" delay={0.1} />
            <FeatureCard icon={<GitHub size={48} />} title="项目" link="/projects" delay={0.2} />
            <FeatureCard icon={<BookOpen size={48} />} title="论文" link="/papers" delay={0.3} />
            <FeatureCard icon={<Calendar size={48} />} title="生活" link="/life" delay={0.4} />
          </div>
        </div>
      </section>
    </div>
  );
};


type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  link: string;
  delay: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, link, delay }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="feature-card pro-card flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl transition-all duration-300 cursor-pointer opacity-0 animate-fade-in-up"
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      onClick={() => navigate(link)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`feature-icon mb-4 p-4 rounded-full transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'} shadow-lg`}
        style={{
          background: isHovered ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
          color: isHovered ? '#ffffff' : '#3b82f6'
        }}
      >
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, {
          className: `transition-all duration-300`
        }) : icon}
      </div>
      <div className="text-lg font-semibold tracking-wide text-slate-800 dark:text-slate-200 drop-shadow-sm transition-colors duration-300" style={{fontSize: '1.35rem', fontWeight: 700}}>
        {title}
      </div>
    </div>
  );
};

export default Home;