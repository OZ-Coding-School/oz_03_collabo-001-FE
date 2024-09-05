import ReactDOM from 'react-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import useModalWithURL from '../../hooks/useModalWithURL';
import useFetchPlaceData from '../../hooks/useFetchPlaceData';
import { GoChevronLeft } from 'react-icons/go';
import { ImPlus } from 'react-icons/im';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
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

declare module 'react-custom-scrollbars-2' {
  interface Scrollbars {
    view: HTMLDivElement;
  }
}

const NAV_HEIGHT = 48; // 고정 NAV의 높이

interface DetailModalProps {
  closeModal: () => void;
  placeId: number;
}

const DetailModal: React.FC<DetailModalProps> = ({ closeModal, placeId }) => {
  // 데이터 가져오기
  const { placeData, loading, error } = useFetchPlaceData(placeId);

  // 후기작성 모달
  const { isOpen, openThirdModal } = useModalWithURL(`ReviewUpload`);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null; // modal-root가 존재하지 않으면 렌더링하지 않음

  // 스크롤할 컨테이너에 대한 ref
  const scrollbarRef = useRef<Scrollbars>(null);
  const navStartRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const [navStartRefTop, setNavStartRefTop] = useState(0);
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const [contentScrollTop, setContentScrollTop] = useState<number>(0);
  const [reviewScrollTop, setReviewScrollTop] = useState<number>(0);
  const [guideScrollTop, setGuideScrollTop] = useState<number>(0);
  const [, setIsContentExpanded] = useState<boolean>(false);

  // nav의 위치 구하기
  useEffect(() => {
    const checkRef = setInterval(() => {
      if (navStartRef.current) {
        const offsetTop = navStartRef.current.offsetTop;
        setNavStartRefTop(offsetTop); // 요소의 offsetTop 값을 상태로 저장
        clearInterval(checkRef); // 찾았으면 clear
      } else {
        console.log('navStartRef.current가 아직 없음');
      }
    }, 100); // 100ms마다 체크

    return () => clearInterval(checkRef); // cleanup
  }, []);

  // ref들의 위치 구하기
  const updateScrollPositions = () => {
    if (
      contentRef.current &&
      reviewRef.current &&
      guideRef.current &&
      modalContentRef.current &&
      navStartRef.current
    ) {
      setContentScrollTop(
        contentRef.current.getBoundingClientRect().top + currentScrollTop
      );
      setReviewScrollTop(
        reviewRef.current.getBoundingClientRect().top +
          currentScrollTop -
          NAV_HEIGHT
      );
      setGuideScrollTop(
        guideRef.current.getBoundingClientRect().top +
          currentScrollTop -
          NAV_HEIGHT
      );
    }
  };

  // scrollbar 스크롤할때 발생
  const handleScroll = () => {
    if (scrollbarRef.current) {
      const ScrollTop = scrollbarRef.current.getScrollTop();
      setCurrentScrollTop(ScrollTop);
      // console.log('currentScrollTop', currentScrollTop); //현재 스크롤 위치
    }
    updateScrollPositions();
  };

  //
  useEffect(() => {
    if (placeData) {
      // 데이터가 로드된 후에만 실행
      updateScrollPositions();
      // window.addEventListener('resize', updateScrollPositions);

      const currentScrollbar = scrollbarRef.current?.view;
      if (currentScrollbar) {
        currentScrollbar.addEventListener('scroll', updateScrollPositions);
      }

      return () => {
        currentScrollbar?.removeEventListener('resize', updateScrollPositions);
        if (currentScrollbar) {
          currentScrollbar.removeEventListener('scroll', updateScrollPositions);
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
        <p>loading ...</p>
      </div>,
      modalRoot
    );
  }

  if (error) {
    return ReactDOM.createPortal(
      <div className='detailModal h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
        <p>{error}</p>
      </div>,
      modalRoot
    );
  }

  if (!placeData) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='detailModal h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <Scrollbars
        style={{
          width: '400px',
          height: '100vh',
        }}
        renderThumbVertical={renderThumbVertical}
        autoHide
        ref={scrollbarRef}
        onScroll={handleScroll}
      >
        <div
          // className='h-[100vh] w-[400px] overflow-y-auto overflow-x-hidden'
          className='overflow-x-hidden'
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
              />
              <ShopInfoData placeInfoMenu={placeData.serviceIcons} />
            </div>
            <div ref={navStartRef}>
              <DetailTopNav
                navStartRefTop={navStartRefTop}
                currentScrollTop={currentScrollTop}
                scrollbarRef={scrollbarRef}
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
      </Scrollbars>
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
