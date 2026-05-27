# 프로젝트 개요

## 프로젝트명

Book Archive - 도서관리 시스템

## 목적

도서 정보를 등록하고 관리할 수 있는 React 기반 웹 애플리케이션입니다.  
도서 제목, 작가, 내용, 표지 이미지를 관리하며, 사용자는 도서 목록을 검색하고 상세 정보를 확인할 수 있습니다.

## 핵심 목표

- React 기반 SPA 구조 구현
- json-server를 활용한 REST API 연동
- Fetch API를 활용한 CRUD 구현
- 도서 등록 / 조회 / 수정 / 삭제 기능 제공
- OpenAI 이미지 생성 API 기반 표지 이미지 미리보기 기능 제공
- 사용자 경험을 고려한 빈 상태 및 에러 상태 처리

## 전체 흐름

```text
React App
→ fetch()
→ json-server
→ db.json
```

이미지 생성 기능은 현재 React에서 OpenAI API를 직접 호출하는 구조입니다.

```text
React App
→ OpenAI Images API
→ base64 image
→ coverImageUrl 저장
```

단, 실제 서비스 환경에서는 보안과 CORS 문제를 고려해 백엔드 프록시 서버를 사용하는 구조가 권장됩니다.

## 주요 데이터

도서 데이터는 `/books` 리소스를 기준으로 관리됩니다.

```json
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
```
