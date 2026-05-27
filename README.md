# 북적 Book적 Book카페 - 도서관리 시스템

AI 표지 이미지 생성을 지원하는 React 기반 도서관리 웹 애플리케이션입니다. 
도서 등록, 목록 조회, 검색, 상세보기 모달, 수정, 삭제, 좋아요, 조회수 기능을 제공하며, OpenAI 이미지 생성 API를 활용해 도서 내용에 어울리는 표지 이미지를 생성합니다.

본 프로젝트는 KT AIVLE School AI 트랙 미니프로젝트 4차 과제인 **도서관리시스템 개발(AI를 활용한 도서표지 이미지 생성)**을 기반으로 진행했습니다.

본 문서는 최종 제출용 프로젝트 보고서 형식을 겸하도록, 기존 README의 정확한 실행 구조와 선호 내용을 유지하면서 프로젝트 배경, 시스템 구성, 기능 흐름, 트러블슈팅, 회고를 상세화한 문서입니다.

---

## 1. 프로젝트 개요

### 1.1 프로젝트명

**북적 Book적 Book카페 - 도서관리 시스템**

### 1.2 프로젝트 목적

사용자가 도서 정보를 등록하고 관리할 수 있는 React 기반 SPA를 구현합니다. 단순한 텍스트 중심 도서 관리에서 나아가, AI 표지 이미지 생성 기능을 통해 도서의 분위기와 내용을 시각적으로 표현하는 것을 목표로 합니다.

도서 표지는 사용자가 도서를 처음 접할 때 가장 먼저 확인하는 시각 요소입니다. 따라서 제목과 내용만 저장하는 관리 시스템보다, 도서 내용에 어울리는 이미지를 함께 제공하는 시스템이 더 직관적입니다. 본 프로젝트는 이러한 문제의식을 바탕으로 도서 CRUD 기능과 AI 이미지 생성 기능을 결합했습니다.

### 1.3 프로젝트 배경

기존 도서 관리 기능은 제목, 작가, 내용 등 텍스트 데이터 관리에 초점이 맞춰져 있습니다. 하지만 사용자가 목록에서 여러 도서를 확인할 때 표지 이미지가 함께 표시되면 도서의 분위기와 내용을 더 빠르게 파악할 수 있습니다.

수동으로 이미지를 찾거나 제작하는 방식은 시간이 오래 걸리고, 도서별 통일된 표지 스타일을 유지하기 어렵습니다. 이에 따라 OpenAI 이미지 생성 API를 활용하여 도서 제목과 내용을 기반으로 표지 이미지를 생성하고, 생성 결과를 도서 데이터와 함께 관리하는 방향으로 구현했습니다.

### 1.4 주요 기능

- 도서 목록 조회
- 도서 제목/작가 기준 검색
- 도서 상세보기 모달
- 도서 등록
- 도서 수정
- 도서 삭제
- 좋아요 기능
- 조회수 기능
- AI 표지 이미지 생성
- 이미지 생성 비용 안내
- 이미지 품질 옵션 선택
- 이미지 크기 옵션 선택
- API Key 보안 이슈 대응을 위한 `api_mid_server.js` 미들웨어 서버 사용
- base64 이미지 저장 시 Payload 용량 초과 문제에 대한 트러블슈팅 정리

### 1.5 최종 산출물 기준

본 프로젝트의 최종 제출 기준 산출물은 다음과 같습니다.

| 산출물 | 설명 |
|---|---|
| 소스코드 | React, json-server, Node 미들웨어 서버 기반 프로젝트 코드 |
| README.md | 프로젝트 개요, 실행 방법, 화면 구성, API, 트러블슈팅 포함 |
| docs 문서 | 기능 설명, 프론트엔드 구조, 이미지 생성 흐름, 실행 가이드, 트러블슈팅 |
| 발표자료 | 서비스 개요, 데이터 구조, UI, 구현 결과, 회고 포함 |
| 실행 화면 캡처 | Home, 목록, 상세 모달, 등록, 이미지 생성, 수정 화면 |

