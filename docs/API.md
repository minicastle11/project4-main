# API 문서

## 1. 서버 구성

현재 코드 기준으로 필수 실행 대상은 **React 개발 서버**와 **json-server**입니다.

| 구분 | 주소 | 역할 | 필수 여부 |
|---|---|---|---|
| React 개발 서버 | `http://localhost:5173` | 화면 렌더링 및 사용자 입력 처리 | 필수 |
| json-server | `http://localhost:3000` | 도서 CRUD용 Mock REST API | 필수 |
| OpenAI Images API | `https://api.openai.com/v1/images/generations` | AI 표지 이미지 생성 | 이미지 생성 시 필요 |

> 현재 구현은 프론트엔드 화면에서 사용자가 입력한 API Key를 사용해 OpenAI Images API를 직접 호출합니다. 별도의 `api_mid_server.js` 미들웨어 서버 실행은 필수 구조가 아닙니다.

---

## 2. json-server API

### Base URL

```text
http://localhost:3000
```

### Resource

```text
/books
```

### API 목록

| 기능 | Method | Endpoint | 설명 |
|---|---|---|---|
| 도서 목록 조회 | GET | `/books` | 전체 도서 목록 조회 |
| 도서 상세 조회 | GET | `/books/:id` | 특정 도서 상세 조회 |
| 도서 등록 | POST | `/books` | 신규 도서 등록 |
| 도서 수정 | PATCH | `/books/:id` | 특정 도서 정보 수정 |
| 도서 삭제 | DELETE | `/books/:id` | 특정 도서 삭제 |
| 좋아요 수정 | PATCH | `/books/:id` | likes 값 증가 |
| 조회수 수정 | PATCH | `/books/:id` | views 값 증가 |

---

## 3. 도서 데이터 구조

```json
{
  "id": 1,
  "title": "도서 제목",
  "author": "작가 이름",
  "content": "도서 내용",
  "coverImageUrl": "data:image/png;base64,...",
  "likes": 0,
  "views": 0,
  "createdAt": "2026-05-27T00:00:00.000Z",
  "updatedAt": "2026-05-27T00:00:00.000Z"
}
```

| 필드 | 설명 |
|---|---|
| `id` | 도서 식별자 |
| `title` | 도서 제목 |
| `author` | 작가 이름 |
| `content` | 도서 설명 또는 본문 |
| `coverImageUrl` | 표지 이미지 URL 또는 base64 Data URL |
| `likes` | 좋아요 수 |
| `views` | 조회수 |
| `createdAt` | 등록일 |
| `updatedAt` | 수정일 |

---

## 4. 도서 목록 조회

```http
GET /books
```

응답 예시:

```json
[
  {
    "id": 1,
    "title": "도서 제목",
    "author": "작가 이름",
    "content": "도서 내용",
    "coverImageUrl": "/noImage.jpg",
    "likes": 0,
    "views": 0,
    "createdAt": "2026-05-27T00:00:00.000Z",
    "updatedAt": "2026-05-27T00:00:00.000Z"
  }
]
```

---

## 5. 도서 상세 조회

```http
GET /books/:id
```

수정 화면에서 기존 도서 정보를 불러올 때 사용합니다.

---

## 6. 도서 등록

```http
POST /books
```

요청 예시:

```json
{
  "id": 123456,
  "title": "새 도서",
  "author": "작가",
  "content": "도서 설명",
  "coverImageUrl": "/noImage.jpg",
  "likes": 0,
  "views": 0,
  "createdAt": "2026-05-27T00:00:00.000Z",
  "updatedAt": "2026-05-27T00:00:00.000Z"
}
```

등록 화면에서는 제목, 작가, 내용이 필수 입력값입니다. 생성 이미지가 없거나 로딩/에러 이미지 상태라면 저장 가능한 기본 이미지로 대체합니다.

---

## 7. 도서 수정

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "title": "수정된 제목",
  "author": "수정된 작가",
  "content": "수정된 내용",
  "coverImageUrl": "data:image/png;base64,..."
}
```

수정 화면에서 AI 이미지를 다시 생성한 경우, 생성된 Data URL이 `coverImageUrl`에 반영됩니다.

---

## 8. 도서 삭제

```http
DELETE /books/:id
```

도서 삭제 후 React 상태에서도 해당 도서를 제거해 목록 화면에 즉시 반영합니다.

---

## 9. 좋아요 수정

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "likes": 1
}
```

현재 도서의 `likes` 값에 1을 더해 저장합니다.

---

## 10. 조회수 수정

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "views": 1
}
```

도서 상세 모달을 열 때 현재 도서의 `views` 값에 1을 더해 저장합니다.

---

## 11. OpenAI Images API

### Endpoint

```http
POST https://api.openai.com/v1/images/generations
```

### Headers

```http
Content-Type: application/json
Authorization: Bearer {사용자가 입력한 API Key}
```

### 요청 예시

```json
{
  "model": "gpt-image-2",
  "prompt": "도서 제목과 내용을 기반으로 구성한 표지 생성 프롬프트",
  "n": 1,
  "size": "1024x1536",
  "quality": "medium",
  "output_format": "png"
}
```

### 응답 처리 흐름

```text
OpenAI 응답
→ data[0].b64_json 추출
→ data:image/png;base64,{b64_json} 형태로 변환
→ coverImageUrl 상태에 저장
→ 등록/수정 시 json-server에 저장
```

---

## 12. 이미지 관련 필드 및 리소스

| 값 | 설명 |
|---|---|
| `coverImageUrl` | 표지 이미지 경로 또는 base64 Data URL |
| `/noImage.jpg` | 이미지가 없을 때 사용하는 기본 이미지 |
| `/test_src/01.png` | 등록 화면 초기 샘플 표지 이미지 |
| `/test_src/loading.gif` | 이미지 생성 중 표시 이미지 |
| `/test_src/error.png` | 이미지 생성 실패 시 미리보기 이미지 |
| `data:image/png;base64,...` | OpenAI가 생성한 실제 이미지 저장 형태 |

`loading.gif`와 `error.png`는 미리보기 상태 표시용입니다. 실제 등록 또는 수정 시에는 저장 가능한 이미지 URL 또는 기본 이미지(`/noImage.jpg`)를 저장하는 것이 안전합니다.

---

## 13. 주의사항

### API Key 보안

현재 구조는 학습용 프론트엔드 단독 구현입니다. API Key는 코드에 하드코딩하지 않고 화면 입력값으로만 사용해야 하며, GitHub에 업로드하면 안 됩니다.

### Payload 용량

base64 Data URL은 `db.json`에 저장할 수 있지만 이미지 크기와 품질이 높으면 요청 용량이 커질 수 있습니다. 저장 실패가 발생하면 이미지 크기 또는 품질 옵션을 낮춰야 합니다.
