/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface DetailContentProps {
  onExpandChange: (expanded: boolean) => void;
  contentImgs: string[] | [];
}

const DetailContent: React.FC<DetailContentProps> = ({
  onExpandChange,
  contentImgs,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;

    setIsExpanded(newExpandedState);
    onExpandChange(newExpandedState);
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const imgHeight = imgRef.current.scrollHeight;

      setShowButton(imgHeight >= 500);
    }
  };

  useEffect(() => {
    if (imagesLoaded === contentImgs.length) {
      handleImageLoad();
    }
  }, [imagesLoaded, contentImgs.length]);

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
      {contentImgs.length > 0 ? (
        <>
          <ImgWrap>
            {contentImgs.map((item, i) => {
              return (
                <img
                  key={i}
                  src={item}
                  alt={`이미지 ${i}`}
                  onLoad={() => setImagesLoaded((prev) => prev + 1)}
                  style={{ display: 'block', width: '100%' }}
                />
              );
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
      ) : (
        <div className='col bg-white py-4 text-center text-[14px] text-caption'>
          상세내용이 없습니다.
        </div>
      )}
    </>
  );
};

export default DetailContent;