---

## 2. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, Vite |
| Routing | React Router DOM |
| API 요청 | Fetch API |
| Mock REST API | json-server |
| DB 역할 | db.json |
| AI 이미지 생성 | OpenAI Images API |
| Middleware Server | Node.js, Express, cors, dotenv |
| 스타일 | CSS |

### 2.1 기술 선택 이유

| 기술 | 선택 이유 |
|---|---|
| React | 컴포넌트 기반으로 화면을 분리하고 상태 기반 UI를 구현하기 적합 |
| Vite | 빠른 개발 서버와 간단한 프로젝트 실행 환경 제공 |
| React Router DOM | Home, 목록, 등록, 수정 화면을 SPA 라우팅으로 구성 가능 |
| Fetch API | 별도 라이브러리 없이 REST API 요청 구현 가능 |
| json-server | `db.json` 기반으로 빠르게 Mock REST API 구성 가능 |
| Node.js / Express | OpenAI API Key를 프론트엔드에 직접 노출하지 않도록 중간 서버 구성 가능 |
| dotenv | `.env` 파일에서 API Key를 안전하게 관리 가능 |
| OpenAI Images API | 도서 제목과 내용을 기반으로 AI 표지 이미지 생성 가능 |

---

## 3. 시스템 구조

현재 시스템은 정상 동작을 위해 세 개의 프로세스를 실행합니다.

```text
React Frontend
├─ 도서 CRUD 요청
│  └─ json-server
│     └─ db.json
│
└─ AI 이미지 생성 요청
   └─ api_mid_server.js
      └─ OpenAI Images API
```

### 3.1 핵심 구조

- React는 도서 CRUD를 위해 `json-server`의 `/books` API를 호출합니다.
- React는 이미지 생성을 위해 `api_mid_server.js` 미들웨어 서버를 호출합니다.
- `api_mid_server.js`는 `.env`의 `OPENAI_API_KEY`를 사용해 OpenAI API 호출을 대신 수행합니다.
- OpenAI 응답의 `b64_json`은 프론트엔드에서 `data:image/png;base64,...` 형태로 변환되어 `coverImageUrl`에 저장됩니다.
- 등록/수정 시 `db.json`에는 base64 Data URL이 저장될 수 있습니다.

### 3.2 요청 흐름

```text
[도서 데이터 흐름]

React
→ fetch()
→ http://localhost:3000/books
→ json-server
→ db.json
```

```text
[AI 이미지 생성 흐름]

React
→ http://localhost:3001/api/image
→ api_mid_server.js
→ OpenAI Images API
→ b64_json 응답
→ React에서 Data URL로 변환
→ coverImageUrl에 저장
→ POST/PATCH /books
→ db.json 저장
```

### 3.3 실행 프로세스 역할

| 프로세스 | 실행 명령어 | 역할 |
|---|---|---|
| React 개발 서버 | `npm run dev` | 브라우저 화면 제공 |
| json-server | `npx json-server --watch db.json --port 3000` | 도서 CRUD API 제공 |
| 미들웨어 서버 | `node api_mid_server.js` | OpenAI API 호출 우회 및 API Key 보호 |

---

## 4. 실행 방법 가이드

### 4.1 패키지 설치

```bash
npm install
```

