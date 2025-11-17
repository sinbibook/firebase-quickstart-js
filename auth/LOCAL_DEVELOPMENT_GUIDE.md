# Firebase Auth 로컬 개발 환경 설정 가이드

Firebase Authentication 샘플 앱을 로컬 환경에서 개발하고 테스트하는 방법을 안내합니다.

## 📋 목차

1. [개요](#개요)
2. [초기 설정](#초기-설정)
3. [환경 구분 (Local/Dev)](#환경-구분-localdev)
4. [로컬 개발 서버 실행](#로컬-개발-서버-실행)
5. [Signup 테스트 방법](#signup-테스트-방법)
6. [Emulator UI 사용법](#emulator-ui-사용법)
7. [트러블슈팅](#트러블슈팅)
8. [참고 사항](#참고-사항)

---

## 개요

이 샘플 앱은 **Firebase Auth Emulator**를 사용하여 로컬 환경에서 인증 기능을 테스트할 수 있습니다. 프로덕션 Firebase 프로젝트에 영향을 주지 않고 안전하게 개발할 수 있습니다.

### 주요 특징
- ✅ 로컬 환경에서 완전한 인증 기능 테스트
- ✅ 프로덕션 데이터와 분리된 안전한 개발 환경
- ✅ Emulator UI를 통한 시각적 데이터 관리
- ✅ 빠른 개발 사이클 (서버 재시작 불필요)

---

## 초기 설정

### 1. Firebase 프로젝트 설정

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Firebase config 객체 복사 ("Add Firebase to your web app" 다이얼로그)
3. `auth/config.ts` 파일에 config 붙여넣기

```typescript
// auth/config.ts
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX",
};
```

### 2. 환경 요구사항 확인

```bash
# Node.js 버전 확인 (권장: 18-20)
node --version

# npm 버전 확인 (권장: 9.x)
npm --version

# Firebase CLI 설치 확인
firebase --version
```

### 3. 의존성 설치

```bash
cd auth
npm install
```

### 4. Firebase 프로젝트 연결

```bash
# Firebase 로그인
firebase login

# 프로젝트 선택 (이미 .firebaserc에 설정되어 있다면 스킵)
firebase use --add
```

---

## 환경 구분 (Local/Dev)

이 프로젝트는 **환경 변수**를 사용하여 Local(Emulator)과 Dev(실제 Firebase)를 구분합니다.

### 환경 설정 파일

**`.env.local`** - Local 환경 (Emulator 사용)
```bash
VITE_USE_EMULATOR=true
VITE_EMULATOR_HOST=127.0.0.1
VITE_EMULATOR_PORT=9099
```

**`.env.development`** - Dev 환경 (실제 Firebase 사용)
```bash
VITE_USE_EMULATOR=false
```

### 환경 전환 방법

**Local 환경 (Emulator)**:
- `.env.local` 파일이 존재하면 자동으로 Emulator 사용
- 개발/테스트 시 권장

**Dev 환경 (실제 Firebase)**:
- `.env.local` 파일 삭제 또는 이름 변경
- `.env.development` 설정 적용
- 통합 테스트 시 사용

---

## 로컬 개발 서버 실행

### Local 환경 (Emulator 사용)

#### 방법 1: 터미널 2개 사용 (권장)

#### 터미널 1: Firebase Auth Emulator 실행
```bash
cd auth
firebase emulators:start --only auth
```

**실행 결과**:
```
┌────────────────┬────────────────┬────────────────────────────┐
│ Emulator       │ Host:Port      │ View in Emulator UI        │
├────────────────┼────────────────┼────────────────────────────┤
│ Authentication │ 127.0.0.1:9099 │ http://127.0.0.1:4000/auth │
└────────────────┴────────────────┴────────────────────────────┘
```

#### 터미널 2: Vite 개발 서버 실행
```bash
cd auth
npm run dev
```

**실행 결과**:
```
VITE v4.4.11  ready in 110 ms

➜  Local:   http://localhost:5173/
```

#### 방법 2: 백그라운드 실행

```bash
cd auth

# Auth Emulator 백그라운드 실행
firebase emulators:start --only auth &

# 개발 서버 실행
npm run dev
```

#### npm 스크립트 사용

```bash
# Local 환경 (Emulator 사용)
npm run dev
# 또는 명시적으로
npm run dev:local

# 콘솔 출력 확인:
# 🔧 Firebase Auth Emulator 연결: http://127.0.0.1:9099
```

---

### Dev 환경 (실제 Firebase 사용)

#### 사전 준비

1. **Firebase Console에서 Authentication 활성화**
   - [Firebase Console](https://console.firebase.google.com) → 프로젝트 선택
   - **Authentication** → **Sign-in method** 탭
   - **Email/Password** 활성화

2. **환경 설정**
   ```bash
   # .env.local 파일 삭제 또는 이름 변경
   mv .env.local .env.local.backup
   ```

#### 개발 서버 실행

```bash
cd auth

# Dev 환경으로 실행
npm run dev
# 또는
npm run dev:production

# 콘솔 출력 확인:
# 🌐 실제 Firebase Auth 사용
```

**주의**: Dev 환경에서는 실제 Firebase 프로젝트에 데이터가 저장되고 이메일이 발송됩니다.

---

## Signup 테스트 방법

### 1. Email/Password 인증 페이지 접속

브라우저에서 다음 URL로 접속:
```
http://localhost:5173/email-password.html
```
또는 포트가 다른 경우:
```
http://localhost:5174/email-password.html
```

### 2. Signup 진행

1. **이메일 입력**: 테스트용 이메일 주소 입력 (예: `test@example.com`)
2. **비밀번호 입력**: 비밀번호 입력 (최소 6자)
3. **SIGN UP 버튼 클릭**

### 3. 성공 확인

성공 시 페이지에 다음과 같은 정보가 표시됩니다:
- **Firebase sign-in status**: `Signed in`
- **Firebase auth currentUser object value**: 사용자 정보 (JSON 형식)

```json
{
  "uid": "abc123...",
  "email": "test@example.com",
  "emailVerified": false,
  ...
}
```

### 4. 추가 테스트

- **Sign Out**: "SIGN OUT" 버튼 클릭하여 로그아웃 테스트
- **Sign In**: 기존 계정으로 다시 로그인 테스트
- **Email Verification**: "SEND EMAIL VERIFICATION" 버튼 테스트 (Emulator에서는 실제 이메일 발송 안 됨)
- **Password Reset**: "SEND PASSWORD RESET EMAIL" 버튼 테스트

---

## Emulator UI 사용법

### Emulator UI 접속

브라우저에서 다음 URL로 접속:
```
http://127.0.0.1:4000/
```

### Authentication 탭에서 확인 가능한 정보

1. **사용자 목록**: 생성된 모든 테스트 사용자
2. **사용자 상세 정보**:
   - UID (User ID)
   - Email
   - Created at
   - Last sign-in time
   - Email verified 상태

3. **사용자 관리 기능**:
   - 사용자 추가
   - 사용자 삭제
   - 사용자 정보 수정

### Emulator 데이터 초기화

Emulator를 재시작하면 모든 데이터가 초기화됩니다:
```bash
# Ctrl+C로 emulator 중지 후 재시작
firebase emulators:start --only auth
```

---

## 트러블슈팅

### ❌ `auth/network-request-failed` 오류

**원인**: Auth Emulator가 실행되지 않음

**해결**:
1. Auth Emulator가 실행 중인지 확인:
   ```bash
   # 포트 9099가 사용 중인지 확인
   lsof -i :9099
   ```

2. Emulator 재시작:
   ```bash
   firebase emulators:start --only auth
   ```

### ❌ `Port 5173 is in use` 경고

**원인**: 포트 5173이 이미 사용 중

**해결**: Vite가 자동으로 다른 포트를 선택합니다 (예: 5174)
- 출력된 포트 번호 확인하여 해당 URL로 접속

### ❌ `Could not start Hosting Emulator, port taken`

**원인**: Hosting Emulator 포트 충돌

**해결**: Auth Emulator만 실행
```bash
firebase emulators:start --only auth
```

### ❌ Firebase CLI 명령어 인식 안 됨

**원인**: Firebase CLI 미설치

**해결**:
```bash
npm install -g firebase-tools
firebase login
```

---

## 참고 사항

### 코드 동작 원리

`email-password.ts` 파일의 18-20번 줄:
```typescript
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}
```

- **localhost에서 실행 시**: 자동으로 Auth Emulator (포트 9099)에 연결
- **프로덕션 배포 시**: 실제 Firebase Auth 서버에 연결

### Emulator vs 프로덕션

| 항목 | Emulator | 프로덕션 |
|------|----------|---------|
| 데이터 저장 | 메모리 (재시작 시 삭제) | Firebase 서버 (영구) |
| 이메일 발송 | 미지원 (로그만) | 실제 발송 |
| 비용 | 무료 | Firebase 플랜에 따름 |
| 네트워크 | 로컬 (빠름) | 인터넷 (지연 있음) |

### 다른 인증 방법 테스트

같은 방법으로 다른 인증 페이지도 테스트 가능:
- **Google 인증**: `google-popup.html`, `google-redirect.html`
- **Anonymous 인증**: `anon.html`
- **Custom 인증**: `customauth.html`
- **Multi-factor 인증**: `mfa-password.html`

**주의**: Phone 인증은 ReCaptcha 문제로 Emulator에서 동작하지 않습니다.

### 프로덕션 배포

로컬 테스트 완료 후 프로덕션 배포:
```bash
npm run build
firebase deploy
```

---

## 📚 추가 리소스

- [Firebase Auth 공식 문서](https://firebase.google.com/docs/auth)
- [Firebase Emulator Suite 가이드](https://firebase.google.com/docs/emulator-suite)
- [Firebase Auth Emulator 문서](https://firebase.google.com/docs/emulator-suite/connect_auth)

---

**작성일**: 2025-11-17
**최종 수정**: 2025-11-17