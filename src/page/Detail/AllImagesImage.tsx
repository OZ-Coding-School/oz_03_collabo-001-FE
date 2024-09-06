import { useState } from 'react';
import ImageDetailModal from '../../components/modal/ImageDetailModal';

interface user {
  profile_image: string;
  nickname: string;
  email: string;
}
interface image {
  url: string;
  created_at: string;
  updated_at: string;
}

interface review {
  user: user;
  id: number;
  content: string;
  rating: number;
  images: image[];
  created_at: string;
  updated_at: string;
}

interface Props {
  review: review;
  imageUrl: string;
  unique: number;
}

const AllImages: React.FC<Props> = ({ review, imageUrl, unique }) => {
  const [viewImage, setViewImage] = useState<boolean>(false);

  const handleImageClick = () => {
    console.log(`imageDetailModal_${review.id}_${unique}`);
    setViewImage(true);
  };

  return (
    <>
      <button className='cursor-pointer' onClick={handleImageClick}>
        <img src={imageUrl} alt='' className='h-[128px] object-cover' />
      </button>
      {viewImage && (
        <ImageDetailModal
          unique={unique}
          review={review}
          imageUrl={imageUrl}
          setViewImage={setViewImage}
          // closeModal={closeModal}
        />
      )}
    </>
  );
};

export default AllImages;
