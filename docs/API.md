# API 문서

이 프로젝트는 도서 데이터 관리를 위해 `json-server`를 사용하고, AI 이미지 생성을 위해 `api_mid_server.js` 미들웨어 서버를 사용합니다.

---

## 1. 서버 구성

| 서버 | 주소 | 역할 |
|---|---|---|
| React 개발 서버 | `http://localhost:5173` | 화면 렌더링 |
| json-server | `http://localhost:3000` | 도서 CRUD API |
| api_mid_server.js | `http://localhost:3001` | OpenAI API 호출 우회 |

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
| 좋아요 수정 | PATCH | `/books/:id` | likes 값 수정 |
| 조회수 수정 | PATCH | `/books/:id` | views 값 수정 |

---

## 3. 도서 목록 조회

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
    "coverImageUrl": "data:image/png;base64,...",
    "likes": 0,
    "views": 0,
    "createdAt": "2026-05-27T00:00:00.000Z",
    "updatedAt": "2026-05-27T00:00:00.000Z"
  }
]
```

---

## 4. 도서 상세 조회

```http
GET /books/:id
```

수정 화면에서 기존 도서 정보를 불러올 때 사용합니다.

---

## 5. 도서 등록

```http
POST /books
```

요청 예시:

```json
{
  "id": 1,
  "title": "새 도서",
  "author": "작가",
  "content": "도서 설명",
  "coverImageUrl": "data:image/png;base64,...",
  "likes": 0,
  "views": 0,
  "createdAt": "2026-05-27T00:00:00.000Z",
  "updatedAt": "2026-05-27T00:00:00.000Z"
}
```

---

## 6. 도서 수정

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "title": "수정된 제목",
  "author": "수정된 작가",
  "content": "수정된 내용",
  "coverImageUrl": "data:image/png;base64,...",
  "updatedAt": "2026-05-27T00:00:00.000Z"
}
```

---

## 7. 도서 삭제

```http
DELETE /books/:id
```

도서 삭제 후 React 상태에서도 해당 도서를 제거합니다.

---

## 8. 좋아요 수정

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "likes": 1
}
```

---

## 9. 조회수 수정

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "views": 1
}
```

---

## 10. OpenAI 미들웨어 API

### Base URL

```text
http://localhost:3001
```

### 이미지 생성

```http
POST /api/image
```

이 API는 React가 OpenAI API를 직접 호출하지 않도록 중간에서 요청을 대행합니다. `.env`의 `OPENAI_API_KEY`를 사용합니다.

요청 예시:

```json
{
  "model": "gpt-image-2",
  "prompt": "도서 내용 기반 표지 생성 프롬프트",
  "n": 1,
  "size": "1024x1536",
  "quality": "medium",
  "output_format": "png"
}
```

응답은 구현 방식에 따라 OpenAI 응답을 그대로 전달하거나, 프론트에서 `b64_json`을 꺼내 Data URL로 변환해 사용할 수 있습니다.

프론트 저장 예시:

```text
coverImageUrl = data:image/png;base64,{b64_json}
```

---

## 11. 이미지 관련 필드

| 필드/값 | 설명 |
|---|---|
| `coverImageUrl` | 표지 이미지 경로 또는 base64 Data URL |
| `/noImage.jpg` | 이미지가 없을 때 사용하는 기본 이미지 |
| `/test_src/01.png` | 샘플 표지 이미지 |
| `/test_src/loading.gif` | 이미지 생성 중 상태 표시 이미지 |
| `/test_src/error.png` | 이미지 생성 실패 시 미리보기 전용 이미지 |
| `data:image/png;base64,...` | OpenAI가 생성한 실제 이미지 저장 형태 |

`loading.gif`와 `error.png`는 상태 표시용 이미지입니다. 등록 또는 수정 시 실제 생성 이미지가 없으면 기본 이미지(`/noImage.jpg`)를 저장하는 것이 안전합니다.
