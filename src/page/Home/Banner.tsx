import image from '../../assets/Images/starfield.png';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

interface PlaceBannerImg {
  id?: string;
  image: string;
  url_link?: string;
}

interface BannerProps {
  bannerImgs?: PlaceBannerImg[];
}

const Banner: React.FC<BannerProps> = ({ bannerImgs }) => {
  const hasImages = bannerImgs && bannerImgs.length > 0;

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
        {hasImages ? (
          bannerImgs.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Link
                  to='#'
                  onClick={(e) => {
                    if (!item.url_link) {
                      e.preventDefault();
                      return;
                    }
                    e.preventDefault();
                    window.open(item.url_link, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <img
                    id={item.id}
                    src={item.image}
                    alt={`banner ${i}`}
                    className='h-full w-full object-cover'
                  />
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <>
            <SwiperSlide>
              <img
                src={image}
                alt='sample_image'
                className='h-full w-full object-cover'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={image}
                alt='sample_image'
                className='h-full w-full object-cover'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={image}
                alt='sample_image'
                className='h-full w-full object-cover'
              />
            </SwiperSlide>
          </>
        )}
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
