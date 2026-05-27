# 트러블슈팅

이 문서는 프로젝트 진행 중 발생할 수 있는 주요 문제와 해결 방법을 정리합니다.

---

## 1. OpenAI API Key를 프론트엔드에 직접 올리면 안 되는 문제

### 문제 상황

처음에는 React 프론트엔드에서 API Key를 입력받아 OpenAI API로 직접 요청하는 방식으로 구현할 수 있습니다.
하지만 이 방식은 다음 문제가 있습니다.

- 브라우저 네트워크 탭에서 API Key가 노출될 수 있음
- 프론트엔드 코드에 API Key가 포함될 위험이 있음
- GitHub에 API Key가 올라갈 수 있음
- 보안 및 정책상 적절하지 않음

### 잘못된 구조

```text
React Frontend
→ OpenAI API
```

### 해결 구조

```text
React Frontend
→ api_mid_server.js
→ OpenAI API
```

### 해결 방법

1. 프로젝트 루트에 `.env` 파일 생성
2. `.env`에 OpenAI API Key 저장
3. `api_mid_server.js`에서 `dotenv`로 API Key 로드
4. React는 OpenAI API가 아니라 미들웨어 서버로 요청
5. 미들웨어 서버가 OpenAI API 호출을 대신 수행

`.env` 예시:

```env
OPENAI_API_KEY=sk-본인의_API_KEY
```

실행:

```bash
node api_mid_server.js
```

---

## 2. Payload 10000KB 이상으로 저장이 실패하는 문제

### 문제 상황

현재 시스템은 OpenAI가 생성한 이미지를 base64 Data URL 형태로 `coverImageUrl`에 저장할 수 있습니다.

예시:

```json
{
  "coverImageUrl": "data:image/png;base64,iVBORw0KGgoAAA..."
}
```

이 방식은 정상적으로 동작할 수 있지만, 이미지 품질이 높거나 크기가 커지면 base64 문자열이 매우 길어집니다.
그 결과 `db.json`에 저장할 때 Payload 용량 제한에 걸릴 수 있습니다.

### 대표 증상

- 도서 등록 실패
- 도서 수정 실패
- 이미지 생성 후 저장이 안 됨
- `PayloadTooLargeError`
- `request entity too large`
- 10000KB 이상 Payload 오류

### 원인

base64는 실제 이미지 파일보다 문자열 크기가 커지는 경향이 있습니다.
따라서 고품질 이미지 또는 큰 이미지 크기를 선택하면 `coverImageUrl` 필드 하나만으로도 매우 큰 데이터가 됩니다.

### 해결 방법

- 이미지 품질을 낮게 설정
- 이미지 크기를 낮게 설정
- 너무 큰 base64 이미지는 저장하지 않도록 제한
- 생성 전 비용 및 용량 안내 제공
- 향후 개선안으로 이미지 파일은 서버에 저장하고, `db.json`에는 URL만 저장하는 방식 검토

---

## 3. 이미지 생성이 실패하는 문제

### 원인 후보

- `api_mid_server.js`가 실행되지 않음
- `.env` 파일이 없음
- `OPENAI_API_KEY`가 잘못됨
- OpenAI 사용량 초과
- 네트워크 오류
- 요청 옵션 오류

### 해결 방법

- `node api_mid_server.js` 실행 확인
- `.env` 파일 위치 확인
- API Key 확인
- OpenAI 계정 사용량 확인
- 브라우저 콘솔과 Node 서버 로그 확인

---
