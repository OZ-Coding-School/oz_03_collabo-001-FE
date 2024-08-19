import BgImage from '../../assets/images/starfield.png';

const BDStoryItem = () => {
  return (
    <div
      className='mb-[8px] flex h-[180px] w-[180px] flex-col-reverse overflow-clip rounded-[5PX] border border-border'
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* <img src={BgImage} alt='' className='h-full w-full object-cover' /> */}
      <div className='flex flex-col justify-between truncate text-nowrap bg-[#00000050] p-2 text-[white]'>
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
