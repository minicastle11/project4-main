# 프로젝트 개요

## 1. 프로젝트명

북적 Book적 Book카페 - 도서관리 시스템

---

## 2. 목적

도서 정보를 등록하고 관리할 수 있는 React 기반 웹 애플리케이션입니다.

사용자는 도서 제목, 작가, 내용, 표지 이미지를 관리할 수 있으며, 도서 목록 조회와 상세 정보 확인 기능을 사용할 수 있습니다.

또한 OpenAI 이미지 생성 API를 활용하여 도서 내용에 어울리는 AI 표지 이미지를 생성할 수 있습니다.

---

## 3. 핵심 목표

- React 기반 SPA 구조 구현
- json-server 기반 REST API 연동
- Fetch API 기반 CRUD 구현
- 도서 등록 / 조회 / 수정 / 삭제 기능 제공
- 도서 검색 기능 제공
- 상세보기 모달 제공
- 좋아요 및 조회수 기능 제공
- OpenAI 이미지 생성 API 기반 표지 생성 기능 제공
- base64 Data URL 저장 구조 이해
- OpenAI API 연동 경험 확보

---

## 4. 전체 시스템 흐름

```text
React App
├─ 도서 데이터 요청
│  └─ json-server
│     └─ db.json
│
└─ 이미지 생성 요청
   └─ OpenAI Images API
```

프로젝트는 프론트엔드 중심 구조이며, json-server를 로컬 REST API처럼 활용합니다.

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
→ OpenAI Images API
→ b64_json 응답
→ React에서 Data URL 변환
→ coverImageUrl 저장
→ db.json 저장
```

생성된 이미지는 `coverImageUrl` 필드에 저장되며, 목록 및 상세 화면에 즉시 반영됩니다.

---

## 7. 주요 데이터 구조

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

## 8. 사용 기술

| 구분 | 기술 |
|---|---|
| Frontend | React, Vite |
| API 통신 | fetch |
| Mock API | json-server |
| AI 이미지 생성 | OpenAI Images API |
| 협업 | GitHub |

---

## 9. 프로젝트 특징

- React 컴포넌트 기반 구조
- fetch 기반 REST API 연동
- OpenAI API 직접 호출 구조
- CRUD + AI 이미지 생성 통합
- 학습 중심 프론트엔드 프로젝트
