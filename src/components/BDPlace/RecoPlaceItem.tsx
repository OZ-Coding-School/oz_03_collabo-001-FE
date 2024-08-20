// import { twMerge } from 'tailwind-merge';

const TagItem = ({ text }: { text: string }) => {
  return (
    <li className='h-[20px] rounded-sm border border-border bg-background px-[4px] text-[11px]'>
      {text}
    </li>
  );
};

const RecoPlaceItem = () => {
  return (
    <div className='flex items-center rounded-[10px] border-2 border-background p-[10px]'>
      <div className='imgWrap h-[80px] w-[80px] overflow-hidden rounded-[10px] bg-background'></div>
      <div className='ml-[12px]'>
        <p className='text-[15px] font-bold'>
          <span className='text-primary'>&#91;서울&#93;</span>
          <span className='ml-[5px]'>마포오션플레이스</span>
        </p>
        <p className='text-[12px] text-caption'>
          국내 최초! 단독형 개별 글램핑펜션!
        </p>
        <ul className='tags mt-[5px] flex gap-[6px]'>
          <TagItem text='1~3세' />
          <TagItem text='플레이스' />
          <TagItem text='대형견 가능' />
        </ul>
      </div>
    </div>
  );
};

export default RecoPlaceItem;
