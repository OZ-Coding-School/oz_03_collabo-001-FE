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
  closeModal: () => void;
}

const ImageDetailModal: React.FC<Props> = ({
  review,
  imageUrl,
  unique,
  closeModal,
}) => {
  return (
    <div className='bg-black-50 fixed inset-0 z-30 flex h-screen items-start justify-center'>
      <div className='bg-black-50 flex w-[400px] flex-col gap-2'>
        <div>
          <button onClick={closeModal} className='ml-2 text-white'>
            x
          </button>
        </div>
        <div>
          <img src={imageUrl} alt={`${review.id}-${unique}`} />
        </div>
        <div className='flex flex-col gap-2 p-2 pt-0'>
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
            <p className='text-white'>{review.user.nickname}</p>
          </div>
          <p className='text-white'>{review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailModal;
