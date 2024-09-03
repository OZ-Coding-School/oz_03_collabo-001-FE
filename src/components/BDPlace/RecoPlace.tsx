import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import RecoPlaceItem from './RecoPlaceItem';

interface places {
  address: string;
  comments_count: number;
  id: number;
  is_bookmarked: boolean;
  name: string;
  place_region: number;
  place_subcategory: number;
  rating: number;
  store_image: string;
}

interface RecoPlaceItem {
  content: string;
  places: places;
  tags: number[];
}

interface RecoPlaceProps {
  recoTags: string[];
  recoPlaces: RecoPlaceItem[];
}

const RecoPlace: React.FC<RecoPlaceProps> = ({ recoTags, recoPlaces }) => {
  const regionMap: { [key: string]: string } = {
    '': '전체',
    '1': '서울',
    '2': '경기',
    '3': '인천',
    '4': '충청',
    '5': '강원',
    '6': '전라',
    '7': '경상',
    '8': '제주',
  };

  if (!recoPlaces) {
    return null;
  }

  return (
    <div className='col'>
      <div className='colTitle flex items-center'>
        <p className='mr-[5px] font-semibold'>추천장소</p>
        {recoTags.map((item, i) => {
          return (
            <span key={i} className='ml-[5px] text-[12px] text-caption'>
              &#35;{item}
            </span>
          );
        })}
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
        {recoPlaces.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <RecoPlaceItem
                placeId={item.places.id}
                location={regionMap[item.places.place_region]}
                name={item.places.name}
                content={item.content}
                placeImage={item.places.store_image}
                tags={item.tags}
              />
            </SwiperSlide>
          );
        })}
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
};

export default RecoPlace;
