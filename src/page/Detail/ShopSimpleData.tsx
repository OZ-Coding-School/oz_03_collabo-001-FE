import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import review from '../../data/reviews';

const ShopSimpleData = () => {
  const [score, setScore] = useState([false, false, false, false, false]);

  const ARRAY = [0, 1, 2, 3, 4];

  const starScore = (index: number) => {
    let star = [...score];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    console.log(setScore(star));
  };

  return (
    <div className='h-[102px] bg-[white] py-[3.5px]'>
      <div className='h-[88px] bg-[white] px-[12px] py-[10px]'>
        {/* <div>{review.name}</div>
        <div>{review.address}</div> */}
        <div className='flex text-[#B9B7B7]'>
          {ARRAY.map((el, index) => (
            <FaStar key={index} size='14'></FaStar>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSimpleData;
