# 실행 방법 가이드

## 1. 사전 준비

- Node.js 설치
- npm 사용 가능 환경
- OpenAI API Key 준비

---

## 2. 패키지 설치

```bash
npm install
```

---

## 3. json-server 실행

도서 데이터 CRUD를 담당하는 로컬 REST API 서버입니다.

```bash
npx json-server --watch db.json --port 3000
```

실행 확인:

```text
http://localhost:3000/books
```

---

## 4. React 개발 서버 실행

```bash
npm run dev
```

실행 확인:

```text
http://localhost:5173
```

---

## 5. OpenAI API Key 입력

현재 프로젝트는 학습용 프론트엔드 구조로,
브라우저 화면의 API Key 입력창에 직접 Key를 입력하여 사용합니다.

예시:

```text
sk-xxxxxxxxxxxxxxxx
```

주의사항:

- API Key를 GitHub에 업로드하지 않습니다.
- 실서비스에서는 백엔드 또는 프록시 서버 사용이 권장됩니다.
- 사용량 및 과금 상태를 반드시 확인합니다.

---

## 6. 권장 실행 순서

터미널을 2개 열고 아래 순서대로 실행합니다.

### 터미널 1

```bash
npx json-server --watch db.json --port 3000
```

### 터미널 2

```bash
npm run dev
```

---

## 7. 실행 확인 체크리스트

- [ ] `npm install` 완료
- [ ] json-server 실행 완료
- [ ] `http://localhost:3000/books` 접속 가능
- [ ] React 개발 서버 실행 완료
- [ ] `http://localhost:5173` 접속 가능
- [ ] OpenAI API Key 입력 완료

---

## 8. 자주 발생하는 실행 오류

### 8.1 `http://localhost:3000/books` 접속 실패

원인:
- json-server 미실행
- 포트 충돌
- db.json 경로 문제

해결:
```bash
npx json-server --watch db.json --port 3000
```

---

### 8.2 이미지 생성 실패

확인 항목:

- API Key 입력 여부
- API Key 오타 여부
- OpenAI 결제 및 사용량 상태
- 네트워크 연결 상태
- 브라우저 콘솔 오류 확인

---

### 8.3 도서 저장 실패

base64 이미지 크기가 너무 큰 경우 Payload 초과 문제가 발생할 수 있습니다.

해결 방법:

- 이미지 품질 낮추기
- 이미지 크기 줄이기
- 생성 이미지를 다시 요청하기

---

## 9. 프로젝트 실행 구조

```text
React App
├─ fetch → json-server
│          └─ db.json
│
└─ fetch → OpenAI Images API
```

현재 프로젝트는 별도의 백엔드 서버 없이 프론트엔드 중심 구조로 동작합니다.
