import MoreTitle from '../../components/layout/MoreTitle';

const ReviewPictures = () => {
  return (
    <div>
      <MoreTitle title='사진모아보기' />
      <div className='flex justify-between'>
        <div className='imgWrap h-[115px] w-[115px] rounded-[10px] border-2 border-border bg-background'></div>
        <div className='imgWrap h-[115px] w-[115px] rounded-[10px] border-2 border-border bg-background'></div>
        <div className='imgWrap h-[115px] w-[115px] rounded-[10px] border-2 border-border bg-background'></div>
      </div>
    </div>
  );
};

export default ReviewPictures;
