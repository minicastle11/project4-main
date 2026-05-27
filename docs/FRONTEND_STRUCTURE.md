# 프론트엔드 구조

## 1. 전체 구조

```text
project4-main/
├─ api_mid_server.js
├─ db.json
├─ package.json
├─ README.md
├─ docs/
└─ src/
   ├─ components/
   │  ├─ Header.jsx
   │  ├─ InputInfo.jsx
   │  ├─ Dropdown.jsx
   │  ├─ MaskedApiKeyInput.jsx
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
- 검색 필터링
- 상세보기 모달 표시
- 삭제/좋아요/조회수/수정 이동 처리

---

## 5. views/Create.jsx

도서 등록 화면의 진입 컴포넌트입니다.

```text
Create.jsx
→ CreateForm.jsx
```

---

## 6. components/CreateForm.jsx

도서 등록 폼의 전체 레이아웃을 담당합니다.

```text
CreateForm.jsx
├─ InputInfo.jsx
└─ CreateImageForm.jsx
```

---

## 7. components/InputInfo.jsx

Create와 Update에서 공통으로 사용하는 입력 컴포넌트입니다.

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
- 이미지 크기 옵션 개선 예정
- 이미지 생성 비용 안내
- 이미지 생성 요청
- base64 Data URL 미리보기
- 등록 시 신규 도서 객체 생성

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

## 13. api_mid_server.js와 프론트엔드 관계

`api_mid_server.js`는 프론트엔드 컴포넌트는 아니지만, AI 이미지 생성 기능이 정상 동작하기 위해 필요한 Node/Express 미들웨어 서버입니다.

### 역할

- `.env`의 `OPENAI_API_KEY` 로드
- OpenAI Images API 호출 대행
- 프론트엔드에 OpenAI API Key가 직접 노출되는 문제 완화

### 실행

```bash
node api_mid_server.js
```

---
