# Book Archive - 도서관리 시스템

React와 json-server를 활용한 도서관리 웹 애플리케이션입니다.  
도서 등록, 조회, 수정, 삭제 기능을 제공하며, 도서 표지 이미지 미리보기 및 재생성 기능을 포함합니다.

---

## 1. 프로젝트 개요

### 프로젝트명

**Book Archive - 도서관리 시스템**

### 프로젝트 목적

사용자가 도서 정보를 등록하고 관리할 수 있는 React 기반 웹 애플리케이션을 구현하는 것을 목표로 합니다.  
도서 제목, 작가, 내용, 표지 이미지를 관리하고, 목록 조회·검색·상세 확인·수정·삭제 기능을 제공합니다.

### 주요 구현 목표

- React 기반 SPA 구조 구현
- json-server 기반 REST API 연동
- Fetch API를 활용한 CRUD 기능 구현
- 도서 목록 및 상세 정보 조회
- 도서 등록 및 수정 폼 구현
- 도서 표지 이미지 미리보기 및 재생성 기능 구현
- 좋아요 및 조회수 기능 구현
- 도서 없음 / 검색 결과 없음 등 빈 상태 안내 처리
- Create와 Update 화면의 UI 스타일 통일

---

## 2. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, Vite |
| Routing | React Router DOM |
| API 요청 | Fetch API |
| Mock REST API | json-server |
| DB 역할 | db.json |
| 이미지 생성 | OpenAI Images API |
| 스타일 | CSS |

---

## 3. 실행 방법

### 3.1 패키지 설치

```bash
npm install
```

### 3.2 json-server 실행

```bash
npx json-server --watch db.json --port 3000
```

도서 데이터 API 주소는 다음과 같습니다.

```text
http://localhost:3000/books
```

### 3.3 React 개발 서버 실행

```bash
npm run dev
```

기본 실행 주소는 보통 다음과 같습니다.

```text
http://localhost:5173
```

---

## 4. 화면 구성

### 4.1 Home 화면

Home 화면은 서비스의 메인 화면입니다.  
좋아요 수를 기준으로 인기 도서 목록을 보여주며, 전체 도서 목록 페이지로 이동할 수 있습니다.

#### 주요 기능

- 좋아요 수 기준 인기 도서 목록 표시
- 도서가 없을 경우 빈 상태 안내 문구 표시
- 전체 보기 버튼을 통해 목록 페이지 이동

---

### 4.2 List 화면

List 화면은 등록된 도서를 카드 형태로 보여주는 목록 화면입니다.

#### 주요 기능

- json-server의 `/books` 데이터를 기반으로 도서 목록 렌더링
- 도서 제목 및 작가 기준 검색
- 검색 결과 없음 안내
- 등록된 도서 없음 안내
- 도서 카드 클릭 시 상세 모달 표시
- 상세 모달에서 좋아요, 조회수, 수정, 삭제 기능 제공

#### 빈 상태 처리

| 상황 | 표시 문구 |
|---|---|
| 등록된 도서가 없음 | 등록된 도서가 없습니다. |
| 검색 결과가 없음 | 검색 결과가 없습니다. |

---

### 4.3 Create 화면

Create 화면은 신규 도서를 등록하는 화면입니다.

#### 입력 항목

- 도서 제목
- 작가 이름
- 도서 내용
- 표지 이미지

#### 주요 기능

- 도서 정보 입력
- 이미지 품질 선택
- 표지 이미지 미리보기 생성
- 등록하기 버튼을 통한 신규 도서 저장
- 등록 시 좋아요와 조회수 초기값 설정

#### 이미지 미리보기와 등록 동작 분리

Create 화면에서는 이미지 미리보기와 등록 기능을 분리했습니다.

```text
이미지 미리보기 클릭
→ 이미지 생성만 수행
→ 등록은 수행하지 않음

등록하기 클릭
→ 현재 입력값과 현재 coverImageUrl을 기준으로 POST /books 수행
```

이를 통해 이미지 미리보기 실패 시에도 게시물이 자동 등록되지 않도록 처리했습니다.

---

### 4.4 Update 화면

Update 화면은 기존 도서 정보를 수정하는 화면입니다.  
Create 화면과 동일한 스타일을 기반으로 구성했으며, 기존 도서 정보를 불러와 수정할 수 있습니다.

#### 주요 기능

- `/books/:id`로 기존 도서 데이터 조회
- 기존 제목, 작가, 내용, 표지 이미지 표시
- 기존 표지 이미지 미리보기
- API Key 입력
- 이미지 품질 선택
- 이미지 재생성
- 수정 완료 시 PATCH 요청
- 수정 시 `updatedAt` 갱신

#### 수정 흐름

```text
/update/:id 진입
→ GET /books/:id
→ 기존 데이터 UpdateForm에 반영
→ 제목 / 작가 / 내용 / 이미지 수정
→ 수정 완료 클릭
→ PATCH /books/:id
→ /list 이동
```

---

## 5. 주요 기능 상세

### 5.1 도서 목록 조회

