import more from '../../assets/More.svg';

interface MoreTitleProps {
  title: string;
}

const MoreTitle: React.FC<MoreTitleProps> = ({ title }) => {
  return (
    <div className='cardTitle flex items-center justify-between'>
      <p className='font-semibold'>{title}</p>
      <button type='button' aria-label={`${title} 더보기`}>
        <img src={more} alt='더보기 아이콘' aria-hidden />
      </button>
    </div>
  );
};

export default MoreTitle;
