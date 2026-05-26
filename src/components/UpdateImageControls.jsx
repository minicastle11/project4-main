import Dropdown from './Dropdown'

function UpdateImageControls({
  apiKey,
  setApiKey,
  quality,
  setQuality,
  loading,
  onPreview,
  onSubmit,
  onCancel,
}) {
  return (
    <>
      <label>
        api키
        <input
          value={apiKey}
          placeholder="api키"
          onChange={(e) => setApiKey(e.target.value)}
        />
      </label>

      <div className="create-quality-group">
        <p>품질</p>
        <Dropdown value={quality} onChange={setQuality} />
      </div>

      <div className="create-action-row">
        <button
          type="button"
          className="create-preview-button"
          onClick={onPreview}
          disabled={loading}
        >
          {loading ? '이미지 생성 중...' : '이미지 미리보기'}
        </button>

        <button
          type="button"
          className="create-submit-button"
          onClick={onSubmit}
        >
          수정 완료
        </button>

        <button
          type="button"
          className="create-preview-button"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </>
  )
}

export default UpdateImageControls