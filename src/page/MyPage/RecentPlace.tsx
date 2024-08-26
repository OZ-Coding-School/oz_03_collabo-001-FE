import useModalWithURL from '../../hooks/useModalWithURL';
import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';
import PlaceFilterModal from '../../components/modal/PlaceFilterModal';

const RecentPlace = () => {
  const { isOpen, openModal, closeModal } = useModalWithURL('recentModal');

  return (
    <div className='col'>
      <MoreTitle title='최근 본 장소' openModal={openModal} />
      <div className='gap-4px flex justify-between pb-[30px]'>
        <Place placeId='4' />
        <Place placeId='5' />
        <Place placeId='6' />
      </div>
      {isOpen && (
        <PlaceFilterModal title='최근 본 장소' closeModal={closeModal} />
      )}
    </div>
  );
};

export default RecentPlace;
