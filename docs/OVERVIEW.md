# 프로젝트 개요

## 1. 프로젝트명

북적 Book적 Book카페 - 도서관리 시스템

---

## 2. 목적

도서 정보를 등록하고 관리할 수 있는 React 기반 웹 애플리케이션입니다.
도서 제목, 작가, 내용, 표지 이미지를 관리하며, 사용자는 도서 목록을 검색하고 상세 정보를 확인할 수 있습니다.

추가로 OpenAI 이미지 생성 API를 활용하여 도서 내용에 어울리는 AI 표지 이미지를 생성할 수 있습니다.

---

## 3. 핵심 목표

- React 기반 SPA 구조 구현
- json-server를 활용한 REST API 연동
- Fetch API를 활용한 CRUD 구현
- 도서 등록/조회/수정/삭제 기능 제공
- 도서 검색 기능 제공
- 상세보기 모달 제공
- 좋아요 및 조회수 기능 제공
- OpenAI 이미지 생성 API 기반 표지 이미지 생성 기능 제공
- 이미지 생성 비용 안내 제공
- API Key 보안 문제를 줄이기 위한 `api_mid_server.js` 미들웨어 서버 사용
- base64 Data URL 저장 시 Payload 용량 초과 문제에 대한 대응 방안 정리

---

## 4. 전체 시스템 흐름

```text
React App
├─ 도서 데이터 요청
│  └─ json-server
│     └─ db.json
│
└─ 이미지 생성 요청
   └─ api_mid_server.js
      └─ OpenAI Images API
```

---

## 5. 도서 CRUD 흐름

```text
React App
→ fetch()
→ json-server
→ db.json
```

도서 데이터는 `/books` 리소스를 기준으로 관리됩니다.

---

## 6. 이미지 생성 흐름

```text
React App
→ api_mid_server.js
→ OpenAI Images API
→ b64_json 응답
→ React에서 Data URL 변환
→ coverImageUrl 저장
→ db.json 저장
```

이미지 생성 기능은 미들웨어 서버를 통해 OpenAI API를 호출합니다.
이 구조는 프론트엔드에서 OpenAI API Key가 직접 노출되는 문제를 줄이기 위한 구조입니다.

---

## 7. 주요 데이터

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

---