### 4.2 `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
OPENAI_API_KEY=sk-본인의_API_KEY
```

`.env` 파일은 GitHub에 업로드하면 안 됩니다. API Key는 프론트엔드 코드에 직접 작성하지 않고, 미들웨어 서버에서만 사용하도록 관리합니다.

### 4.3 json-server 실행

도서 데이터 CRUD를 담당하는 서버입니다.

```bash
npx json-server --watch db.json --port 3000
```

확인 주소:

```text
http://localhost:3000/books
```

### 4.4 OpenAI 미들웨어 서버 실행

OpenAI API Key를 프론트엔드에 직접 노출하지 않기 위한 중간 서버입니다. 현재 시스템에서 AI 이미지 생성 기능이 정상 동작하려면 이 서버가 실행되어 있어야 합니다.

```bash
node api_mid_server.js
```

실행 주소:

```text
http://localhost:3001
```

### 4.5 React 개발 서버 실행

```bash
npm run dev
```

기본 접속 주소:

```text
http://localhost:5173
```

### 4.6 실행 체크리스트

- [ ] `npm install` 완료
- [ ] `.env` 생성 완료
- [ ] `.env`에 `OPENAI_API_KEY` 입력 완료
- [ ] `json-server` 실행 중
- [ ] `api_mid_server.js` 실행 중
- [ ] `npm run dev` 실행 중
- [ ] `http://localhost:3000/books` 접속 가능
- [ ] `http://localhost:3001` 서버 실행 가능
- [ ] `http://localhost:5173` 접속 가능

---

## 5. 주요 화면 스크린샷

### 5.1 Home 화면

![Home 화면](docs/images/home.png)

### 5.2 도서 목록 화면

![도서 목록 화면](docs/images/list.png)

### 5.3 상세보기 모달

![상세보기 모달](docs/images/detail-modal.png)

### 5.4 도서 등록 화면

![도서 등록 화면](docs/images/create.png)

### 5.5 AI 표지 생성 화면

![AI 표지 생성 화면](docs/images/ai-cover-generate.png)

### 5.6 도서 수정 화면

![도서 수정 화면](docs/images/update.png)

---

## 6. 화면 구성

### 6.1 Home 화면

서비스의 메인 화면입니다. 좋아요 수를 기준으로 인기 도서를 보여주고, 전체 목록 페이지로 이동할 수 있습니다.

주요 역할:

- 서비스 첫 진입 화면 제공
- 인기 도서 목록 표시
- 전체 도서 목록으로 이동
- 등록된 도서가 없을 때 빈 상태 안내

### 6.2 List 화면

등록된 도서를 카드 형태로 보여주는 목록 화면입니다.

주요 기능:

- 도서 목록 표시
- 제목/작가 검색
- 빈 상태 안내
- 검색 결과 없음 안내
- 카드 클릭 시 상세보기 모달 표시
- 상세보기 모달에서 좋아요, 조회수, 수정, 삭제 제공

### 6.3 상세보기 모달

도서 카드를 클릭하면 상세보기 모달을 통해 도서의 세부 정보를 확인할 수 있습니다.

표시 정보:

- 도서 제목
- 작가
- 도서 내용
- 표지 이미지
- 좋아요 수
- 조회수
- 생성일
- 수정일

제공 기능:

- 좋아요 증가
- 조회수 증가
- 수정 화면 이동
- 삭제 확인 후 삭제

### 6.4 Create 화면

신규 도서를 등록하는 화면입니다.

입력 및 기능:

- 제목 입력
- 작가 입력
- 내용 입력
- API Key 입력 또는 미들웨어 서버 기반 이미지 생성 요청
- 이미지 품질 선택
- 이미지 크기 선택 개선 예정
- 이미지 생성 전 비용 안내
- 생성된 표지 이미지 미리보기
- 등록하기 버튼으로 `POST /books`

이미지 생성 버튼은 단순 화면 미리보기가 아니라 실제 OpenAI 이미지 생성 요청을 발생시키므로 비용이 발생할 수 있습니다. 이를 사용자에게 안내한 뒤 생성 요청을 수행합니다.

### 6.5 Update 화면

기존 도서 정보를 수정하는 화면입니다.

주요 기능:

- `/books/:id`로 기존 도서 정보 조회
- 기존 제목, 작가, 내용, 표지 이미지 표시
- AI 표지 재생성
- 수정 완료 시 `PATCH /books/:id`
- `updatedAt` 갱신
- 취소 시 목록 화면으로 복귀

---

## 7. 주요 기능 상세

### 7.1 도서 목록 조회

앱 실행 시 `GET /books` 요청으로 도서 목록을 불러와 React 상태에 저장합니다.

```http
GET /books
```

