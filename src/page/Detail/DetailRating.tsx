import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingProps {
  initialRating: number; // 초기 별점 점수 (0 ~ 5)
}

const DetailRating: React.FC<RatingProps> = ({ initialRating }) => {
  const [score, setScore] = useState<number>(initialRating);
  // const [score, setScore] = useState<boolean[]>([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);

  const ARRAY = [0, 1, 2, 3, 4];

  useEffect(() => {
    // 초기 별점 점수를 반영하여 상태 업데이트
    setScore(initialRating);
  }, [initialRating]);

  return (
    <div>
      <div className='flex text-[#B9B7B7]'>
        {ARRAY.map((_, index) => (
          <FaStar
            key={index}
            size='14'
            color={index < score ? '#FDDF02' : 'gray'}
            style={{ cursor: 'default', marginRight: '4px' }}
          ></FaStar>
        ))}
      </div>
    </div>
  );
};
export default DetailRating;
