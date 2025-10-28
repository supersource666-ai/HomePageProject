import React from 'react';
import { Card, Row, Col } from 'antd';
import '../../types/css/Projects.css';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const subsystems = [
  {
    title: '数据采集测点展示子系统',
    description: '对采集到的测点数据进行可视化展示，支持多种图表和实时监控。',
    icon: '/icons/data-visualization.svg',
    link: 'DataVisualization',
  },
  {
    title: '实时数据采集子系统',
    description: '负责采集各类传感器和设备的实时数据，支持多种数据源接入。',
    icon: '/icons/realtime-data.svg',
    link: 'RealtimeData',
  },
  {
    title: '三维场景可视化子系统',
    description: '通过三维建模和渲染技术，实现数据与场景的可视化展示。',
    icon: '/icons/scene-visualization.svg',
    link: 'SceneVisualization',
  },
  {
    title: '数据处理子系统',
    description: '对采集到的数据进行清洗、分析和处理，支持多种算法。',
    icon: '/icons/data-processing.svg',
    link: 'DataProcessing',
  },
  {
    title: '云图设置生成查看子系统',
    description: '支持云图的生成、设置和在线查看，便于数据分析与展示。',
    icon: '/icons/cloud-explore.svg',
    link: 'CloudExplore',
  },
  {
    title: '类Overleaf编辑器子系统',
    description: '文档协作编辑功能，支持多人实时编辑。',
    icon: '/icons/editor.svg',
    link: 'Editor',
  },
];



const Projects: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 判断当前是否在 /projects 根路径
  const isProjectsRoot = location.pathname === '/projects' || location.pathname === '/projects/';
  return (
    <div className="projects-page py-xl">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-xl">项目管理平台</h1>
        {isProjectsRoot ? (
          <Row gutter={[32, 32]} justify="center">
            {subsystems.map((sys, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Card
                  hoverable
                  className="subsystem-card"
                  cover={
                    <div className="subsystem-icon" style={{ textAlign: 'center', margin: '24px 0' }}>
                      <img src={sys.icon} alt={sys.title + ' icon'} style={{ width: 48, height: 48 }} />
                    </div>
                  }
                  onClick={() => navigate(`/projects/${sys.link}`)}
                >
                  <Card.Meta
                    title={<span className="subsystem-title">{sys.title}</span>}
                    description={<span className="subsystem-desc">{sys.description}</span>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Projects;