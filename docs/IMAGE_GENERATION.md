# 이미지 생성 기능

## 1. 개요

도서 등록 및 수정 화면에서 OpenAI 이미지 생성 API를 활용하여 도서 표지를 생성할 수 있습니다.

이미지 생성은 사용자가 입력한 도서 제목, 작가, 내용 정보를 기반으로 프롬프트를 구성하여 요청합니다.

---

## 2. 현재 실행 구조

현재 프로젝트는 프론트엔드(React)가 OpenAI Images API를 직접 호출하는 구조입니다.

```text
React
→ OpenAI Images API
→ b64_json 응답
→ React에서 data:image/png;base64,... 변환
→ coverImageUrl state 저장
→ 등록/수정 시 db.json 저장
```

사용자는 화면에서 직접 API Key를 입력하며, 입력한 Key는 OpenAI 요청 시 Authorization 헤더에 사용됩니다.

---

## 3. OpenAI API 호출 방식

프로젝트는 `fetch()`를 사용하여 OpenAI 이미지 생성 API를 호출합니다.

```js
const res = await fetch(
  'https://api.openai.com/v1/images/generations',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1536',
    }),
  }
)
```

응답으로 전달받은 `b64_json` 값을 Data URL 형태로 변환하여 화면과 DB에 저장합니다.

---

## 4. 등록 화면 이미지 흐름

```text
이미지 생성하기 클릭
→ OpenAI API 요청
→ b64_json 응답 수신
→ data:image/png;base64,... 변환
→ coverImageUrl 상태 저장
→ 미리보기 이미지 갱신

등록하기 클릭
→ coverImageUrl 포함 POST /books
```

이미지 생성과 도서 등록은 별도 동작으로 분리되어 있습니다.

---

## 5. 수정 화면 이미지 흐름

```text
수정 페이지 진입
→ GET /books/:id
→ 기존 coverImageUrl 표시

이미지 생성하기 클릭
→ OpenAI API 요청
→ 새 coverImageUrl 상태 갱신

수정 완료 클릭
→ PATCH /books/:id
```

---

## 6. 이미지 상태

| 이미지 | 설명 |
|---|---|
| `/test_src/01.png` | 샘플 이미지 |
| `/noImage.jpg` | 기본 이미지 |
| `/test_src/loading.gif` | 로딩 상태 표시 |
| `/test_src/error.png` | 오류 상태 표시 |
| `data:image/png;base64,...` | OpenAI 생성 이미지 |

`loading.gif`와 `error.png`는 상태 표시용 이미지이며 실제 저장용 이미지가 아닙니다.

---

## 7. base64 저장 방식

생성된 이미지는 Data URL(base64) 형태로 저장할 수 있습니다.

```json
{
  "coverImageUrl": "data:image/png;base64,iVBORw0KGgoAAA..."
}
```

별도의 이미지 서버 없이 저장할 수 있다는 장점이 있습니다.

---

## 8. Payload 용량 문제

base64 문자열은 길이가 매우 길어질 수 있으므로 큰 이미지 저장 시 json-server에서 Payload 초과 문제가 발생할 수 있습니다.

### 주요 증상

- 등록 실패
- 수정 실패
- `PayloadTooLargeError`
- `request entity too large`

### 해결 방향

- 이미지 품질 낮추기
- 이미지 크기 축소
- 저장 크기 제한
- 추후 이미지 서버 분리 검토

---

## 9. 이미지 생성 옵션

| 옵션 | 설명 |
|---|---|
| model | 이미지 생성 모델 |
| prompt | 도서 기반 프롬프트 |
| n | 생성 개수 |
| size | 이미지 크기 |
| quality | 이미지 품질 |
| output_format | 출력 포맷 |

---

## 10. API Key 관련 주의사항

현재 프로젝트는 학습용 프론트엔드 구조이므로 사용자가 직접 API Key를 입력하는 방식을 사용합니다.

실서비스 환경에서는 API Key를 브라우저에 직접 노출하지 않도록 별도의 백엔드 서버 또는 프록시 서버를 사용하는 것이 권장됩니다.
