import ReactDOM from 'react-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import useModalWithURL from '../../hooks/useModalWithURL';
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
import ReviewUpload from '../../page/Review/ReviewUpload';
import ShareBtn from '../ShareBtn';

const NAV_HEIGHT = 48; // 고정 NAV의 높이

interface DetailModalProps {
  closeModal: () => void;
  placeId: string;
}

interface PlaceData {
  name: string;
  address: string;
  rating: number;
}

const DetailModal: React.FC<DetailModalProps> = ({ closeModal, placeId }) => {
  // 장소 정보
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  // 후기 갯수
  const [reviewCount, setReviewCount] = useState(0);
  // 데이터 로드 상태 추적
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${placeId}/`
        );
        const response2 = await axios.get(
          `http://127.0.0.1:8000/places/${placeId}/comments/`
          // `http://127.0.0.1:8000/places/comments/2/`
        );
        // console.log(response2.data.length);]
        const fetchedData: PlaceData = {
          name: response.data.name,
          address: response.data.address,
          rating: response.data.rating,
        };

        setPlaceData(fetchedData);
        setReviewCount(response2.data.length);
        setDataFetched(true);
      } catch (error) {
        console.log('error:', error);
      }
    };

    fetchPlaces();
  }, [placeId]);

  // 후기작성 모달
  const { isOpen, openThirdModal } = useModalWithURL(`ReviewUpload`);

  // 스크롤할 컨테이너에 대한 ref
  const modalContentRef = useRef<HTMLDivElement>(null);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null; // modal-root가 존재하지 않으면 렌더링하지 않음

  const contentRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const [contentScrollTop, setContentScrollTop] = useState<number>(0);
  const [reviewScrollTop, setReviewScrollTop] = useState<number>(0);
  const [guideScrollTop, setGuideScrollTop] = useState<number>(0);
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);

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

  useEffect(() => {
    if (dataFetched) {
      // 데이터가 로드된 후에만 실행
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
  }, [updateScrollPositions, dataFetched]);

  const handleContentExpandChange = (expanded: boolean) => {
    setIsContentExpanded(expanded);
  };

  if (!placeData) {
    return ReactDOM.createPortal(
      <div className='detailModal h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
        <p>loading ...</p>
      </div>,
      modalRoot
    );
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
            <Banner />
            <ShopSimpleData
              placeId={placeId}
              name={placeData.name}
              address={placeData.address}
              rating={placeData.rating}
            />
            <ShopDetailData address={placeData.address} />
            <ShopInfoData placeId={placeId} />
          </div>
          <div>
            <DetailTopNav
              contentScrollTop={contentScrollTop}
              reviewScrollTop={reviewScrollTop}
              guideScrollTop={guideScrollTop}
              containerRef={modalContentRef}
              reviewCount={reviewCount}
            />
            <div className='flex flex-col gap-[15px]'>
              <div ref={contentRef}>
                <DetailContent onExpandChange={handleContentExpandChange} />
              </div>
              <div ref={reviewRef}>
                <ReviewPictures placeId={placeId} />
                <ReviewList placeId={placeId} reviewCount={reviewCount} />
              </div>
              <div ref={guideRef}>
                <DetailGuide />
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
      {isOpen && <ReviewUpload closeModal={closeModal} />}
    </div>,
    modalRoot
  );
};

export default DetailModal;
