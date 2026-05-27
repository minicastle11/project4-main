# API 문서

이 프로젝트는 json-server를 사용하여 REST API를 구성합니다.

## Base URL

```text
http://localhost:3000
```

## Resource

```text
/books
```

## 도서 목록 조회

```http
GET /books
```

### 응답 예시

```json
[
  {
    "id": "1",
    "title": "도서 제목",
    "author": "작가 이름",
    "content": "도서 내용",
    "coverImageUrl": "/test_src/01.png",
    "likes": 0,
    "views": 0,
    "createdAt": "2026-05-26T00:00:00.000Z",
    "updatedAt": "2026-05-26T00:00:00.000Z"
  }
]
```

## 도서 상세 조회

```http
GET /books/:id
```

수정 화면에서 기존 도서 정보를 불러올 때 사용합니다.

## 도서 등록

```http
POST /books
```

### 요청 예시

```json
{
  "title": "새 도서",
  "author": "작가",
  "content": "도서 설명",
  "coverImageUrl": "/test_src/01.png",
  "likes": 0,
  "views": 0,
  "createdAt": "2026-05-26T00:00:00.000Z",
  "updatedAt": "2026-05-26T00:00:00.000Z"
}
```

## 도서 수정

```http
PATCH /books/:id
```

### 요청 예시

```json
{
  "title": "수정된 제목",
  "author": "수정된 작가",
  "content": "수정된 내용",
  "coverImageUrl": "data:image/png;base64,...",
  "updatedAt": "2026-05-26T00:00:00.000Z"
}
```

## 도서 삭제

```http
DELETE /books/:id
```

## 좋아요 수정

```http
PATCH /books/:id
```

### 요청 예시

```json
{
  "likes": 1
}
```

## 조회수 수정

```http
PATCH /books/:id
```

### 요청 예시

```json
{
  "views": 1
}
```

## 이미지 관련 필드

| 필드 | 설명 |
|---|---|
| coverImageUrl | 도서 표지 이미지 경로 또는 base64 이미지 |
| image | 기존 샘플 이미지 호환용 필드 |
| /noImage.jpg | 이미지가 없을 때 사용하는 기본 이미지 |
| /test_src/01.png | 샘플 표지 이미지 |
| /test_src/loading.gif | 이미지 생성 중 표시 이미지 |
| /test_src/error.png | 이미지 생성 실패 시 미리보기 전용 이미지 |

## 주의 사항

`error.png` 또는 `loading.gif`는 저장용 이미지가 아니라 미리보기 상태 표시용 이미지입니다.  
등록 또는 수정 저장 시에는 실제 생성 이미지 또는 기본 이미지(`/noImage.jpg`)가 저장되는 것이 바람직합니다.
