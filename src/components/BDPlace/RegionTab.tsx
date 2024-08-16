import { useState } from 'react';

const RegionTab = () => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const handleRegionRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDown(e.target.checked);
  };

  return (
    // 가져온 지역정보 배열을 현재 컴포넌트 안에서 map으로 돌릴 계획
    <label>
      <input
        type='radio'
        onChange={handleRegionRadio}
        checked={isDown}
        className=''
      />
      <div
        className={`flex h-[4vh] w-[13vh] items-center justify-center rounded-full ${isDown ? 'bg-primary text-[white]' : 'border-2 border-border bg-[white] text-caption'}`}
      >
        {'전체'}
      </div>
    </label>
  );
};

export default RegionTab;
