import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabProps {
  tabs: string[];
  current: string;
}

const RegionTab: React.FC<TabProps> = ({ tabs, current }) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const handleTabRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  useEffect(() => {
    setSelectedTab(tabs[0]);
  }, [current, tabs]);

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
            className={twMerge(
              'flex h-[20px] w-[65px] items-center justify-center rounded-full border-[1px] border-border bg-[white] text-[10px] text-caption',
              selectedTab === tab && 'border-0 bg-primary text-[white]'
            )}
          >
            {tab}
          </div>
        </label>
      ))}
    </div>
  );
};

export default RegionTab;
