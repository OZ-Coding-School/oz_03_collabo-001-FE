// import { twMerge } from 'tailwind-merge';
import useModalWithURL from '../../hooks/useModalWithURL';
import DetailModal from '../modal/DetailModal';

const TagItem = ({ text }: { text: number }) => {
  return (
    <li className='h-[20px] rounded-sm border border-border bg-background px-[4px] text-[11px]'>
      {text}
    </li>
  );
};

interface RecoPlaceItemProps {
  placeId: number;
  location: string;
  name: string;
  content: string;
  placeImage: string;
  tags: number[];
}

const RecoPlaceItem: React.FC<RecoPlaceItemProps> = ({
  placeId,
  location,
  name,
  content,
  placeImage,
  tags,
}) => {
  const { isOpen, openModal, closeModal } = useModalWithURL(
    `detailModal_${placeId}`
  );

  return (
    <>
      <div
        className='flex cursor-pointer items-center rounded-[10px] border-2 border-background p-[10px]'
        onClick={openModal}
      >
        <div className='imgWrap h-[80px] w-[80px] overflow-hidden rounded-[10px] bg-background'>
          <img
            src={placeImage}
            alt={name}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='ml-[12px]'>
          <p className='text-[15px] font-bold'>
            <span className='text-primary'>&#91;{location}&#93;</span>
            <span className='ml-[5px]'>{name}</span>
          </p>
          <p className='text-[12px] text-caption'>{content}</p>
          <ul className='tags mt-[5px] flex gap-[6px]'>
            {tags.map((item, i) => {
              return <TagItem key={i} text={item} />;
            })}
          </ul>
        </div>
      </div>
      {isOpen && <DetailModal placeId={placeId} closeModal={closeModal} />}
    </>
  );
};

export default RecoPlaceItem;
