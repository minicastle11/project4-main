# 프론트엔드 구조

## 전체 구조

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

## App.jsx

앱 전체 상태와 라우팅을 담당합니다.

### 주요 상태

- `books`
- `query`
- `loading`
- `error`

### 주요 함수

- `handleAddBook`
- `handleUpdateBook`
- `handleDelete`
- `handleLike`
- `handleView`

## views/Home.jsx

Home 화면을 담당합니다.

### 역할

- 인기 도서 목록 표시
- 좋아요 기준 정렬
- 도서 없음 안내 표시

## views/List.jsx

도서 목록 화면을 담당합니다.

### 역할

- 도서 목록 렌더링
- 검색 필터링
- 상세 모달 표시
- 삭제 / 좋아요 / 조회수 / 수정 이동 처리

## views/Create.jsx

도서 등록 화면의 진입 컴포넌트입니다.

```text
Create.jsx
→ CreateForm.jsx
```

## components/CreateForm.jsx

도서 등록 폼의 전체 레이아웃을 담당합니다.

```text
CreateForm.jsx
├─ InputInfo.jsx
└─ CreateImageForm.jsx
```

## components/InputInfo.jsx

Create와 Update에서 공통으로 사용하는 입력 컴포넌트입니다.

### 입력 항목

- 도서 제목
- 작가 이름
- 내용

## components/CreateImageForm.jsx

도서 등록 시 표지 이미지 미리보기 및 등록 버튼을 담당합니다.

### 주요 기능

- API Key 입력
- 이미지 품질 선택
- 이미지 미리보기 생성
- 등록하기 버튼
- 등록 시 신규 도서 객체 생성

## views/Update.jsx

도서 수정 화면의 진입 컴포넌트입니다.

### 역할

- URL의 `id` 확인
- `/books/:id` 상세 데이터 요청
- `UpdateForm`에 기존 도서 데이터 전달

## components/UpdateForm.jsx

도서 수정 폼의 전체 레이아웃과 상태를 담당합니다.

```text
UpdateForm.jsx
├─ InputInfo.jsx
├─ UpdateImageControls.jsx
└─ UpdateImagePreview.jsx
```

### 주요 기능

- 기존 제목 / 작가 / 내용 반영
- 기존 이미지 표시
- 이미지 재생성
- 수정 완료 시 수정 데이터 전달

## components/UpdateImageControls.jsx

수정 화면의 이미지 관련 입력 및 버튼 영역을 담당합니다.

### 기능

- API Key 입력
- 품질 선택
- 이미지 미리보기 버튼
- 수정 완료 버튼
- 취소 버튼

## components/UpdateImagePreview.jsx

수정 화면의 이미지 미리보기 카드를 담당합니다.

### 기능

- 기존 이미지 표시
- 생성된 이미지 표시
- 이미지 경로 정규화 처리

## 이미지 경로 처리

상대 경로 문제를 방지하기 위해 다음과 같은 처리가 필요합니다.

```text
./test_src/01.png
→ /test_src/01.png
```

React Router 환경에서는 `/update/:id` 같은 경로에서 상대 경로 이미지가 깨질 수 있으므로, public 폴더 기준 절대 경로 사용이 권장됩니다.
