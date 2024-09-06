import { IoClose } from 'react-icons/io5';

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
  // closeModal: () => void;
  setViewImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageDetailModal: React.FC<Props> = ({
  review,
  imageUrl,
  unique,
  // closeModal,
  setViewImage,
}) => {
  return (
    <div className='fixed inset-0 z-30 flex h-full items-start justify-center bg-white'>
      <div className='relative flex h-full w-[400px] flex-col gap-2'>
        <div className='mb-[20px] flex justify-between p-[20px]'>
          <p className='font-semibold'>사진모아보기</p>
          <button onClick={() => setViewImage(false)}>
            <IoClose className='text-[20px] text-caption' />
          </button>
        </div>

        <div className='absolute top-1/2 w-full -translate-y-1/2'>
          <img
            src={imageUrl}
            alt={`${review.id}-${unique}`}
            className='max-h-[350px] w-full'
          />
        </div>
        <div className='bg-white-50 absolute bottom-0 flex flex-col gap-2 p-[20px]'>
          <div className='flex items-center gap-1'>
            {review.user.profile_image ? (
              <img
                src={review.user.profile_image}
                alt={`${review.user.nickname}'s profile_image`}
                className='h-8 w-8 rounded-full'
              />
            ) : (
              <div className='h-8 w-8 rounded-full bg-border' />
            )}
            <p className='text-[14px]'>{review.user.nickname}</p>
          </div>
          <p className='text-[14px] text-caption'>{review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailModal;
