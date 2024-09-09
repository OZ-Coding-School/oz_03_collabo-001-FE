import BgImage from '../../assets/Images/starfield.png';

const BDStoryItem = () => {
  return (
    <div className='relative min-h-[180px] min-w-[180px] overflow-clip rounded-[5px] border border-border'>
      <img src={BgImage} alt='' className='h-full w-full object-cover' />
      <div className='absolute bottom-0 left-0 right-0 justify-between truncate text-nowrap bg-[#00000050] p-2 text-[white]'>
        <p className='truncate text-[0.9rem] font-bold'>
          {'가보니 너무 좋아 추천해요!'}
        </p>
        <p className='truncate text-nowrap text-[0.8rem] text-tag'>
          {'오늘 저희 아가들이랑 댕댕이랑 가보니 너무 좋았어요'}
        </p>
      </div>
    </div>
  );
};

export default BDStoryItem;
