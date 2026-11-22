// Firebase 콘솔 → 프로젝트 설정 → 내 앱(웹)의 "SDK 설정 및 구성"에서 firebaseConfig 값을 복사해 아래를 바꿔 주세요.
// 이 값은 비밀번호가 아니라 앱 식별용 공개 값입니다. 데이터 보호는 firestore.rules(로그인 + spextrum.net 계정 제한)가 담당합니다.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
