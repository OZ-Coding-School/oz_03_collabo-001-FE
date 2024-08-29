import ReviewListItem from './ReviewListItem';

interface ReviewList {
  reviewCount: number;
}

const ReviewList: React.FC<ReviewList> = ({ reviewCount }) => {
  // 후기 내용
  const reviewText =
    '친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요 친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요';
  //
  const reviewItemCount = 3;
  const reviewItems = Array.from({ length: reviewItemCount });

  return (
    <div className='col'>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>
          후기 <span className='text-primary'>{reviewCount}</span>개
        </p>
      </div>
      {reviewCount <= 0 ? (
        <NoReview />
      ) : (
        <>
          {reviewItems.map((_, index) => {
            return (
              <ReviewListItem
                key={index}
                className={index === 2 ? 'noBorder' : ''}
                reviewText={reviewText}
              />
            );
          })}
          <button className='mb-[30px] h-[35px] w-full rounded-[5px] border-2 border-border text-center text-[14px]'>
            후기 {reviewCount}개 모두보기
          </button>
        </>
      )}
    </div>
  );
};

const NoReview = () => {
  return (
    <div className='p-[30px] text-center text-[14px] text-caption'>
      작성된 후기가 없습니다.
    </div>
  );
};

export default ReviewList;