앱이 처음 실행되면 `App.jsx`에서 `/books` 데이터를 조회해 `books` 상태에 저장합니다.

```text
GET /books
```

조회한 데이터는 Home, List, Update 등 여러 화면에서 사용됩니다.

---

### 5.2 도서 검색

List 화면에서 검색어를 입력하면 도서 제목과 작가를 기준으로 필터링합니다.

```text
검색 대상: title, author
```

검색어가 있고 필터링 결과가 없으면 `검색 결과가 없습니다.` 문구를 표시합니다.

---

### 5.3 도서 상세 모달

List 화면의 도서 카드를 클릭하면 상세 모달이 표시됩니다.

상세 모달에서 제공하는 기능은 다음과 같습니다.

- 도서 제목 표시
- 작가 표시
- 표지 이미지 표시
- 도서 내용 표시
- 좋아요 수 표시
- 조회수 표시
- 좋아요 버튼
- 삭제 버튼
- 수정 버튼

---

### 5.4 조회수 증가

도서 카드를 클릭하여 상세 모달을 열면 해당 도서의 조회수가 증가합니다.

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

### 5.5 좋아요 기능

상세 모달에서 좋아요 버튼을 누르면 해당 도서의 좋아요 수가 증가합니다.

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

### 5.6 도서 삭제

상세 모달에서 삭제 버튼을 누르면 확인 창을 표시한 뒤 도서를 삭제합니다.

```http
DELETE /books/:id
```

삭제 후 목록 상태에서도 해당 도서를 제거합니다.

---

### 5.7 도서 등록

Create 화면에서 등록하기 버튼을 누르면 신규 도서 객체를 생성해 `/books`에 저장합니다.

```http
POST /books
```

등록 데이터 예시:

```json
{
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

---

### 5.8 도서 수정

Update 화면에서 수정 완료 버튼을 누르면 기존 도서를 수정합니다.

```http
PATCH /books/:id
```

수정 데이터 예시:

```json
{
  "title": "수정된 제목",
  "author": "수정된 작가",
  "content": "수정된 내용",
  "coverImageUrl": "data:image/png;base64,...",
  "updatedAt": "2026-05-26T00:00:00.000Z"
}
```

---

## 6. API 명세

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

## 7. 데이터 구조

### 도서 데이터 예시

```json
{
  "id": "1",
  "title": "도서 제목",
  "author": "작가 이름",
  "content": "도서 내용",
  "coverImageUrl": "/test_src/01.png",
  "image": "/noImage.jpg",
  "likes": 0,
  "views": 0,
  "createdAt": "2026-05-26T00:00:00.000Z",
  "updatedAt": "2026-05-26T00:00:00.000Z"
}
```

### 주요 필드 설명

| 필드 | 설명 |
|---|---|
| id | 도서 고유 ID |
| title | 도서 제목 |
| author | 작가 이름 |
| content | 도서 설명 또는 내용 |
| coverImageUrl | 표지 이미지 경로 또는 base64 이미지 |
| image | 기존 이미지 호환용 필드 |
| likes | 좋아요 수 |
| views | 조회수 |
| createdAt | 생성일 |
| updatedAt | 수정일 |

---

## 8. 프론트엔드 구조

```text
src/
├─ components/
│  ├─ Header.jsx
│  ├─ InputInfo.jsx
│  ├─ Dropdown.jsx
│  ├─ CreateForm.jsx
│  ├─ CreateImageForm.jsx
│  ├─ UpdateForm.jsx
│  ├─ UpdateImageControls.jsx
│  └─ UpdateImagePreview.jsx
│
├─ views/
│  ├─ Home.jsx
│  ├─ List.jsx
│  ├─ Create.jsx
│  └─ Update.jsx
│
├─ App.jsx
├─ App.css
└─ main.jsx
```

---

## 9. 주요 컴포넌트 역할

### App.jsx

앱 전체 상태와 라우팅을 담당합니다.

#### 주요 상태

- `books`
- `query`
- `loading`
- `error`

#### 주요 함수

- `handleAddBook`
- `handleUpdateBook`
- `handleDelete`
- `handleLike`
- `handleView`

---

### Home.jsx

Home 화면을 담당합니다.

#### 역할

- 인기 도서 목록 표시
- 좋아요 기준 정렬
- 도서 없음 안내 표시

---

### List.jsx

도서 목록 화면을 담당합니다.

#### 역할

- 도서 목록 렌더링
- 검색 필터링
- 상세 모달 표시
- 삭제 / 좋아요 / 조회수 / 수정 이동 처리

---

### Create.jsx

도서 등록 화면의 진입 컴포넌트입니다.

```text
Create.jsx
→ CreateForm.jsx
```

---

### CreateForm.jsx

도서 등록 폼의 전체 레이아웃을 담당합니다.

```text
CreateForm.jsx
├─ InputInfo.jsx
└─ CreateImageForm.jsx
```

---

### InputInfo.jsx

Create와 Update에서 공통으로 사용하는 입력 컴포넌트입니다.

#### 입력 항목

- 도서 제목
- 작가 이름
- 내용

---

### CreateImageForm.jsx

도서 등록 시 표지 이미지 미리보기 및 등록 버튼을 담당합니다.

#### 주요 기능

- API Key 입력
- 이미지 품질 선택
- 이미지 미리보기 생성
- 등록하기 버튼
- 신규 도서 객체 생성

---

### Update.jsx

도서 수정 화면의 진입 컴포넌트입니다.

#### 역할

- URL의 `id` 확인
- `/books/:id` 상세 데이터 요청
- `UpdateForm`에 기존 도서 데이터 전달

---

### UpdateForm.jsx

도서 수정 폼의 전체 레이아웃과 상태를 담당합니다.

```text
UpdateForm.jsx
├─ InputInfo.jsx
├─ UpdateImageControls.jsx
└─ UpdateImagePreview.jsx
```

#### 주요 기능

- 기존 제목 / 작가 / 내용 반영
- 기존 이미지 표시
- 이미지 재생성
- 수정 완료 시 수정 데이터 전달

---

### UpdateImageControls.jsx

수정 화면의 이미지 관련 입력 및 버튼 영역을 담당합니다.

#### 기능

- API Key 입력
- 품질 선택
- 이미지 미리보기 버튼
- 수정 완료 버튼
- 취소 버튼

---

### UpdateImagePreview.jsx

수정 화면의 이미지 미리보기 카드를 담당합니다.

#### 기능

- 기존 이미지 표시
- 생성된 이미지 표시
- 이미지 경로 정규화 처리

---

## 10. 이미지 생성 기능

### 현재 구조

현재는 React 프론트엔드에서 OpenAI Images API를 직접 호출하는 구조입니다.

```text
React
→ OpenAI Images API
→ base64 image
→ coverImageUrl state 저장
→ 등록/수정 시 json-server에 저장
```

### 등록 화면 이미지 흐름

```text
이미지 미리보기 클릭
→ OpenAI API 요청
→ 성공 시 coverImageUrl에 base64 이미지 저장
→ 실패 시 error.png 표시

