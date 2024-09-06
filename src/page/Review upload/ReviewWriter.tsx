import userImage from '../../assets/images/starfield.png';
const ReviewWriter = () => {
  return (
    <div className='flex h-[80px] w-full items-center bg-[white] p-4'>
      <img
        src={userImage}
        alt=''
        className='h-[66px] w-[66px] rounded-full object-cover'
      />
      <p className='ml-4'>{'작성자 이름'}</p>
    </div>
  );
};

export default ReviewWriter;
