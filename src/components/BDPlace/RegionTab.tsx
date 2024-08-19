import { useState } from 'react';

interface TabProps {
  tabs: string[];
}

const RegionTab: React.FC<TabProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const handleTabRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  return (
    <div className='flex flex-wrap gap-[6px]'>
      {tabs.map((tab) => (
        <label key={tab}>
          <input
            type='radio'
            value={tab}
            onChange={handleTabRadio}
            checked={selectedTab === tab}
            className='hidden'
          />
          <div
            className={`flex h-[20px] w-[65px] items-center justify-center rounded-full text-[10px] ${selectedTab === tab ? 'bg-primary text-[white]' : 'border-[1px] border-border bg-[white] text-caption'}`}
          >
            {tab}
          </div>
        </label>
      ))}
    </div>
  );
};

export default RegionTab;
