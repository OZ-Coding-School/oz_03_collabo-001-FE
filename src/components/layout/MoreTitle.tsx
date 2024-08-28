import useModalWithURL from '../../hooks/useModalWithURL';
import more from '../../assets/More.svg';
import PlaceHomeFilter from '../PlaceFilter/PlaceFilter';
import BookMarkModal from '../modal/BookmarkModal';
import MyGPS from '../MyGPS';

interface MoreTitleProps {
  title: string;
  gps?: boolean;
}

const MoreTitle: React.FC<MoreTitleProps> = ({ title, gps = false }) => {
  let modalName = '';
  let ModalComponent = null;

  if (title.includes('지역별') || title.includes('장소별')) {
    modalName = 'bdplace';
    ModalComponent = PlaceHomeFilter;
  } else if (title === '나만의 북마크') {
    modalName = 'myBookmarkModal';
    ModalComponent = BookMarkModal;
  } else if (title === '최근 본 장소') {
    modalName = 'recentModal';
    ModalComponent = BookMarkModal;
  }

  const { isOpen, openModal, closeModal } = useModalWithURL(modalName);

  return (
    <>
      <div className='colTitle flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <p className='font-semibold'>{title}</p>
          {gps && <MyGPS />}
        </div>
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
