# 이미지 생성 기능

## 1. 개요

도서 등록 및 수정 화면에서 OpenAI 이미지 생성 API를 활용하여 도서 표지를 생성할 수 있습니다.
이미지 생성은 사용자의 도서 제목, 작가, 내용 정보를 바탕으로 프롬프트를 구성하여 요청합니다.

---

## 2. 현재 실행 구조

현재 최종 실행 구조에서는 프론트엔드가 OpenAI API를 직접 호출하지 않고, `api_mid_server.js` 미들웨어 서버를 통해 호출합니다.

```text
React
→ api_mid_server.js
→ OpenAI Images API
→ b64_json 응답
→ React에서 data:image/png;base64,... 변환
→ coverImageUrl state 저장
→ 등록/수정 시 db.json에 저장
```

미들웨어 서버는 `.env`의 `OPENAI_API_KEY`를 사용하여 OpenAI API 요청을 대신 수행합니다.

---

## 3. 미들웨어 서버가 필요한 이유

### 3.1 API Key 노출 방지

프론트엔드에서 OpenAI API를 직접 호출하면 브라우저 네트워크 탭에서 API Key가 노출될 수 있습니다.
따라서 API Key는 `.env`에 저장하고, Node 서버에서만 사용하도록 분리합니다.

```text
나쁜 구조:
React → OpenAI API

개선 구조:
React → api_mid_server.js → OpenAI API
```

### 3.2 정책 및 보안 이슈 대응

OpenAI API Key를 프론트엔드 코드에 하드코딩하거나 사용자의 브라우저에서 직접 전달하는 방식은 보안상 적절하지 않습니다.
`api_mid_server.js`는 이 문제를 우회하기 위한 중간 서버 역할을 합니다.

---

## 4. 등록 화면 이미지 흐름

```text
이미지 생성하기 클릭
→ 이미지 생성 비용 안내 alert 표시
→ api_mid_server.js로 이미지 생성 요청
→ OpenAI API 응답 수신
→ b64_json을 data:image/png;base64,... 형태로 변환
→ coverImageUrl 상태에 저장
→ 미리보기 이미지 갱신

등록하기 클릭
→ 현재 입력값과 현재 coverImageUrl을 포함하여 POST /books
```

중요한 점은 이미지 생성과 도서 등록 동작이 분리되어 있다는 것입니다.

---

## 5. 수정 화면 이미지 흐름

```text
수정 페이지 진입
→ GET /books/:id
→ 기존 coverImageUrl 표시

이미지 생성하기 클릭
→ 이미지 생성 비용 안내 alert 표시
→ api_mid_server.js로 이미지 생성 요청
→ 새 coverImageUrl로 미리보기 갱신

수정 완료 클릭
→ title, author, content, coverImageUrl PATCH
```

---

## 6. 이미지 상태

| 이미지 | 용도 |
|---|---|
| `/test_src/01.png` | 샘플 이미지 |
| `/noImage.jpg` | 이미지 없음 기본 이미지 |
| `/test_src/loading.gif` | 이미지 생성 중 상태 표시 |
| `/test_src/error.png` | 이미지 생성 실패 상태 표시 |
| `data:image/png;base64,...` | OpenAI가 생성한 실제 이미지 |

`loading.gif`와 `error.png`는 저장용 이미지가 아니라 상태 표시용 이미지입니다.
등록 또는 수정 저장 시에는 실제 생성 이미지 또는 기본 이미지(`/noImage.jpg`)가 저장되는 것이 바람직합니다.

---

## 7. base64 저장 방식

현재 시스템은 생성된 이미지를 base64 Data URL 형태로 `db.json`에 저장할 수 있습니다.

예시:

```json
{
  "coverImageUrl": "data:image/png;base64,iVBORw0KGgoAAA..."
}
```

이 방식은 구현이 단순하고 이미지 파일 서버를 별도로 관리하지 않아도 되는 장점이 있습니다.

---

## 8. Payload 10000KB 초과 문제

base64 Data URL은 문자열이 매우 길어질 수 있습니다.
이미지 품질이 높거나 이미지 크기가 커지면 `coverImageUrl` 값이 10000KB 이상으로 커질 수 있고, 이 경우 json-server 저장 과정에서 Payload 용량 초과 문제가 발생할 수 있습니다.

### 증상

- 도서 등록 실패
- 도서 수정 실패
- `PayloadTooLargeError`
- `request entity too large`
- json-server 응답 실패

### 해결 방향

- 이미지 품질을 낮춰 생성
- 이미지 크기 옵션을 낮춰 생성
- 너무 큰 base64 이미지는 저장하지 않도록 제한
- 향후 서버에 이미지 파일을 저장하고 URL만 DB에 저장하는 방식 검토

---

## 9. 이미지 생성 옵션

현재 또는 개선 예정 옵션은 다음과 같습니다.

| 옵션 | 설명 |
|---|---|
| model | 이미지 생성 모델 |
| prompt | 도서 제목/작가/내용 기반 프롬프트 |
| n | 생성 이미지 개수 |
| size | 이미지 크기. 현재 고정 또는 선택 옵션 개선 예정 |
| quality | 이미지 품질 |
| output_format | 출력 형식 |

---

## 10. 비용 안내

이미지 생성 버튼을 누르면 실제 OpenAI API 요청이 발생합니다.
따라서 단순 미리보기가 아니라 비용이 발생할 수 있는 작업입니다.
사용자에게 이미지 생성 전 비용 발생 가능성을 안내해야 합니다.
