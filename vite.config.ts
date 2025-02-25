import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ 기본 경로를 루트로 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,       // 개발 서버 포트
    open: true        // 브라우저 자동 열기
  },
  build: {
    outDir: 'dist',   // 번들 파일 출력 디렉토리
    sourcemap: true,  // 디버깅을 위한 소스맵 생성
  },
  define: {
    'process.env': {} // dotenv를 대체 (Vite는 기본적으로 .env 사용 가능)
  }
});