// 解决 <primitive /> <ambientLight /> <directionalLight /> 类型报错
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';


// 加载GLB模型的组件
const GLBModel: React.FC = () => {
  const { scene } = useGLTF('/models/train400.glb', true);

  // 处理模型阴影和材质
  useEffect(() => {
    if (scene) {
      scene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} scale={0.1251} position={[0, -0.5, 0]} />;
};

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// 加载指示器
const LoadingIndicator: React.FC = () => (
  <Html center>
    <div style={{ color: 'white', textAlign: 'center' }}>
      <div style={{
        width: '20px',
        height: '20px',
        margin: '0 auto',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <p style={{ marginTop: '8px', margin: 0 }}>加载中...</p>
    </div>
  </Html>
);

// 错误提示
const ErrorIndicator: React.FC = () => (
  <Html center>
    <div style={{ background: 'rgba(255,255,255,0.9)', padding: '16px', borderRadius: '8px' }}>
      <p style={{ color: '#e53935', margin: '0 0 8px 0' }}>模型加载失败</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '4px 8px',
          border: 'none',
          background: '#2196f3',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        重试
      </button>
    </div>
  </Html>
);

const ThreeModel: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div style={{
      width: 320,
      height: 320,
      margin: '0 auto',
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: '0 4px 32px rgba(68,67,99,0.18)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        shadows
        onCreated={() => setIsReady(true)}
        style={{
          width: '100%',
          height: '100%',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s'
        }}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.7} />
        {/* 方向光 */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* 新增：点光源 */}
        <pointLight
          position={[0, 3, 2]}
          intensity={0.8}
          color="#fffbe6"
          distance={10}
          decay={2}
        />
        {/* 新增：聚光灯 */}
        <spotLight
          position={[-3, 5, 3]}
          angle={0.4}
          penumbra={0.5}
          intensity={0.7}
          castShadow
          color="#b4d8ff"
          distance={15}
        />

        <Suspense fallback={<LoadingIndicator />}>
          <ErrorBoundary fallback={<ErrorIndicator />}>
            <GLBModel />
          </ErrorBoundary>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2.2}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default ThreeModel;