import useModalWithURL from '../../hooks/useModalWithURL';
import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';
import PlaceFilterModal from '../../components/modal/PlaceFilterModal';

const MyBookmark = () => {
  const { isOpen, openModal, closeModal } = useModalWithURL('myBookmarkModal');

  return (
    <div className='col'>
      <MoreTitle title='나만의 북마크' openModal={openModal} />
      <div className='gap-4px flex justify-between pb-[30px]'>
        <Place placeId='1' /> {/* 각 Place 컴포넌트에 고유 ID를 부여 */}
        <Place placeId='2' />
        <Place placeId='3' />
      </div>
      {isOpen && (
        <PlaceFilterModal title='나만의 북마크' closeModal={closeModal} />
      )}
    </div>
  );
};

export default MyBookmark;