조회한 데이터는 Home, List, Update 등 여러 화면에서 사용됩니다.

### 7.2 도서 검색

List 화면에서 검색어를 입력하면 도서 제목과 작가를 기준으로 목록을 필터링합니다.

```text
검색 대상: title, author
```

검색 결과가 없으면 별도의 안내 문구를 표시해 사용자가 현재 상태를 이해할 수 있도록 합니다.

### 7.3 도서 상세보기

도서 카드를 클릭하면 상세보기 모달이 열립니다. 상세보기 모달에서는 도서 정보 확인과 함께 좋아요, 수정, 삭제 기능을 수행할 수 있습니다.

조회수는 상세보기 모달 진입 시 증가하는 구조로 관리합니다.

### 7.4 도서 등록

Create 화면에서 등록하기 버튼을 누르면 신규 도서 객체를 생성하여 json-server에 저장합니다.

```http
POST /books
```

등록 데이터 예시:

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

### 7.5 도서 수정

Update 화면에서 수정 완료 버튼을 누르면 기존 도서 정보를 수정합니다.

```http
PATCH /books/:id
```

수정 가능한 항목:

- 제목
- 작가
- 내용
- 표지 이미지
- 수정일

### 7.6 도서 삭제

상세보기 모달에서 삭제 버튼을 누르면 확인 후 도서를 삭제합니다.

```http
DELETE /books/:id
```

삭제 후에는 프론트엔드 상태에서도 해당 도서를 제거하여 목록이 즉시 갱신되도록 처리합니다.

### 7.7 좋아요 기능

상세보기 모달에서 좋아요 버튼을 누르면 해당 도서의 `likes` 값을 1 증가시킵니다.

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "likes": 1
}
```

### 7.8 조회수 기능

도서 카드를 클릭하여 상세보기 모달을 열면 해당 도서의 `views` 값을 1 증가시킵니다.

```http
PATCH /books/:id
```

요청 예시:

```json
{
  "views": 1
}
```

### 7.9 AI 표지 이미지 생성

AI 표지 생성은 프론트엔드에서 OpenAI API를 직접 호출하지 않고 `api_mid_server.js`를 통해 처리합니다.

처리 흐름은 다음과 같습니다.

```text
1. 사용자가 도서 제목, 작가, 내용을 입력한다.
2. 이미지 품질과 이미지 크기 옵션을 선택한다.
3. 이미지 생성 버튼을 클릭한다.
4. React가 api_mid_server.js의 POST /api/image로 요청한다.
5. api_mid_server.js가 .env의 OPENAI_API_KEY로 OpenAI API를 호출한다.
6. OpenAI 응답의 b64_json을 React로 전달한다.
7. React는 b64_json을 data:image/png;base64,... 형태로 변환한다.
8. 변환된 Data URL을 coverImageUrl에 저장한다.
9. 도서 등록 또는 수정 시 json-server에는 base64 Data URL이 저장된다.
```

이 방식은 API Key 노출 문제를 줄이기 위한 구조입니다. 다만 base64 Data URL은 문자열 길이가 매우 길 수 있으므로, 이미지 크기와 품질이 커지는 경우 Payload 용량 초과 문제가 발생할 수 있습니다.

---

## 8. API 명세 요약

### 8.1 json-server

```text
Base URL: http://localhost:3000
Resource: /books
```

| 기능 | Method | Endpoint |
|---|---|---|
| 도서 목록 조회 | GET | `/books` |
| 도서 상세 조회 | GET | `/books/:id` |
| 도서 등록 | POST | `/books` |
| 도서 수정 | PATCH | `/books/:id` |
| 도서 삭제 | DELETE | `/books/:id` |
| 좋아요 증가 | PATCH | `/books/:id` |
| 조회수 증가 | PATCH | `/books/:id` |

### 8.2 미들웨어 서버

```text
Base URL: http://localhost:3001
```

| 기능 | Method | Endpoint | 설명 |
|---|---|---|---|
| AI 이미지 생성 | POST | `/api/image` | `.env`의 API Key로 OpenAI API 호출 대행 |

요청 예시:

```json
{
  "model": "gpt-image-2",
  "prompt": "도서 제목과 내용을 기반으로 생성한 프롬프트",
  "n": 1,
  "size": "1024x1536",
  "quality": "medium",
  "output_format": "png"
}
```

응답 예시:

```json
{
  "data": [
    {
      "b64_json": "..."
    }
  ]
}
```

---

## 9. 데이터 구조

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
| id | 도서 고유 ID |
| title | 도서 제목 |
| author | 작가 이름 |
| content | 도서 설명 또는 내용 |
| coverImageUrl | 표지 이미지 경로 또는 base64 Data URL |
| likes | 좋아요 수 |
| views | 조회수 |
| createdAt | 생성일 |
| updatedAt | 수정일 |

### 9.1 coverImageUrl 저장 방식

현재 시스템에서는 생성된 AI 표지 이미지를 `data:image/png;base64,...` 형태의 Data URL로 저장할 수 있습니다.

```text
coverImageUrl: "data:image/png;base64,..."
```

이 방식은 별도의 이미지 파일 서버 없이 이미지를 바로 렌더링할 수 있다는 장점이 있습니다. 그러나 문자열이 매우 길어질 수 있어 Payload 용량 제한 문제가 발생할 수 있습니다.

---

## 10. 프로젝트 폴더 구조

```text
project4-main/
├── api_mid_server.js
├── db.json
├── package.json
├── README.md
├── docs/
│   ├── API.md
│   ├── FEATURES.md
│   ├── FRONTEND_STRUCTURE.md
│   ├── IMAGE_GENERATION.md
│   ├── OVERVIEW.md
│   ├── RUN_GUIDE.md
│   ├── TROUBLESHOOTING.md
│   └── images/
├── public/
│   ├── noImage.jpg
│   └── test_src/
└── src/
    ├── App.jsx
    ├── components/
    ├── views/
    └── assets/
