import { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface DetailContentProps {
  onExpandChange: (expanded: boolean) => void; // 상태 변경 콜백
  contentImgs: string[];
}

const DetailContent: React.FC<DetailContentProps> = ({
  onExpandChange,
  contentImgs,
}) => {
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
  }, [contentImgs]);

  const ImgWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const className = twMerge(
      isExpanded ? '' : 'h-[400px] overflow-hidden',
      !showButton ? 'h-auto' : ''
    );

    return (
      <div className={className} ref={imgRef}>
        {children}
      </div>
    );
  };

  return (
    <>
      {contentImgs.length === 0 ? (
        <div className='col p-[30px] text-center text-[14px] text-caption'>
          상세내용이 없습니다.
        </div>
      ) : (
        <>
          <ImgWrap>
            {contentImgs.map((item, i) => {
              return <img key={i} src={item} alt={`이미지 ${i}`} />;
            })}
          </ImgWrap>
          {showButton && (
            <button
              className='w-full bg-primary text-[14px] leading-[40px] text-white'
              onClick={handleToggleExpand}
            >
              {isExpanded ? '상세내용 닫기' : '상세내용 펼쳐보기'}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default DetailContent;
