import React, { useEffect, useRef, useState } from "react";

/**
 * SceneVisualization_WebRTC_React.tsx
 * A single-file React component that connects to a remote Unity/Unreal renderer via WebRTC
 * - uses a WebSocket signaling server (placeholder URL) to exchange SDP & ICE
 * - attaches remote video track to a <video> element
 * - opens a data channel to send control messages (camera, input, etc.) back to the renderer
 *
 * NOTE:
 *  - Replace SIGNALING_SERVER_URL with your signaling server (wss:// for production).
 *  - Unity: you can use Unity Render Streaming or the Unity WebRTC package.
 *  - Unreal: Pixel Streaming uses WebRTC and provides example signaling infrastructure.
 */

const SIGNALING_SERVER_URL = "ws://localhost:8765"; // <-- change to your signaling server (wss://... in prod)
const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  // Add TURN servers here if you expect NAT/firewall traversal issues
];

const SceneVisualization: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const [connected, setConnected] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  function logAppend(msg: string) {
    setLog((l) => [...l.slice(-50), `${new Date().toLocaleTimeString()}: ${msg}`]);
  }

  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connect() {
    logAppend("Connecting to signaling server...");
    wsRef.current = new WebSocket(SIGNALING_SERVER_URL);

    wsRef.current.onopen = async () => {
      logAppend("Signaling connected. Creating RTCPeerConnection...");
      await initPeerConnection();

      // notify remote that we want to view its stream; protocol may vary — this is an example
      sendSignal({ type: "viewer-ready" });
    };

    wsRef.current.onmessage = async (evt) => {
      const data = JSON.parse(evt.data);
      if (!data) return;
      switch (data.type) {
        case "offer":
          logAppend("Received offer from remote");
          if (!pcRef.current) await initPeerConnection();
          await pcRef.current!.setRemoteDescription(new RTCSessionDescription(data.sdp));
          const answer = await pcRef.current!.createAnswer();
          await pcRef.current!.setLocalDescription(answer);
          sendSignal({ type: "answer", sdp: pcRef.current!.localDescription });
          setConnected(true);
          break;
        case "answer":
          logAppend("Received answer (unexpected for viewer)");
          break;
        case "candidate":
          if (data.candidate) {
            try {
              await pcRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
              logAppend("Added remote ICE candidate");
            } catch (e) {
              console.error(e);
              logAppend("Failed to add ICE candidate: " + (e as any).toString());
            }
          }
          break;
        case "hangup":
          logAppend("Remote requested hangup");
          disconnect();
          break;
        default:
          logAppend("Unknown signaling message: " + JSON.stringify(data));
      }
    };

    wsRef.current.onclose = () => {
      logAppend("Signaling socket closed");
      setConnected(false);
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error", err);
      logAppend("Signaling socket error");
    };
  }

  function sendSignal(msg: any) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      logAppend("Signaling socket not open — cannot send message");
    }
  }

  async function initPeerConnection() {
    if (pcRef.current) return;
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    pcRef.current = pc;

    // when remote tracks arrive, attach them to the video element
    pc.ontrack = (event) => {
      logAppend("ontrack: got remote track");
      if (videoRef.current) {
        // Some renderers send multiple tracks; we set the first stream as sourceObject
        if (event.streams && event.streams[0]) videoRef.current.srcObject = event.streams[0];
        else {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(event.track);
          videoRef.current.srcObject = mediaStream;
        }
        videoRef.current.play().catch(() => {});
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendSignal({ type: "candidate", candidate: e.candidate });
      }
    };

    pc.onconnectionstatechange = () => {
      logAppend("PeerConnection state: " + pc.connectionState);
      if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
        setConnected(false);
      }
    };

    // Create a data channel for sending control inputs back to Unity/Unreal
    const dc = pc.createDataChannel("control");
    dcRef.current = dc;
    dc.onopen = () => logAppend("Control data channel open");
    dc.onmessage = (m) => logAppend("Control channel msg: " + m.data);

    // NOTE: as a viewer we usually don't add local tracks (we just receive video/audio)

    // In some integrations the renderer will send an "offer" after we indicate readiness.
    // If you want the browser side to create an offer (rare for viewers), you can do so here.

    return pc;
  }

  async function disconnect() {
    logAppend("Disconnecting...");
    try {
      pcRef.current?.close();
    } catch (e) {}
    pcRef.current = null;
    try {
      wsRef.current?.close();
    } catch (e) {}
    wsRef.current = null;
    dcRef.current = null;
    setConnected(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  function sendControl(message: any) {
    if (dcRef.current && dcRef.current.readyState === "open") {
      dcRef.current.send(JSON.stringify(message));
      logAppend("Sent control: " + JSON.stringify(message));
    } else {
      logAppend("Control channel not open");
    }
  }

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>三维场景可视化子系统</h2>
      <p>通过 WebRTC 接收来自远程 Unity / Unreal 的三维渲染视频流，并可发送控制信令。</p>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ borderRadius: 8, overflow: "hidden", background: "#000" }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              controls
              style={{ width: "100%", height: 480, objectFit: "contain", background: "#000" }}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button onClick={connect} disabled={connected} style={{ padding: "8px 12px" }}>
              Connect
            </button>
            <button onClick={disconnect} disabled={!connected} style={{ padding: "8px 12px" }}>
              Disconnect
            </button>
            <button
              onClick={() => sendControl({ type: "camera", action: "reset" })}
              style={{ padding: "8px 12px" }}
            >
              Reset Camera
            </button>
          </div>
        </div>

        <div style={{ width: 380 }}>
          <div style={{ background: "#f7f7f7", padding: 12, borderRadius: 8, height: 480, overflowY: "auto" }}>
            <h3 style={{ marginTop: 0 }}>调试日志</h3>
            <div style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>{log.join("\n")}</div>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 12, color: "#666" }}>
        注：此示例依赖一个简单的信令服务器（WebSocket）。渲染端（Unity/Unreal）需要实现匹配的信令协议以交换 offer/answer 与 ICE
        candidate，或使用它们各自的官方解决方案（Unity Render Streaming / Unreal Pixel Streaming）。
      </p>
    </div>
  );
};

export default SceneVisualization;
