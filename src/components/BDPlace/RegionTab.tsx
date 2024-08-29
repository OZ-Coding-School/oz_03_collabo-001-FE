import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Place6 from './Place6';

interface TabsType {
  id: string;
  subcategory?: string;
  region?: string;
}

interface RegionListType {
  id: string;
  region: string;
}

interface TabProps {
  tabs: TabsType[];
  current: string;
  section: string;
  regionList: RegionListType[];
}

const RegionTab: React.FC<TabProps> = ({
  tabs,
  current,
  section,
  regionList,
}) => {
  const [strTabs, setStrTabs] = useState<string[]>([]);
  const [tabId, setTabId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(strTabs[0]);

  const handleTabRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  useEffect(() => {
    setStrTabs(
      tabs
        .map((tab) => (section === 'region' ? tab.region : tab.subcategory))
        .filter((tab): tab is string => tab !== undefined)
    );
  }, [section, tabs]);

  useEffect(() => {
    setSelectedTab(strTabs[0]);
  }, [current, strTabs]);
  useEffect(() => {
    const foundItem = tabs.find((item) =>
      section === 'region'
        ? item.region === selectedTab
        : item.subcategory === selectedTab
    );
    setTabId(foundItem ? foundItem.id : '');
  }, [section, selectedTab, tabs]);

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
                'flex h-[20px] w-[65px] items-center justify-center rounded-full border-[1px] border-border bg-[white] text-[10px] text-caption',
                selectedTab === tab && 'border-0 bg-primary text-[white]'
              )}
            >
              {tab}
            </div>
          </label>
        ))}
      </div>
      <Place6
        current={current}
        currentTab={tabId}
        section={section}
        regionList={regionList}
      />
    </div>
  );
};

export default RegionTab;
