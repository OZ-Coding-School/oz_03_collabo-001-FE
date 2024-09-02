import { useState, useEffect } from 'react';
import axios from 'axios';
import MoreTitle from '../../components/layout/MoreTitle';
import { FaPlus } from 'react-icons/fa6';

interface ReviewPicturesProps {
  placeId: string;
}

interface reviewImages {
  image: string;
}

const ReviewPictures: React.FC<ReviewPicturesProps> = ({ placeId }) => {
  const [reviewImages, setReviewImages] = useState<reviewImages[]>([]);
  // 사진모아보기 의 미리보기는 3개까지만 보이도록
  const numberOfItems = 3;
  const items = Array.from({ length: numberOfItems }, (_, index) => index);

  useEffect(() => {
    const fetchReviewPictures = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${placeId}/comments/iamges/`
        );
        setReviewImages(response.data);
      } catch (error) {
        console.log('전체 후기이미지를 불러오는데 실패했습니다. : ', error);
      }
    };

    fetchReviewPictures();
  }, []);

  return (
    <>
      {reviewImages.length > 0 && (
        <div className='col'>
          <MoreTitle title='사진모아보기' />
          {/* {reviewImages && reviewImages.length > 3 ? {reviewImages.map((),{})} : null} */}
          {reviewImages.length > 3 ? (
            <div className='flex justify-between'>
              {items.map((_, i) => {
                return (
                  <div className='imgWrap relative flex h-[115px] w-[115px] overflow-hidden rounded-[10px] border-2 border-border bg-background'>
                    {i == 2 ? (
                      <div className='absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center bg-black-50 text-[14px] text-white'>
                        <FaPlus className='mr-[5px] text-[12px]' />
                        더보기
                      </div>
                    ) : null}
                    <img
                      src={`${reviewImages[i].image}`}
                      alt=''
                      className='h-[115px] w-[115px] object-cover'
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex gap-[10px]'>
              {reviewImages.map((_, i) => {
                return (
                  <div className='imgWrap h-[115px] w-[115px] overflow-hidden rounded-[10px] border-2 border-border bg-background'>
                    <img
                      src={`${reviewImages[i].image}`}
                      alt=''
                      className='h-[115px] w-[115px] object-cover'
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReviewPictures;
