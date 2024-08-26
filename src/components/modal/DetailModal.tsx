import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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

const NAV_HEIGHT = 48; // 고정 NAV의 높이

interface DetailModalProps {
  closeModal: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ closeModal }) => {
  const modalContentRef = useRef<HTMLDivElement>(null); // 스크롤할 컨테이너에 대한 ref

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null; // modal-root가 존재하지 않으면 렌더링하지 않음

  const contentRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const [contentScrollTop, setContentScrollTop] = useState<number>(0);
  const [reviewScrollTop, setReviewScrollTop] = useState<number>(0);
  const [guideScrollTop, setGuideScrollTop] = useState<number>(0);

  useEffect(() => {
    const updateScrollPositions = () => {
      if (contentRef.current && reviewRef.current && guideRef.current) {
        if (modalContentRef.current) {
          setContentScrollTop(
            contentRef.current.getBoundingClientRect().top +
              modalContentRef.current.scrollTop - // modalContentRef 사용
              NAV_HEIGHT
          );
          setReviewScrollTop(
            reviewRef.current.getBoundingClientRect().top +
              modalContentRef.current.scrollTop - // modalContentRef 사용
              NAV_HEIGHT
          );
          setGuideScrollTop(
            guideRef.current.getBoundingClientRect().top +
              modalContentRef.current.scrollTop - // modalContentRef 사용
              NAV_HEIGHT
          );
        }
      }
    };

    setTimeout(updateScrollPositions, 0);

    window.addEventListener('resize', updateScrollPositions);

    return () => {
      window.removeEventListener('resize', updateScrollPositions);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className='detailModal fixed inset-0 z-50 flex items-start justify-center'>
      <div
        className='h-[100vh] w-[400px] overflow-y-auto overflow-x-hidden bg-background'
        ref={modalContentRef}
      >
        <div className='flex h-[48px] w-[400px] items-center bg-white px-2'>
          <button onClick={closeModal} className='mr-[8px] font-extrabold'>
            <GoChevronLeft className='text-[24px] opacity-[70%]' />
          </button>
        </div>

        <div className='flex flex-col gap-[15px]'>
          <div>
            <Banner />
            <ShopSimpleData />
            <ShopDetailData />
            <ShopInfoData />
          </div>
          <div>
            <DetailTopNav
              contentScrollTop={contentScrollTop}
              reviewScrollTop={reviewScrollTop}
              guideScrollTop={guideScrollTop}
              containerRef={modalContentRef} // containerRef를 props로 전달
            />
            <div className='flex flex-col gap-[15px]'>
              <div ref={contentRef}>
                <DetailContent />
              </div>
              <div ref={reviewRef}>
                <ReviewPictures />
                <ReviewList />
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
      >
        <ImPlus className='text-white' />
      </button>
    </div>,
    modalRoot
  );
};

export default DetailModal;
