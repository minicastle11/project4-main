# 트러블슈팅

프로젝트 진행 중 발생할 수 있는 주요 문제와 해결 방법을 정리한 문서입니다.

---

## 1. OpenAI API Key 노출 문제

### 문제 상황

React 프론트엔드에서 OpenAI API를 직접 호출하기 때문에,
API Key가 브라우저 네트워크 탭에서 노출될 수 있습니다.

또한 실수로 GitHub에 업로드될 위험도 존재합니다.

---

### 현재 구조

```text
React Frontend
→ OpenAI Images API
```

현재 프로젝트는 학습용 프론트엔드 구조이므로
사용자가 직접 API Key를 입력하는 방식을 사용합니다.

---

### 주의사항

- API Key를 코드에 하드코딩하지 않기
- `.env` 파일 또는 GitHub 업로드 금지
- 화면 입력 후 메모리에서만 사용하기
- 사용량 및 과금 상태 확인하기

---

### 실서비스 권장 구조

실서비스에서는 보안을 위해 별도의 백엔드 서버를 두는 방식이 권장됩니다.

```text
React Frontend
→ Backend Server
→ OpenAI API
```

---

## 2. Payload 용량 초과 문제

### 문제 상황

OpenAI가 생성한 이미지를 base64 Data URL 형태로 저장할 경우 문자열 길이가 매우 길어질 수 있습니다.

예시:

```json
{
  "coverImageUrl": "data:image/png;base64,iVBORw0KGgoAAA..."
}
```

고해상도 이미지 생성 시 json-server 저장 과정에서 Payload 초과 오류가 발생할 수 있습니다.

---

### 대표 증상

- 도서 등록 실패
- 도서 수정 실패
- 저장 요청 실패
- `PayloadTooLargeError`
- `request entity too large`

---

### 원인

base64 문자열은 일반 이미지 파일보다 크기가 커질 수 있습니다.

특히:
- 큰 해상도
- 높은 품질
- 긴 이미지 데이터

조합 시 저장 크기가 급격히 증가합니다.

---

### 해결 방법

- 이미지 품질 낮추기
- 이미지 크기 줄이기
- 저장 가능한 최대 크기 제한
- 필요 시 기본 이미지 사용
- 향후 이미지 서버 분리 고려

---

## 3. 이미지 생성 실패 문제

### 원인 후보

- API Key 오류
- OpenAI 사용량 초과
- 네트워크 오류
- fetch 요청 옵션 오류
- OpenAI 서버 응답 실패

---

### 해결 방법

- API Key 다시 입력
- OpenAI 결제 및 사용량 확인
- 브라우저 콘솔 로그 확인
- fetch 요청 body 구조 확인
- 네트워크 상태 확인

---

## 4. json-server 실행 실패

### 대표 증상

- `localhost:3000/books` 접속 실패
- fetch 실패
- `Failed to fetch`

---

### 해결 방법

```bash
npx json-server --watch db.json --port 3000
```

추가 확인:
- 포트 충돌 여부
- db.json 존재 여부
- Node.js 설치 여부

---

## 5. CORS 또는 네트워크 오류

### 대표 증상

- OpenAI 요청 실패
- fetch 에러
- 브라우저 콘솔 오류 발생

---

### 해결 방법

- 인터넷 연결 상태 확인
- 브라우저 새로고침
- API 요청 URL 확인
- Authorization 헤더 확인
- OpenAI 서버 상태 확인