등록하기 클릭
→ 현재 coverImageUrl을 포함하여 POST /books
```

### 수정 화면 이미지 흐름

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

### 이미지 상태값

| 이미지 | 용도 |
|---|---|
| `/test_src/01.png` | 샘플 이미지 |
| `/noImage.jpg` | 이미지 없음 기본 이미지 |
| `/test_src/loading.gif` | 이미지 생성 중 상태 표시 |
| `/test_src/error.png` | 이미지 생성 실패 상태 표시 |
| `data:image/png;base64,...` | OpenAI가 생성한 실제 이미지 |

### 저장 시 주의사항

`loading.gif`와 `error.png`는 상태 표시용 이미지입니다.  
등록 또는 수정 저장 시에는 실제 생성 이미지 또는 기본 이미지(`/noImage.jpg`)가 저장되는 것이 바람직합니다.

권장 처리:

```text
error.png 상태에서 저장
→ /noImage.jpg 저장
```

---

## 11. 이미지 경로 처리

React Router 환경에서는 `/update/:id`처럼 중첩 경로에서 상대 이미지 경로가 깨질 수 있습니다.

예를 들어 다음 경로는 문제가 될 수 있습니다.

```text
./test_src/01.png
```

라우팅 환경에서는 다음처럼 public 기준 절대 경로를 사용하는 것이 안전합니다.

```text
/test_src/01.png
```

Update 화면에서는 이미지 경로 정규화 로직을 통해 다음과 같이 처리합니다.

```text
./test_src/01.png
→ /test_src/01.png
```

---

## 12. 에러 및 빈 상태 처리

### 로딩 상태

도서 데이터를 불러오는 중에는 로딩 문구를 표시합니다.

```text
불러오는 중...
```

### 에러 상태

데이터 요청 실패 시 에러 문구를 표시합니다.

```text
에러: 데이터를 불러오지 못했어요.
```

### 빈 상태

| 화면 | 상황 | 문구 |
|---|---|---|
| List | 등록된 도서 없음 | 등록된 도서가 없습니다. |
| List | 검색 결과 없음 | 검색 결과가 없습니다. |
| Home | 인기 도서 없음 | 등록된 도서가 없습니다. |

---

## 13. 최종 요약

Book Archive는 React와 json-server를 기반으로 한 도서관리 시스템입니다.  
도서 목록 조회, 검색, 상세 확인, 등록, 수정, 삭제, 좋아요, 조회수 기능을 제공하며, 도서 표지 이미지 미리보기 및 재생성 기능을 포함합니다.

Create 화면에서는 이미지 미리보기와 등록 기능을 분리해 사용자가 의도하지 않은 등록을 방지했고, Update 화면에서는 Create 스타일을 재사용하여 기존 도서 정보와 표지 이미지를 수정할 수 있도록 구성했습니다.  
또한 도서 없음, 검색 결과 없음, 인기 도서 없음과 같은 빈 상태 안내를 추가해 사용자 경험을 개선했습니다.
