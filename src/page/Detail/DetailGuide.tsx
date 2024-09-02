interface DetailGuide {
  instruction: string;
}

const DetailGuide: React.FC<DetailGuide> = ({ instruction }) => {
  return (
    <div className='col pb-[30px]'>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>이용안내</p>
      </div>

      <p className='text-[12px]'>{instruction}</p>
    </div>
  );
};

export default DetailGuide;
