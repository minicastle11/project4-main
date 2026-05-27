# 프론트엔드 구조

## 1. 전체 구조

현재 저장소는 Vite + React 기반 SPA로 구성되어 있습니다.

```text
project4-main/
├─ db.json
├─ package.json
├─ README.md
├─ docs/
├─ public/
├─ test_src/
└─ src/
   ├─ components/
   │  ├─ Header.jsx
   │  ├─ Lower.jsx
   │  ├─ InputInfo.jsx
   │  ├─ Dropdown.jsx
   │  ├─ MaskedApiKeyInput.jsx
   │  ├─ CreateForm.jsx
   │  ├─ CreateImageForm.jsx
   │  ├─ CreateImagePreview.jsx
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

> 현재 코드 기준으로 `api_mid_server.js`는 필수 프론트엔드 구조에 포함하지 않습니다. AI 이미지는 등록/수정 컴포넌트에서 OpenAI Images API를 직접 호출합니다.

---

## 2. App.jsx

앱 전체 상태와 라우팅을 담당합니다.

### 주요 상태

- `books`: 도서 목록 상태
- `query`: 목록 검색어 상태
- `loading`: 초기 데이터 로딩 상태
- `error`: 오류 상태

### 주요 함수

- `handleAddBook`: 도서 등록
- `handleUpdateBook`: 도서 수정
- `handleDelete`: 도서 삭제
- `handleLike`: 좋아요 증가
- `handleView`: 조회수 증가

### 주요 라우트

| Route | 화면 |
|---|---|
| `/` | Home |
| `/list` | List |
| `/create` | Create |
| `/update/:id` | Update |

---

## 3. views/Home.jsx

Home 화면을 담당합니다.

### 역할

- 서비스 메인 화면 표시
- 인기 도서 목록 표시
- 좋아요 기준 정렬
- 도서 없음 안내 표시

---

## 4. views/List.jsx

도서 목록 화면을 담당합니다.

### 역할

- 도서 목록 렌더링
- 검색 필터링 결과 표시
- 상세보기 모달 표시
- 삭제/좋아요/조회수/수정 이동 처리

---

## 5. views/Create.jsx

도서 등록 화면의 진입 컴포넌트입니다.

```text
Create.jsx
→ CreateForm.jsx
```

### 역할

- `CreateForm` 렌더링
- 등록 완료 또는 취소 시 목록 화면 이동 흐름 연결

---

## 6. components/CreateForm.jsx

도서 등록 폼의 전체 레이아웃과 입력 상태를 담당합니다.

```text
CreateForm.jsx
├─ InputInfo.jsx
└─ CreateImageForm.jsx
```

### 주요 상태

- `title`
- `author`
- `content`
- `quality`
- `coverImageUrl`

---

## 7. components/InputInfo.jsx

Create와 Update에서 공통으로 사용하는 도서 정보 입력 컴포넌트입니다.

### 입력 항목

- 도서 제목
- 작가 이름
- 내용

---

## 8. components/CreateImageForm.jsx

도서 등록 시 이미지 생성, 이미지 미리보기, 등록 버튼을 담당합니다.

### 주요 기능

- API Key 입력 UI
- 이미지 품질 선택
- 이미지 크기 선택
- 이미지 생성 비용 안내
- OpenAI Images API 직접 호출
- base64 Data URL 미리보기
- 등록 시 신규 도서 객체 생성
- 필수 입력값 검증

### 현재 이미지 저장 흐름

```text
OpenAI 응답 b64_json
→ data:image/png;base64,... 변환
→ coverImageUrl 상태 저장
→ 등록 시 db.json에 저장
```

---

## 9. views/Update.jsx

도서 수정 화면의 진입 컴포넌트입니다.

### 역할

- URL의 `id` 확인
- `/books/:id` 상세 데이터 요청
- `UpdateForm`에 기존 도서 데이터 전달
- 수정 완료 후 목록 화면으로 이동

---

## 10. components/UpdateForm.jsx

도서 수정 폼의 전체 레이아웃과 상태를 담당합니다.

```text
UpdateForm.jsx
├─ InputInfo.jsx
├─ UpdateImageControls.jsx
└─ UpdateImagePreview.jsx
```

### 주요 기능

- 기존 제목/작가/내용 반영
- 기존 이미지 표시
- 이미지 재생성
- 수정 완료 시 수정 데이터 전달

---

## 11. components/UpdateImageControls.jsx

수정 화면의 이미지 관련 입력 및 버튼 영역을 담당합니다.

### 기능

- API Key 입력
- 품질 선택
- 이미지 생성 버튼
- 수정 완료 버튼
- 취소 버튼

---

## 12. components/UpdateImagePreview.jsx

수정 화면의 이미지 미리보기 카드를 담당합니다.

### 기능

- 기존 이미지 표시
- 생성된 이미지 표시
- 이미지 경로 정규화 처리

---

## 13. components/Header.jsx

상단 내비게이션을 담당합니다.

### 역할

- Home, 목록, 등록 화면으로 이동할 수 있는 공통 헤더 제공
- 전체 페이지에서 동일한 내비게이션 경험 제공

---

## 14. components/Lower.jsx

하단 영역을 담당하는 공통 컴포넌트입니다.

### 역할

- 전체 페이지 하단 UI 구성
- `App.jsx`에서 Header와 함께 공통 레이아웃으로 사용

---

## 15. 데이터 흐름

### 도서 CRUD 흐름

```text
App.jsx
→ fetch http://localhost:3000/books
→ json-server
→ db.json
→ React 상태 업데이트
→ 화면 반영
```

### AI 이미지 생성 흐름

```text
CreateImageForm.jsx 또는 UpdateForm.jsx
→ 사용자가 API Key 입력
→ OpenAI Images API 호출
→ b64_json 응답 수신
→ Data URL 변환
→ coverImageUrl 상태 반영
→ 등록/수정 시 json-server 저장
```

---

## 16. 실행 시 필요한 서버

```bash
npm run dev
```

```bash
npx json-server@0.17.4 --watch db.json --port 3000
```

현재 문서 기준으로 별도 미들웨어 서버 실행 명령은 제외합니다.