```

### 10.1 주요 파일 설명

| 파일/폴더 | 설명 |
|---|---|
| `api_mid_server.js` | OpenAI API 호출을 대행하는 Node/Express 미들웨어 서버 |
| `db.json` | json-server가 사용하는 도서 데이터 저장 파일 |
| `src/App.jsx` | 앱 전체 상태 관리, 라우팅, CRUD 핸들러 관리 |
| `src/views` | Home, List, Create, Update 화면 컴포넌트 |
| `src/components` | Header, 입력 폼, 이미지 생성 폼, 수정 폼 등 재사용 컴포넌트 |
| `docs` | 프로젝트 상세 문서 |
| `public` | 정적 이미지 리소스 |

---

## 11. 트러블슈팅 핵심 정리

### 11.1 OpenAI API Key를 프론트엔드에 직접 올리면 안 되는 문제

프론트엔드에서 OpenAI API를 직접 호출하면 API Key가 브라우저 네트워크 탭에 노출될 수 있습니다. 따라서 최종 실행 구조에서는 `api_mid_server.js`를 통해 OpenAI API 호출을 우회합니다.

```text
나쁜 구조:
React → OpenAI API

개선 구조:
React → api_mid_server.js → OpenAI API
```

해결 방식:

- `.env`에 `OPENAI_API_KEY` 저장
- 프론트엔드 코드에는 API Key를 직접 작성하지 않음
- React는 미들웨어 서버의 `/api/image`를 호출
- 미들웨어 서버가 OpenAI API 호출을 대행

### 11.2 Payload 10000KB 이상으로 저장이 실패하는 문제

현재 시스템은 생성된 이미지를 base64 Data URL 형태로 `db.json`의 `coverImageUrl`에 저장할 수 있습니다. 이 방식은 동작하지만 이미지 품질이나 크기가 커지면 base64 문자열이 매우 길어져 Payload 용량 제한에 걸릴 수 있습니다.

증상 예시:

```text
PayloadTooLargeError
request entity too large
Payload size exceeds the limit
```

해결 방향:

- 이미지 품질을 낮춰 생성
- 이미지 크기 옵션을 조절
- 너무 큰 base64 이미지는 저장하지 않도록 제한
- 생성 실패 또는 저장 실패 시 사용자에게 안내
- 향후 개선안으로 서버 파일 저장 후 URL만 저장하는 구조 검토

### 11.3 json-server 응답 오류

```text
Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

