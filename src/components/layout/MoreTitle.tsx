import more from '../../assets/More.svg';

interface MoreTitleProps {
  title: string;
  openModal?: () => void;
}

const MoreTitle: React.FC<MoreTitleProps> = ({ title, openModal }) => {
  return (
    <div className='colTitle flex items-center justify-between'>
      <p className='font-semibold'>{title}</p>
      <button type='button' aria-label={`${title} 더보기`} onClick={openModal}>
        <img src={more} alt='더보기 아이콘' aria-hidden />
      </button>
    </div>
  );
};

export default MoreTitle;
