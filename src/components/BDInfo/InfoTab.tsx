import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabsType {
  id: string;
  tab: string;
}

interface Props {
  tabs: TabsType[];
}

const InfoTab: React.FC<Props> = ({ tabs }) => {
  const [strTabs, setStrTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(strTabs[0]);

  const handleTabRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  useEffect(() => {
    setStrTabs(
      tabs
        .map((tab) => tab.tab)
        .filter((tab): tab is string => tab !== undefined)
    );
  }, [tabs]);

  useEffect(() => {
    setSelectedTab(strTabs[0]);
  }, [strTabs]);

  return (
    <div>
      <div className='flex flex-wrap gap-[6px] py-2'>
        {strTabs.map((tab) => (
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
                'flex h-[20px] items-center justify-center rounded-full border-[1px] border-border bg-[white] px-2 text-[10px] text-caption',
                selectedTab === tab && 'border-0 bg-primary text-[white]'
              )}
            >
              {tab}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InfoTab;
