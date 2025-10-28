import React, { useState } from "react";
import { Card, Input, Button, message, Spin } from "antd";
import axios from "axios";

const { TextArea } = Input;

const DataProcessing: React.FC = () => {
  const [script, setScript] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const runScript = async () => {
    if (!script.trim()) {
      message.warning("请先输入脚本内容");
      return;
    }

    setLoading(true);
    setOutput("");
    try {
      // 替换为 Colab Notebook 生成的 ngrok URL
      const colabURL = "https://unabashed-ladyish-gunner.ngrok-free.dev/run-script";
      const response = await axios.post(colabURL, { code: script });
      setOutput(response.data.output);
    } catch (error: any) {
      console.error(error);
      message.error("运行脚本失败");
      setOutput(error.message || "未知错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        数据处理子系统
      </h2>

      <Card title="脚本编辑区" style={{ marginBottom: 16 }}>
        <TextArea
          rows={10}
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="在此输入 Python 脚本..."
        />
        <div style={{ marginTop: 12 }}>
          <Button type="primary" onClick={runScript} loading={loading}>
            运行脚本
          </Button>
        </div>
      </Card>

      <Card title="运行结果">
        {loading ? <Spin tip="运行中..." /> : <pre>{output}</pre>}
      </Card>
    </div>
  );
};

export default DataProcessing;
