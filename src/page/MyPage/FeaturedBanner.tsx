interface Banner {
  image: string;
  url_link: string;
}

interface FeaturedBannerProps {
  banners: Banner[];
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ banners }) => {
  return (
    <div className='h-[60px] bg-background text-center leading-[60px]'>
      {banners.length > 0
        ? banners.map((banner, index) => (
            <a
              key={index}
              href={banner.url_link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={banner.image}
                alt={`Featured Banner ${index + 1}`}
                className='h-full w-full object-cover'
              />
            </a>
          ))
        : 'Featured Banner'}
    </div>
  );
};

export default FeaturedBanner;
