import { Auth, connectAuthEmulator } from 'firebase/auth';

/**
 * 환경 변수 기반으로 Auth Emulator 연결 설정
 *
 * 환경 구분:
 * - local: VITE_USE_EMULATOR=true (emulator 사용)
 * - dev: VITE_USE_EMULATOR=false (실제 Firebase 사용)
 *
 * @param auth - Firebase Auth 인스턴스
 */
export function setupAuthEmulator(auth: Auth): void {
  const useEmulator = import.meta.env.VITE_USE_EMULATOR === 'true';

  if (useEmulator) {
    const host = import.meta.env.VITE_EMULATOR_HOST || '127.0.0.1';
    const port = import.meta.env.VITE_EMULATOR_PORT || '9099';
    const emulatorURL = `http://${host}:${port}`;

    console.log(`🔧 Firebase Auth Emulator 연결: ${emulatorURL}`);
    connectAuthEmulator(auth, emulatorURL);
  } else {
    console.log('🌐 실제 Firebase Auth 사용');
  }
}

/**
 * 현재 emulator 사용 여부 확인
 * @returns emulator 사용 중이면 true
 */
export function isUsingEmulator(): boolean {
  return import.meta.env.VITE_USE_EMULATOR === 'true';
}
