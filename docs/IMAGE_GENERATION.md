# 이미지 생성 기능

## 개요

도서 등록 및 수정 화면에서 OpenAI 이미지 생성 API를 활용하여 도서 표지를 생성할 수 있습니다.

## 현재 구조

현재는 React 프론트엔드에서 OpenAI Images API를 직접 호출하는 구조입니다.

```text
React
→ OpenAI Images API
→ base64 image
→ coverImageUrl state 저장
→ 등록/수정 시 json-server에 저장
```

## 등록 화면 이미지 흐름

```text
이미지 미리보기 클릭
→ OpenAI API 요청
→ 성공 시 coverImageUrl에 base64 이미지 저장
→ 실패 시 error.png 표시

등록하기 클릭
→ 현재 coverImageUrl을 포함하여 POST /books
```

중요한 점은 이미지 미리보기와 등록 동작이 분리되어 있다는 것입니다.

## 수정 화면 이미지 흐름

```text
수정 페이지 진입
→ GET /books/:id
→ 기존 coverImageUrl 표시

이미지 미리보기 클릭
→ OpenAI API 요청
→ 성공 시 새 coverImageUrl로 미리보기 갱신

수정 완료 클릭
→ title, author, content, coverImageUrl PATCH
```

## 이미지 상태

| 이미지 | 용도 |
|---|---|
| /test_src/01.png | 샘플 이미지 |
| /noImage.jpg | 이미지 없음 기본 이미지 |
| /test_src/loading.gif | 이미지 생성 중 상태 표시 |
| /test_src/error.png | 이미지 생성 실패 상태 표시 |
| data:image/png;base64,... | OpenAI가 생성한 실제 이미지 |

## 저장 시 주의사항

`loading.gif`와 `error.png`는 상태 표시용 이미지입니다.  
등록 또는 수정 시에는 저장용 이미지로 사용하지 않는 것이 좋습니다.

권장 저장 처리:

```text
error.png 상태에서 저장
→ /noImage.jpg 저장
```

## CORS 및 API Key 문제

OpenAI API를 브라우저에서 직접 호출하면 다음 문제가 발생할 수 있습니다.

- CORS 정책으로 요청 차단
- API Key가 브라우저에 노출됨
- 네트워크 탭에서 인증 정보 확인 가능

## 권장 구조

실제 배포 환경에서는 중간 백엔드 서버를 두는 것이 안전합니다.

```text
React Frontend
→ Backend Proxy Server
→ OpenAI API
```

백엔드 서버는 `.env` 파일에서 API Key를 관리하고, 프론트엔드는 백엔드 API만 호출합니다.

예시:

```text
POST /generate-cover
```

요청:

```json
{
  "title": "도서 제목",
  "author": "작가",
  "content": "내용",
  "quality": "medium"
}
```

응답:

```json
{
  "imageUrl": "data:image/png;base64,..."
}
```
