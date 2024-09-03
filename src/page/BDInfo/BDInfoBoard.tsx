import image from '../../assets/Images/starfield.png';
import InfoTab from '../../components/BDInfo/InfoTab';

const BDInfoBoard = () => {
  return (
    <>
      <img src={image} alt='' className='h-28 w-full object-cover' />
      <div className='flex flex-col'>
        <div className='bg-white px-3 py-1'>
          <InfoTab
            tabs={[
              { id: '1', tab: '전체' },
              { id: '2', tab: '애견상식' },
              { id: '3', tab: '육아상식' },
              { id: '4', tab: '애견훈련' },
              { id: '5', tab: '육아교육' },
            ]}
          />
        </div>
        <div className='bg-white p-3'></div>
      </div>
    </>
  );
};

export default BDInfoBoard;