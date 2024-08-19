const FILTER_AREA = [
  "서울",
  "경기",
  "인천",
  "강원",
  "대전",
  "세종",
  "충청남",
  "충청북",
  "대구",
  "경상북",
  "부산",
  "울산",
  "경상남",
  "광주",
  "전라남도",
  "전라북도",
  "제주",
];

export const AreaModal = ({
  setIsAreaModal,
  setArea,
  handleFilterChange,
  setActiveFilter,
}: any) => {
  function handleAreaClick(area: string) {
    setArea(area);
    setIsAreaModal(false);
    setActiveFilter(area);
    handleFilterChange({ label: area, filter: area });
  }
  return (
    <div className="absolute border w-40 h-52 top-10 left-16 z-50 p-3 overflow-y-scroll bg-white rounded-md">
      <ul>
        {FILTER_AREA.map((area, index) => (
          <li key={index} className="py-1">
            <button onClick={() => handleAreaClick(area)}>{area}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