이 오류는 API 요청이 json-server가 아니라 Vite 개발 서버의 HTML 응답을 받은 경우 발생할 수 있습니다.

확인할 것:

- `json-server`가 3000번 포트에서 실행 중인지 확인
- API URL이 `http://localhost:3000/books`인지 확인
- Vite 서버 주소와 json-server 주소를 혼동하지 않았는지 확인

### 11.4 미들웨어 서버 미실행

AI 이미지 생성 요청 시 `http://localhost:3001/api/image` 서버가 실행되어 있지 않으면 이미지 생성이 실패합니다.

확인할 것:

- `node api_mid_server.js` 실행 여부
- `.env` 파일 존재 여부
- `.env`에 `OPENAI_API_KEY`가 있는지 확인
- 포트 3001 충돌 여부 확인

---

## 12. 팀 프로젝트 역할 분담

| 역할 | 담당 내용 |
|---|---|
| PM / 기획 | 요구사항 정의, 기능 명세, 일정 관리 |
| UI / 레이아웃 | 화면 구조 설계, 공통 컴포넌트 제작, 디자인 톤 관리 |
| CRUD 연동 | json-server 세팅, 목록/상세/등록/수정/삭제 API 연동 |
| OpenAI 연동 | 이미지 생성 API 연동, 미들웨어 서버 구성, 에러/로딩 처리 |
| 스타일링 / QA | CSS 마감, 반응형 확인, 기능 테스트 |
| 발표 / 문서 | README 정리, 발표자료 작성, 데모 시연 준비 |

---

## 13. 프로젝트 진행 과정

### 13.1 1단계: 기본 구조 설계

- 요구사항 분석
- 도서 데이터 구조 정의
- 화면 구성 설계
- React + Vite 프로젝트 구성
- json-server 설정

### 13.2 2단계: CRUD 기능 구현

- 도서 목록 조회
- 도서 등록
- 도서 수정
- 도서 삭제
- 좋아요 및 조회수 기능 구현
- 상세보기 모달 구현

### 13.3 3단계: AI 이미지 생성 연동

- 이미지 생성 프롬프트 구성
- OpenAI 이미지 생성 요청 구현
- API Key 보안 문제 확인
- `api_mid_server.js` 미들웨어 서버 구성
- 이미지 생성 비용 안내 추가
- base64 저장 및 Payload 문제 확인

### 13.4 4단계: 문서화 및 최종 정리

- README 정리
- docs 문서 최신화
- 실행 방법 가이드 작성
- 핵심 트러블슈팅 정리
- 발표자료 작성

---

## 14. 프로젝트 회고

이번 프로젝트를 통해 React 컴포넌트 구조, 상태 관리, json-server 기반 REST API 연동, Fetch API 기반 CRUD, OpenAI 이미지 생성 API 연동, Node/Express 미들웨어 서버 구성까지 하나의 흐름으로 경험할 수 있었습니다.

특히 단순히 API를 호출하는 것에서 끝나지 않고, API Key 노출 문제를 해결하기 위해 미들웨어 서버를 도입하면서 프론트엔드 프로젝트에서도 보안 구조가 중요하다는 점을 확인했습니다.

또한 AI 이미지 응답을 base64 Data URL로 저장하는 방식은 구현이 단순하고 화면 렌더링이 쉽다는 장점이 있지만, 이미지 품질이나 크기가 커질수록 Payload 용량 초과 문제가 발생할 수 있다는 한계도 확인했습니다. 이를 통해 데이터 저장 방식과 사용자 경험, 시스템 안정성을 함께 고려해야 한다는 점을 배웠습니다.

---
