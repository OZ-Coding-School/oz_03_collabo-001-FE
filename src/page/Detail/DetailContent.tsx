import { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface DetailContentProps {
  onExpandChange: (expanded: boolean) => void; // 상태 변경 콜백
}

const DetailContent: React.FC<DetailContentProps> = ({ onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpandChange(newExpandedState); // 상태 변경 시 부모에게 알림
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const imgHeight = imgRef.current.clientHeight;
      setShowButton(imgHeight >= 500);
    }
  };

  useEffect(() => {
    handleImageLoad();
  }, []);

  const ImgWrap: React.FC<{ imgsrc: string }> = ({ imgsrc }) => {
    const className = twMerge(
      isExpanded ? '' : 'h-[400px] overflow-hidden',
      !showButton ? 'h-auto' : ''
    );

    return (
      <div className={className}>
        <img ref={imgRef} src={imgsrc} alt='상세내용 이미지' />
      </div>
    );
  };

  return (
    <>
      <ImgWrap imgsrc='https://naverbooking-phinf.pstatic.net/20210903_197/1630641195647XeHID_JPEG/210902_%BE%C6%C6%B2%B6%F5%C6%BC%BD%BA%BC%DB%B5%B5%C1%A1_%BC%D2%BC%C8_%BF%AC%B0%A3%C8%B8%BF%F8%B1%C7_%B5%F4%BB%F3%BC%BC%C6%E4%C0%CC%C1%F6_1_03.jpg?type=a1000_60_sharpen' />
      {/* <ImgWrap imgsrc='https://image.cine21.com/resize/cine21/still/2005/1121/M0020066_focus52804[W578-].jpg' /> */}
      {showButton && (
        <button
          className='w-full bg-primary text-[14px] leading-[40px] text-white'
          onClick={handleToggleExpand}
        >
          {isExpanded ? '상세내용 닫기' : '상세내용 펼쳐보기'}
        </button>
      )}
    </>
  );
};

export default DetailContent;
