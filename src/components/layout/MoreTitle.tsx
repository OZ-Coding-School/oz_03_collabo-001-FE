import useModalWithURL from '../../hooks/useModalWithURL';
import more from '../../assets/More.svg';
import PlaceHomeFilter from '../PlaceFilter/PlaceFilter';
import PlaceListModal from '../modal/PlaceListModal';

interface MoreTitleProps {
  title: string;
}

const MoreTitle: React.FC<MoreTitleProps> = ({ title }) => {
  let modalName = '';
  let ModalComponent = null;

  switch (title) {
    case '지역별 애개플레이스':
      modalName = 'bdplace';
      ModalComponent = PlaceHomeFilter;
      break;
    case '나만의 북마크':
      modalName = 'myBookmarkModal';
      ModalComponent = PlaceListModal;
      break;
    case '최근 본 장소':
      modalName = 'recentModal';
      ModalComponent = PlaceListModal;
      break;
    default:
      modalName = '';
      ModalComponent = null;
  }

  const { isOpen, openModal, closeModal } = useModalWithURL(modalName);

  return (
    <>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>{title}</p>
        <button
          type='button'
          aria-label={`${title} 더보기`}
          onClick={openModal}
        >
          <img src={more} alt='더보기 아이콘' aria-hidden />
        </button>
      </div>

      {isOpen && ModalComponent && (
        <ModalComponent title={title} closeModal={closeModal} />
      )}
    </>
  );
};

export default MoreTitle;
