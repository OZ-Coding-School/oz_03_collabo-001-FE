import image from '../../assets/Images/starfield.png';
import InfoTab from '../../components/BDInfo/InfoTab';

const BDFreeBoard = () => {
  return (
    <>
      <img src={image} alt='' className='h-28 w-full object-cover' />
      <div className='flex flex-col'>
        <div className='bg-white px-3 py-1'>
          <InfoTab
            tabs={[
              { id: '1', tab: '전체' },
              { id: '2', tab: '질문있어요' },
              { id: '3', tab: '고민있어요' },
              { id: '4', tab: '우리집자랑' },
              { id: '5', tab: '좋은건공유' },
            ]}
          />
        </div>
        <div className='bg-white p-3'></div>
      </div>
    </>
  );
};

export default BDFreeBoard;
