import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import RecoPlaceItem from './RecoPlaceItem';

export default function RecoPlace() {
  return (
    <div className='col'>
      <div className='colTitle flex items-center'>
        <p className='font-semibold'>추천장소</p>
        <span className='ml-[9px] text-[12px] text-caption'>
          &#35;5세아이 &#35;중형견 &#35;실내
        </span>
      </div>
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
        <SwiperSlide>
          <RecoPlaceItem />
        </SwiperSlide>
        <SwiperSlide>
          <RecoPlaceItem />
        </SwiperSlide>
        <SwiperSlide>
          <RecoPlaceItem />
        </SwiperSlide>
        <SwiperSlide>
          <RecoPlaceItem />
        </SwiperSlide>
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
