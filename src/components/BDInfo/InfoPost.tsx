const InfoPost = () => {
  return (
    <div className='flex h-[49px] w-full items-center justify-between'>
      <div>
        <div className='flex flex-nowrap items-center text-xs font-semibold'>
          <p className='mr-1 text-primary'>Q.</p>
          <p className='mr-2 max-w-[210px] truncate'>
            강아지털 이대로 괜찮을까요?
          </p>
          <p className='w-max-[49px] flex h-[12px] items-center justify-center rounded-[5px] border border-nav p-1 text-[7px] text-nav'>
            답변완료
          </p>
          <p className='flex h-[16px] w-[39px] items-center justify-center bg-[#F6821F30] text-[7px] text-primary'>
            질문있어요
          </p>
        </div>
        <div className='mt-1 flex gap-2 text-[8px]'>
          <p>글쓴이</p>
          <p className='text-caption'>1시간전</p>
        </div>
      </div>
      <div className='flex h-[25px] w-[23px] flex-col items-center rounded-md bg-border text-[8px]'>
        <p className='font-semibold'>3</p>
        <p>댓글</p>
      </div>
    </div>
  );
};

export default InfoPost;
