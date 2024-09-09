interface DetailGuide {
  instruction: string;
}

const DetailGuide: React.FC<DetailGuide> = ({ instruction }) => {
  const lines = instruction.split('-').filter((line) => line.trim() !== '');

  return (
    <div className='col pb-[30px]'>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>이용안내</p>
      </div>

      <p className='text-[12px]'>
        {lines.map((line, index) => (
          <p key={index}>- {line.trim()}</p>
        ))}
      </p>
    </div>
  );
};

export default DetailGuide;
