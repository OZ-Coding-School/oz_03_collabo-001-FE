// import image from '../../assets/images/starfield.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface PlaceBannerImg {
  image: string;
}

interface BannerProps {
  bannerImgs: PlaceBannerImg[];
}

const Banner: React.FC<BannerProps> = ({ bannerImgs }) => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={500}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='bannerSwiper m-0 h-[200px] w-full'
      >
        {bannerImgs &&
          bannerImgs.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <img
                  src={item.image}
                  alt={`banner ${i}`}
                  className='h-full w-full object-cover'
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <style>{`
        .bannerSwiper .swiper-pagination-bullet {
          background: gray;
          width: 8px;
          height: 8px;
          border-radius: 1rem;
          opacity: 1;
          transition-duration: 500ms;
          transition-timing-function: ease-out;
        }
        .bannerSwiper .swiper-pagination-bullet-active {
          background: white;
          border-radius: 1rem;
          width: 40px;
          opacity: 1;
          transition-duration: 500ms;
          transition-timing-function: ease-out;
        }
        .bannerSwiper .swiper-button-prev,
        .bannerSwiper .swiper-button-next {
          color: white;
          width: 20px; /* 버튼의 너비를 20px로 설정 */
          height: 35px; /* 버튼의 높이를 20px로 설정 */
        //   background-color: #11111150;
        }
        .bannerSwiper .swiper-button-prev::after,
        .bannerSwiper .swiper-button-next::after {
          font-size: 30px; /* 화살표 아이콘의 크기를 줄이기 위해 폰트 사이즈 설정 */
        }`}</style>
    </>
  );
};

export default Banner;
