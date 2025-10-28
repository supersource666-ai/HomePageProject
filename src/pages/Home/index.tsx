import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, GitHub, BookOpen, Calendar } from 'react-feather';
import { Card } from 'antd';
import ThreeModel from './ThreeModel';
import '../../types/css/Home.css';

const modelPaths = [
  '/models/car_porsher.glb',
  '/models/train400.glb',
  '/models/train400.glb',
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-50">
      {/* ThreeModel展示区 */}
      <section className="hero-section pro-hero">
        <div className="container flex flex-col md:flex-row items-center justify-center">
          <div className="hero-text w-full flex flex-col items-center justify-center text-center mb-6 md:mb-0">
            <h1 className="text-4xl font-bold mb-6 text-gradient-cool">欢迎来到主页</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 text-center" style={{ maxWidth: 480 }}>
              这里是庄达源的学术与生活数字空间。
            </p>
          </div>
          {/* 三个并列的three-model-cool */}
          <div className="hero-image-group" style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
            {modelPaths.map((path, idx) => (
              <div key={idx} className="hero-image" style={{ position: 'relative', width: 220, height: 220 }}>
                <div className="three-model-cool">
                  <ThreeModel modelPath={path} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心功能区 */}
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
            <AntdFeatureCard icon={<FileText size={48} />} title="简历" link="/resume" delay={0.1} />
            <AntdFeatureCard icon={<GitHub size={48} />} title="项目" link="/projects" delay={0.2} />
            <AntdFeatureCard icon={<BookOpen size={48} />} title="论文" link="/papers" delay={0.3} />
            <AntdFeatureCard icon={<Calendar size={48} />} title="生活" link="/life" delay={0.4} />
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

const AntdFeatureCard: React.FC<FeatureCardProps> = ({ icon, title, link, delay }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      hoverable
      className="feature-card pro-card flex flex-col items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer opacity-0 animate-fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        boxShadow: isHovered
          ? '0 12px 32px rgba(108,99,255,0.18)'
          : '0 4px 16px rgba(108,99,255,0.08)',
        borderRadius: 18,
        border: '1.5px solid rgba(108,99,255,0.13)',
        background: isHovered
          ? 'linear-gradient(135deg,rgba(255,255,255,0.22) 60%,rgba(108,99,255,0.18) 100%)'
          : 'linear-gradient(135deg,rgba(255,255,255,0.22) 60%,rgba(108,99,255,0.08) 100%)',
      }}
      onClick={() => navigate(link)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      styles={{ body: { padding: '32px 0 24px 0', textAlign: 'center' } }} // 替换 bodyStyle
    >
      <div
        className="feature-icon mb-4 p-4 rounded-full transition-all duration-300 shadow-lg"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
            : 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
          color: isHovered ? '#fff' : '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px auto',
          width: 64,
          height: 64,
        }}
      >
        {icon}
      </div>
      <div className="text-lg font-semibold tracking-wide text-slate-800 dark:text-slate-200 drop-shadow-sm transition-colors duration-300" style={{ fontSize: '1.35rem', fontWeight: 700 }}>
        {title}
      </div>
    </Card>
  );
};

export default Home;