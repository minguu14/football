export const Recruitment = () => {
  return (
    <main className="w-[90%] mx-auto">
    <form
      className="w-[800px] mx-auto mt-[90px] flex flex-col"
    >
      <div className="flex flex-col gap-y-5">
        <p className="flex flex-col gap-y-1">
          <label htmlFor="place">경기 장소</label>
          <input
            type="text"
            id="place"
            name="place"
            placeholder="지역과 경기장 이름을 입력해주세요."
            className="border rounded-md w-full p-2"
          />
        </p>
       
        <p className="flex flex-col gap-y-1">
          <label htmlFor="time">경기 시간</label>
          <input
            type="text"
            id="time"
            name="time"
            className="border rounded-md w-full p-2"
          />
        </p>
        <p className="flex flex-col gap-y-1">
          <label htmlFor="time">모집 인원</label>
          <input
            type="text"
            id="personnel"
            name="personnel"
            className="border rounded-md w-full p-2"
          />
        </p>
        <p className="flex flex-col gap-y-1">
          <label htmlFor="introductions">메모</label>
          <textarea
            id="memo"
            name="memo"
            rows={7}
            className="border rounded-md p-2"
          ></textarea>
        </p>
      </div>
      <button className="border rounded-md px-5 py-2 text-white bg-orange-400 mt-5">
        모집
      </button>
    </form>
  </main>
  )
}
