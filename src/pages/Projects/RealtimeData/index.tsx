// src/pages/Projects/RealtimeData/index.tsx

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Switch, Button, Table, Space, message } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MobileOutlined,
  ApiOutlined,
  FireOutlined,
  DashboardOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

const COLORS = ["#52c41a", "#1890ff", "#f5222d"];

interface Device {
  id: string;
  temp: string;
  load: number;
  status: string;
  updatedAt: string;
}

interface CpuData {
  time: string;
  value: number;
}

const RealtimeData: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const [lineData, setLineData] = useState<CpuData[]>([]);
  const [pieData, setPieData] = useState([
    { name: "运行", value: 0 },
    { name: "空闲", value: 0 },
    { name: "离线", value: 0 },
  ]);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    let socket: WebSocket;

    if (receiving && connected) {
      socket = new WebSocket("ws://localhost:4000"); // 连接后端 WebSocket

      socket.onopen = () => console.log("✅ WebSocket connected");

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "cpu") {
          const value = parseFloat(msg.data.cpuUsage);
          setLineData((prev) => [
            ...prev.slice(-19),
            { time: new Date().toLocaleTimeString(), value },
          ]);
        } else if (msg.type === "devices") {
          setDevices(msg.data);
          const running = msg.data.filter((d: Device) => d.status === "运行中").length;
          const offline = msg.data.filter((d: Device) => d.status !== "运行中").length;
          const idle = msg.data.length - running - offline;
          setPieData([
            { name: "运行", value: running },
            { name: "空闲", value: idle },
            { name: "离线", value: offline },
          ]);
        }
      };

      socket.onclose = () => console.log("❌ WebSocket disconnected");
    }

    return () => {
      if (socket) socket.close();
    };
  }, [receiving, connected]);

  const handleConnectPhone = () => {
    setConnected(true);
    message.success("✅ 手机已连接成功");
  };

  const handleToggleReceive = (checked: boolean) => {
    if (!connected) {
      message.warning("⚠️ 请先连接手机");
      return;
    }
    setReceiving(checked);
    message.info(checked ? "📡 开始接收传感器数据" : "⏹ 已停止接收数据");
  };

  const columns = [
    { title: "设备ID", dataIndex: "id" },
    { title: "温度(°C)", dataIndex: "temp" },
    { title: "负载(%)", dataIndex: "load" },
    {
      title: "状态",
      dataIndex: "status",
      render: (text: string) => (
        <span style={{ color: text === "运行中" ? "#52c41a" : "#f5222d" }}>{text}</span>
      ),
    },
    { title: "更新时间", dataIndex: "updatedAt" },
  ];

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: 32, color: "white" }}>
      {/* 顶部标题栏 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>实时数据采集子系统</h1>
          <p style={{ color: "#94a3b8" }}>数据展示大屏 · 实时监测运行状态</p>
        </div>

        <Space>
          <Button
            type="primary"
            icon={<MobileOutlined />}
            onClick={handleConnectPhone}
            disabled={connected}
          >
            {connected ? "已连接手机" : "连接手机"}
          </Button>
          <Switch
            checkedChildren={<PlayCircleOutlined />}
            unCheckedChildren={<StopOutlined />}
            checked={receiving}
            onChange={handleToggleReceive}
          />
        </Space>
      </div>

      {/* 数据卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card bordered={false} style={{ background: "#1e293b" }}>
            <Space>
              <ApiOutlined style={{ fontSize: 32, color: "#52c41a" }} />
              <div>
                <div style={{ color: "#94a3b8" }}>设备在线数</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{devices.length}</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ background: "#1e293b" }}>
            <Space>
              <DashboardOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <div>
                <div style={{ color: "#94a3b8" }}>CPU 平均负载</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>
                  {lineData.length ? lineData[lineData.length - 1].value.toFixed(2) + "%" : "0%"}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ background: "#1e293b" }}>
            <Space>
              <FireOutlined style={{ fontSize: 32, color: "#faad14" }} />
              <div>
                <div style={{ color: "#94a3b8" }}>平均温度</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>
                  {devices.length
                    ? (
                        devices.reduce((sum, d) => sum + parseFloat(d.temp), 0) / devices.length
                      ).toFixed(1) + "°C"
                    : "0°C"}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ background: "#1e293b" }}>
            <Space>
              <DashboardOutlined style={{ fontSize: 32, color: "#13c2c2" }} />
              <div>
                <div style={{ color: "#94a3b8" }}>系统健康度</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>91%</div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 图表 */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title="实时曲线图" bordered={false} style={{ background: "#1e293b" }}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="设备状态分布" bordered={false} style={{ background: "#1e293b" }}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    label
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 表格 */}
      <Card
        title="设备实时状态表"
        bordered={false}
        style={{ background: "#1e293b", marginTop: 24 }}
      >
        <Table columns={columns} dataSource={devices} pagination={false} />
      </Card>
    </div>
  );
};

export default RealtimeData;
