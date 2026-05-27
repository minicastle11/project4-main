# 실행 방법 가이드

이 프로젝트는 정상 동작을 위해 React 개발 서버, json-server, OpenAI 미들웨어 서버를 각각 실행해야 합니다.

---

## 1. 사전 준비

- Node.js 설치
- npm 사용 가능 상태
- OpenAI API Key 준비

---

## 2. 패키지 설치

```bash
npm install
```

---

## 3. `.env` 파일 설정

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
OPENAI_API_KEY=sk-본인의_API_KEY
```

주의:

- `.env`는 GitHub에 올리면 안 됩니다.
- `.env`는 `api_mid_server.js`에서 사용합니다.
- React 컴포넌트 코드에 API Key를 직접 작성하지 않습니다.

---

## 4. json-server 실행

도서 데이터 CRUD를 담당합니다.

```bash
npx json-server --watch db.json --port 3000
```

확인 주소:

```text
http://localhost:3000/books
```

---

## 5. OpenAI 미들웨어 서버 실행

OpenAI API 호출을 대행하는 서버입니다.

```bash
node api_mid_server.js
```

실행 주소:

```text
http://localhost:3001
```

이 서버는 `.env`의 `OPENAI_API_KEY`를 읽어 OpenAI API 요청을 처리합니다.

---

## 6. React 개발 서버 실행

```bash
npm run dev
```

접속 주소:

```text
http://localhost:5173
```

---

## 7. 실행 순서 권장

터미널을 3개 열고 다음 순서로 실행합니다.

### 터미널 1

```bash
npx json-server --watch db.json --port 3000
```

### 터미널 2

```bash
node api_mid_server.js
```

### 터미널 3

```bash
npm run dev
```

---

## 8. 실행 확인 체크리스트

- [ ] `npm install` 완료
- [ ] `.env` 파일 생성 완료
- [ ] `OPENAI_API_KEY` 입력 완료
- [ ] json-server 실행 완료
- [ ] `http://localhost:3000/books` 접속 가능
- [ ] `api_mid_server.js` 실행 완료
- [ ] React 개발 서버 실행 완료
- [ ] `http://localhost:5173` 접속 가능

---

## 9. 자주 발생하는 실행 오류

### 9.1 `http://localhost:3000/books` 접속 실패

json-server가 실행되지 않았거나 포트가 다를 수 있습니다.

### 9.2 이미지 생성 실패

다음을 확인합니다.

- `api_mid_server.js`가 실행 중인지 확인
- `.env`에 `OPENAI_API_KEY`가 있는지 확인
- API Key가 올바른지 확인
- OpenAI 사용량 또는 결제 상태 확인

### 9.3 도서 저장 실패

base64 이미지가 너무 큰 경우 Payload 용량 초과가 발생할 수 있습니다.
이미지 품질 또는 크기를 낮춰 다시 생성합니다.
