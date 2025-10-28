import React from 'react';
import { Card, Row, Col } from 'antd';
import '../../types/css/Projects.css';

const subsystems = [
  {
    title: '实时数据采集子系统',
    description: '负责采集各类传感器和设备的实时数据，支持多种数据源接入。',
    icon: '📡',
  },
  {
    title: '三维场景可视化子系统',
    description: '通过三维建模和渲染技术，实现数据与场景的可视化展示。',
    icon: '🌐',
  },
  {
    title: '数据处理子系统',
    description: '对采集到的数据进行清洗、分析和处理，支持多种算法。',
    icon: '🧮',
  },
  {
    title: '云图设置生成查看子系统',
    description: '支持云图的生成、设置和在线查看，便于数据分析与展示。',
    icon: '☁️',
  },
  {
    title: '类Overleaf编辑器子系统',
    description: '提供类似Overleaf的文档协作编辑功能，支持多人实时编辑。',
    icon: '📝',
  },
];

const Projects: React.FC = () => {
  return (
    <div className="projects-page py-xl">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-xl">项目管理平台</h1>
        <Row gutter={[32, 32]} justify="center">
          {subsystems.map((sys, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={idx}>
              <Card
                hoverable
                className="subsystem-card"
                cover={
                  <div className="subsystem-icon" style={{ fontSize: 48, textAlign: 'center', margin: '24px 0' }}>
                    {sys.icon}
                  </div>
                }
              >
                <Card.Meta
                  title={<span className="subsystem-title">{sys.title}</span>}
                  description={<span className="subsystem-desc">{sys.description}</span>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Projects;