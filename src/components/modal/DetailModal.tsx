/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import ReactDOM from 'react-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import useModalWithURL from '../../hooks/useModalWithURL';
import useFetchPlaceData from '../../hooks/useFetchPlaceData';
import { GoChevronLeft } from 'react-icons/go';
import { ImPlus } from 'react-icons/im';
import Banner from '../../page/Home/Banner';
import ShopSimpleData from '../../page/Detail/ShopSimpleData';
import ShopDetailData from '../../page/Detail/ShopDetailData';
import ShopInfoData from '../../page/Detail/ShopInfoData';
import DetailTopNav from '../../page/Detail/DetailTopNav';
import DetailContent from '../../page/Detail/DetailContent';
import ReviewPictures from '../../page/Detail/ReviewPictures';
import ReviewList from '../../page/Detail/ReviewList';
import DetailGuide from '../../page/Detail/DetailGuide';
import ReviewUpload from '../../page/Review upload/ReviewUpload';
import ShareBtn from '../ShareBtn';

const NAV_HEIGHT = 48;

interface DetailModalProps {
  closeModal: () => void;
  placeId: number;
}

const DetailModal: React.FC<DetailModalProps> = ({ closeModal, placeId }) => {
  const { placeData, loading, error } = useFetchPlaceData(placeId);
  const { isOpen, openThirdModal } = useModalWithURL(`ReviewUpload`);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const modalContentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const [contentScrollTop, setContentScrollTop] = useState<number>(0);
  const [reviewScrollTop, setReviewScrollTop] = useState<number>(0);
  const [guideScrollTop, setGuideScrollTop] = useState<number>(0);
  const [, setIsContentExpanded] = useState<boolean>(false);

  const updateScrollPositions = useCallback(() => {
    if (
      contentRef.current &&
      reviewRef.current &&
      guideRef.current &&
      modalContentRef.current
    ) {
      setContentScrollTop(
        contentRef.current.getBoundingClientRect().top +
          modalContentRef.current.scrollTop -
          NAV_HEIGHT
      );
      setReviewScrollTop(
        reviewRef.current.getBoundingClientRect().top +
          modalContentRef.current.scrollTop -
          NAV_HEIGHT
      );
      setGuideScrollTop(
        guideRef.current.getBoundingClientRect().top +
          modalContentRef.current.scrollTop -
          NAV_HEIGHT
      );
    }
  }, []);

  //
  useEffect(() => {
    if (placeData) {
      updateScrollPositions();
      window.addEventListener('resize', updateScrollPositions);

      if (modalContentRef.current) {
        modalContentRef.current.addEventListener(
          'scroll',
          updateScrollPositions
        );
      }

      return () => {
        window.removeEventListener('resize', updateScrollPositions);
        if (modalContentRef.current) {
          modalContentRef.current.removeEventListener(
            'scroll',
            updateScrollPositions
          );
        }
      };
    }
  }, [updateScrollPositions, placeData]);

  const handleContentExpandChange = (expanded: boolean) => {
    setIsContentExpanded(expanded);
  };

  if (loading) {
    return ReactDOM.createPortal(
      <div className='detailModal h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
        <div className='bg-white py-4 text-center text-[14px] text-caption'>
          데이터 가져오는 중...
        </div>
      </div>,
      modalRoot
    );
  }

  if (error) {
    return ReactDOM.createPortal(
      <div className='detailModal h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
        <div className='bg-white py-4 text-center text-[14px] text-caption'>
          데이터를 가져오던 중 에러가 발생했습니다.
        </div>
      </div>,
      modalRoot
    );
  }

  if (!placeData) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='detailModal h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <div
        className='h-[100vh] w-[400px] overflow-y-auto overflow-x-hidden'
        ref={modalContentRef}
      >
        <div className='flex h-[48px] items-center justify-between bg-white px-2'>
          <button
            onClick={closeModal}
            className='mr-[8px] font-extrabold'
            aria-label='닫기'
          >
            <GoChevronLeft className='text-[24px] opacity-[70%]' />
          </button>
          <ShareBtn />
        </div>

        <div className='flex flex-col gap-[15px]'>
          <div>
            <Banner bannerImgs={placeData.bannerImgs} />
            <ShopSimpleData
              name={placeData.name}
              address={placeData.address}
              rating={placeData.rating}
              is_bookmarked={placeData.isBookmark}
              storeImage={placeData.storeImage}
              placeId={placeData.id}
            />
            <ShopDetailData
              tags={placeData.tags}
              address={placeData.address}
              price={placeData.price}
              link={placeData.link}
            />
            <ShopInfoData placeInfoMenu={placeData.serviceIcons} />
          </div>
          <div>
            <DetailTopNav
              contentScrollTop={contentScrollTop}
              reviewScrollTop={reviewScrollTop}
              guideScrollTop={guideScrollTop}
              containerRef={modalContentRef}
              reviewCount={placeData.reviewCount}
            />
            <div className='flex flex-col gap-[15px]'>
              <div ref={contentRef}>
                <DetailContent
                  onExpandChange={handleContentExpandChange}
                  contentImgs={placeData.contentImgs}
                />
              </div>
              <div ref={reviewRef}>
                <ReviewPictures placeId={placeId} />
                <ReviewList
                  placeId={placeId}
                  reviewCount={placeData.reviewCount}
                />
              </div>
              <div ref={guideRef}>
                <DetailGuide instruction={placeData.instruction} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        aria-label='후기 작성하기'
        style={{ right: 'calc(50% - 170px)' }}
        className='fixed bottom-[25px] flex h-[38px] w-[38px] items-center justify-center rounded-full bg-primary'
        onClick={() => {
          openThirdModal();
        }}
      >
        <ImPlus className='text-white' />
      </button>
      {isOpen && <ReviewUpload closeModal={closeModal} placeId={placeId} />}
    </div>,
    modalRoot
  );
};

export default DetailModal;
