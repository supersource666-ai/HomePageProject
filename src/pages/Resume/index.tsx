import React from 'react';
import './Resume.css'; // 对应样式文件，后续需创建
import { FileText, Phone, Mail, GitHub, Star, Book, Briefcase, Award, User } from 'react-feather';

// 个人简历组件
const Resume: React.FC = () => {
  return (
    <div className="resume-page py-xl">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-xl tracking-wider">个人简历</h1>
        <div className="cv-container flex flex-col md:flex-row gap-xl">
          {/* 左侧边栏 */}
          <div className="cv-side w-full md:w-1/3 bg-gray-50 p-lg rounded-lg shadow-md">
            <div className="me mb-lg text-center">
              <div className="portrait mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-primary shadow" style={{ width: 104, height: 104 }}>
                <img src="\avater.jfif" alt="庄达源头像" style={{ width: 104, height: 104, objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <h1 id="username" className="text-2xl font-bold mb-2">庄达源</h1>
              <h4 id="persona-tag" className="text-gray-600">Python / Web / Unity / AI</h4>
            </div>
            <InfoUnit 
              icon={<FileText size={18} />} 
              title="基本信息"
              items={[
                { label: "性别", value: "男" },
                { label: "出生年月", value: "1997-11" },
                { label: "学历", value: "博士" },
                { label: "就读院校", value: "西南交通大学" },
                { label: "专业", value: "车辆工程" },
                { label: "入学年份", value: "2024" }
              ]}
            />
            <InfoUnit 
              icon={<Phone size={18} />} 
              title="联系方式"
              items={[
                { label: "手机", value: <a href="tel:17853314069" className="text-primary hover:underline">17853314069</a> },
                { label: "邮箱", value: <a href="mailto:supersource@my.swjtu.edu.cn" className="text-primary hover:underline">supersource@my.swjtu.edu.cn</a> },
                { label: "个人主页", value: <a href="https://supersource2rose.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supersource2rose.shop</a> },
                { label: "Github", value: <a href="https://github.com/supersource6666" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/supersource6666</a> }
              ]}
            />
            <div className="info-unit mb-lg">
              <h2 className="info-header flex items-center gap-md mb-3">
                <Star size={18} color="#2563eb" />
                <span className="info-title font-bold">技能点</span>
              </h2>
              <hr className="mb-4" />
              <ul className="progress-list space-y-4">
                <SkillProgress label="Python" value={90} />
                <SkillProgress label="html/css" value={80} />
                <SkillProgress label="Javascript/TypeScript" value={75} />
                <SkillProgress label="机器学习/深度学习" value={70} />
                <SkillProgress label="Linux/服务器" value={65} />
                <SkillProgress label="英语" value={80} />
              </ul>
            </div>
            <InfoUnit 
              icon={<Briefcase size={18} />} 
              title="技术栈"
              items={[
                { label: "前端", value: "React.js, Vue.js, jQuery, TailwindCSS" },
                { label: "后端", value: "Flask, Django, FastAPI, SpringBoot, Node.js, MongoDB, MySQL, Redis" },
                { label: "AI/数据", value: "PyTorch, TensorFlow, scikit-learn, pandas, numpy" },
                { label: "其它", value: "Docker, Git, Linux, Nginx, VSCode" }
              ]}
            />
            <div className="info-unit">
              <h2 className="info-header flex items-center gap-md mb-3">
                <img src="https://img.icons8.com/ios-filled/24/2563eb/weixing.png" alt="微信" className="inline mr-2" style={{width: 18, height: 18}} />
                <span className="info-title font-bold">个人微信</span>
              </h2>
              <hr className="mb-4" />
              <div className="weixin text-center">
                <img 
                  src="/WXIMG.JPG"
                  alt="个人微信二维码" 
                  className="w-32 h-32 mx-auto rounded-md border border-gray-200 shadow"
                />
                <div className="text-xs text-gray-500 mt-2">扫码添加微信</div>
              </div>
            </div>
          </div>
          {/* 右侧主内容 */}
          <div className="cv-main w-full md:w-2/3 space-y-lg">
            <ExperienceUnit
              icon={<Book size={18} />}
              title="教育经历"
              experiences={[
                {
                  title: "西南交通大学（博士）2024-至今",
                  content: "车辆工程专业，研究方向为智能车辆与人工智能应用。参与多项科研项目，发表论文若干。"
                },
                {
                  title: "西南交通大学（硕士）2021-2024",
                  content: "车辆工程专业，主攻智能控制与数据分析。"
                },
                {
                  title: "山东理工大学（本科）2016-2020",
                  content: "车辆工程专业，系统学习工程基础与编程技能。"
                }
              ]}
            />
            <ExperienceUnit
              icon={<Briefcase size={18} />}
              title="工作/实习经历"
              experiences={[
                {
                  title: "北京创客空间－实习生（2020.7-2020.9）",
                  content: "参与物联网项目开发，负责前端页面与后端API对接，提升了团队协作与项目实战能力。"
                },
                {
                  title: "成都华控图形－课程内容开发（2021.3-2021.8）",
                  content: "负责Python与Web方向课程内容设计与开发，积累了丰富的在线教育内容制作经验。"
                }
              ]}
            />
            <ExperienceUnit
              icon={<Star size={18} />}
              title="个人项目"
              experiences={[
                {
                  title: "基于 Qt 5 的文本编辑器",
                  content: "自主开发跨平台文本编辑器，支持多标签、语法高亮、自动保存等功能。"
                },
                {
                  title: "基于 Flask 的主机监视系统",
                  content: "实现主机资源监控、报警推送、Web可视化，支持多主机数据采集。"
                },
                {
                  title: "基于 Live2D 与 clmtrackr 的山寨 Facerig",
                  content: "结合人脸追踪与2D动画，实现网页端虚拟形象驱动。"
                },
                {
                  title: "AI论文自动整理工具",
                  content: "基于Python和NLP技术，实现论文批量下载、分类、摘要提取与可视化。"
                }
              ]}
            />
            <ExperienceUnit
              icon={<Award size={18} />}
              title="奖项与证书"
              experiences={[
                {
                  title: "全国大学生数学建模竞赛二等奖",
                  content: "2020年，团队合作完成建模与算法实现，获得省级二等奖。"
                },
                {
                  title: "互联网+ 创新创业大赛校级三等奖",
                  content: "2018年，团队合作完成项目策划与实施，获得校级三等奖。"
                },
                {
                  title: "国家励志奖学金/省政府奖学金",
                  content: "2016-2020年，多次获得国家励志奖学金和省政府奖学金。"
                },
                {
                  title: "英语四、六级（CET-4/6）",
                  content: "通过全国大学英语四级和六级考试，具备良好的英文文献阅读与交流能力。"
                },
                {
                  title: "计算机等级考试二、三级（NCRE2/3）",
                  content: "通过全国计算机等级考试二级和三级考试，具备良好的计算机应用能力。"
                }
              ]}
            />
            <div className="info-unit bg-white p-lg rounded-lg shadow-md">
              <h2 className="info-header flex items-center gap-md mb-3">
                <User size={18} color="#2563eb" />
                <span className="info-title font-bold">自我评价</span>
              </h2>
              <hr className="mb-4" />
              <p className="text-gray-700 leading-relaxed">
                具备扎实的编程基础和工程实践能力，热爱技术创新，善于独立思考与团队协作。熟悉主流Web与AI技术栈，乐于分享与持续学习。希望在智能软件与数据智能领域持续深耕。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 通用信息单元组件（用于左侧边栏的“基本信息”“联系方式”“技术栈”）
interface InfoUnitProps {
  icon: React.ReactNode;
  title: string;
  items: { label: string; value: React.ReactNode }[];
}
const InfoUnit: React.FC<InfoUnitProps> = ({ icon, title, items }) => {
  return (
    <div className="info-unit mb-lg">
      <h2 className="info-header flex items-center gap-md mb-3">
        {icon}
        <span className="info-title font-bold">{title}</span>
      </h2>
      <hr className="mb-4" />
      <ul className="info-list space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col md:flex-row gap-2">
            <label className="left-label font-medium text-gray-700 w-20">
              {item.label}：
            </label>
            <span className="label-value text-gray-600">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 技能进度条组件
interface SkillProgressProps {
  label: string;
  value: number;
}
const SkillProgress: React.FC<SkillProgressProps> = ({ label, value }) => {
  return (
    <li className="flex flex-col gap-2">
      <label className="left-label font-medium text-gray-700">{label}</label>
      <div className="progress-container w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="progress-bar h-full bg-primary transition-all duration-1000"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-right text-sm text-gray-500">{value}%</span>
    </li>
  );
};

// 经历单元组件（用于右侧的“教育经历”“工作经历”“项目”“奖项”）
interface ExperienceUnitProps {
  icon: React.ReactNode;
  title: string;
  experiences: { title: string; content: string }[];
}
const ExperienceUnit: React.FC<ExperienceUnitProps> = ({ icon, title, experiences }) => {
  return (
    <div className="info-unit bg-white p-lg rounded-lg shadow-md">
      <h2 className="info-header flex items-center gap-md mb-3">
        {icon}
        <span className="info-title font-bold">{title}</span>
      </h2>
      <hr className="mb-4" />
      <ul className="experience-list space-y-6">
        {experiences.map((exp, index) => (
          <li key={index}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{exp.title}</h3>
            <p className="text-gray-600 leading-relaxed">{exp.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resume;