import { Swiper, SwiperSlide } from 'swiper/react';
import MoreTitle from '../../components/layout/MoreTitle';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import BDInfoPopularItem from './BDInfoPopularItem';

export default function BDInfoPopular() {
  const swiperSlides = Array(4).fill(null);
  const items = Array(2).fill(null);

  return (
    <div className='col'>
      <MoreTitle title='애개육아정보 인기글' />
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        speed={500}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='recoSwiper m-0 w-full'
      >
        {swiperSlides.map((_, index) => (
          <SwiperSlide key={index}>
            {items.map((_, idx) => (
              <BDInfoPopularItem key={idx} />
            ))}
            <BDInfoPopularItem className='last' />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .recoSwiper .swiper-pagination-bullet {
            background: #dddddd;
            width: 8px;
            height: 8px;
            border-radius: 1rem;
            opacity: 1;
            transition-duration: 500ms;
            transition-timing-function: ease-out;
        }
        .recoSwiper .swiper-pagination-bullet-active {
            background: #f78222;
            border-radius: 1rem;
            opacity: 1;
            transition-duration: 500ms;
            transition-timing-function: ease-out;
        }
        .recoSwiper .swiper-button-prev,
        .recoSwiper .swiper-button-next {
            display:none;
        }
        .recoSwiper .swiper-pagination {
            margin-top: 16px;
            margin-bottom: 8px;
            display:flex;
            justify-content: center;
            position: static;
        }
    `}</style>
    </div>
  );
}
