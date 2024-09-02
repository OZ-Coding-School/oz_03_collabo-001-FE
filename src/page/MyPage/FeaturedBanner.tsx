interface Banner {
  image: string;
  url_link: string;
}

interface FeaturedBannerProps {
  banners: Banner[];
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ banners }) => {
  const banner = banners[0];

  return (
    <div className='h-[60px] bg-background text-center leading-[60px]'>
      {banner ? (
        <a href={banner.url_link} target='_blank' rel='noopener noreferrer'>
          <img
            src={banner.image}
            alt='Featured Banner'
            className='h-full w-full object-cover'
          />
        </a>
      ) : (
        'Featured Banner'
      )}
    </div>
  );
};

export default FeaturedBanner;
