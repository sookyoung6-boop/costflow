# Costflow — 팀 공유 버전

제작 비용과 예상 도착일을 팀이 함께 관리하는 Costflow입니다. **@spextrum.net Google 계정**으로 로그인하면 같은 프로젝트와 품목을 실시간으로 보고 수정할 수 있습니다.

- 로그인: Firebase Authentication (Google, spextrum.net 계정만)
- 데이터 저장: Cloud Firestore (팀 공용, 실시간 반영)
- 배포: GitHub Pages (Control Tower와 같은 방식)
- 주소: https://sookyoung6-boop.github.io/costflow/

## 파일 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 본체 |
| `firebase-config.js` | Firebase 연결 설정값 (costflow-spextrum 프로젝트) |
| `firestore.rules` | 데이터 보안 규칙 (Firebase 콘솔에 붙여넣기) |
| `firebase.json` | Firebase Hosting으로 배포할 때만 사용 |

---

## 1. GitHub 저장소 만들기

1. github.com → 오른쪽 위 **＋ → New repository**
2. Repository name: `costflow` · **Private** 선택 · 나머지는 체크하지 않고 **Create repository**
3. 생성된 화면에서 **uploading an existing file** 클릭
4. ZIP을 푼 폴더 안의 `index.html`, `firebase-config.js`, `firestore.rules`, `firebase.json`, `README.md`, `.gitignore`를 끌어다 놓고 **Commit changes**
   - Mac에서 `.gitignore`가 보이지 않으면 빼고 올려도 됩니다.

## 2. Firebase 프로젝트 만들기

1. [Firebase 콘솔](https://console.firebase.google.com) → **프로젝트 만들기** → 이름 예: `costflow-spextrum` → Google 애널리틱스는 꺼도 됩니다.
2. **Authentication** → 시작하기 → 로그인 방법 → **Google** 사용 설정 → 지원 이메일 선택 → 저장
3. **Firestore Database** → 데이터베이스 만들기
   - 버전: **Standard**
   - 데이터베이스 ID: 기본값 `(default)` 유지 (무료 한도는 기본 데이터베이스 1개에만 적용)
   - 위치: **asia-northeast3 (서울)** — ⚠️ 나중에 바꿀 수 없습니다
   - **프로덕션 모드**로 시작
4. Firestore Database → **규칙** 탭 → 기존 내용을 지우고 `firestore.rules` 내용을 그대로 붙여넣기 → **게시**
5. 왼쪽 위 톱니바퀴 → **프로젝트 설정** → 내 앱 → **웹(</>)** 아이콘 → 앱 닉네임 `costflow-web` → (Firebase Hosting 체크 안 함) → 앱 등록
6. 화면에 나오는 `firebaseConfig = { ... }` 안의 값 6개를 복사해 둡니다.

## 3. 설정값 넣기

1. GitHub 저장소에서 `firebase-config.js` 열기 → 연필 아이콘(Edit)
2. `YOUR_...`로 된 값을 5단계에서 복사한 값으로 바꾸기 → **Commit changes**

> 이 값은 비밀번호가 아닌 공개 식별값입니다. 데이터 보호는 2-4단계의 보안 규칙이 담당합니다.

## 4. GitHub Pages 배포

1. GitHub 저장소 → **Settings → Pages**
2. Source: **Deploy from a branch** · Branch: **main** / **(root)** → Save
3. 1~2분 뒤 https://sookyoung6-boop.github.io/costflow/ 접속

이후 GitHub에 커밋할 때마다 자동으로 다시 배포됩니다.

## 5. 로그인 허용 도메인 추가 (필수)

Firebase 콘솔 → **Authentication → 설정 → 승인된 도메인 → 도메인 추가** → `sookyoung6-boop.github.io`

이 단계를 빠뜨리면 로그인 시 `auth/unauthorized-domain` 오류가 납니다.

## 6. 동작 확인

1. https://sookyoung6-boop.github.io/costflow/ 접속 → **Google 계정으로 로그인** (spextrum.net 계정)
2. 프로젝트명·품목 입력 → 오른쪽 상단 표시가 **팀 공간에 저장됨**으로 바뀌는지 확인
3. 다른 팀원 계정 또는 다른 기기에서 같은 주소로 로그인 → 같은 내용이 보이고, 한쪽에서 수정하면 다른 쪽에 바로 반영되는지 확인
4. 개인 Gmail 계정으로 로그인하면 차단되는지 확인

---

## 기존 데이터 옮기기 (1회)

이전 버전은 데이터를 각 브라우저에만 저장했습니다. 원래 쓰던 Chrome에서 아래 순서로 옮깁니다.

1. 기존 Costflow 화면(원래 열던 파일 또는 이전 Vercel 주소)을 Chrome으로 엽니다.
2. `F12` → **Console** 탭 → 아래 한 줄을 붙여넣고 Enter
   ```
   copy(localStorage.getItem('costflow-v1'))
   ```
   붙여넣기 경고가 나오면 `allow pasting`을 입력하고 Enter 후 다시 붙여넣습니다.
3. 새 Costflow 주소(https://sookyoung6-boop.github.io/costflow/)에서 로그인 → 왼쪽 아래 **백업·가져오기** → 입력칸에 붙여넣기(Ctrl/Cmd+V) → **팀 공간으로 가져오기**

같은 데이터를 두 번 가져와도 ID가 같은 항목은 덮어쓰므로 중복되지 않습니다.

## 운영 메모

- **동시 수정**: 서로 다른 품목은 동시에 수정해도 각각 저장됩니다. 같은 품목을 동시에 고치면 마지막에 저장된 내용이 남습니다.
- **환율**: 자동/수동 환율 설정은 사용자마다 각자 브라우저에 저장됩니다.
- **백업**: 백업·가져오기 → **전체 백업 JSON 내려받기**로 정기 백업을 권장합니다.
- **무료 한도(Spark 요금제)**: Firestore 읽기 하루 50,000건, 쓰기 하루 20,000건. 입력을 멈추고 0.5초 뒤 바뀐 품목만 저장하므로 팀 규모에서는 여유가 있습니다. 사용량은 Firebase 콘솔 → Firestore → 사용량에서 확인합니다.
- **퇴사자 처리**: Firebase 콘솔 → Authentication → 사용자 → 해당 계정 **사용 중지**. (Workspace 계정 정지와 함께 처리 권장)
- **로그아웃**: 공용 PC에서는 로그아웃하면 그 기기에 남은 데이터 사본도 삭제됩니다.
- **로그인이 "앱 차단됨"으로 막히는 경우**: Google Workspace 관리 콘솔에서 서드파티 앱 접근을 제한한 경우일 수 있습니다. 관리 콘솔 → 보안 → API 제어 → 앱 액세스 제어에서 이 Firebase 앱을 신뢰 앱으로 추가합니다.

## (선택) Firebase Hosting으로 배포하기

GitHub Pages 대신 Firebase에서 배포하려면 Node.js 설치 후 터미널에서 실행합니다.

```
npm install -g firebase-tools
firebase login
firebase use --add        # 2단계에서 만든 프로젝트 선택
firebase deploy           # 앱 + 보안 규칙 함께 배포
```

`*.web.app` 주소는 승인된 도메인에 기본 포함되어 있어 5단계가 필요 없습니다.
