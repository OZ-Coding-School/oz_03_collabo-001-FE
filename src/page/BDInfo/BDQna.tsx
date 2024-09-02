import image from '../../assets/Images/starfield.png';
import InfoPost from '../../components/BDInfo/InfoPost';
import InfoTab from '../../components/BDInfo/InfoTab';

const BDQnA = () => {
  return (
    <>
      <img src={image} alt='' className='h-28 w-full object-cover' />
      <div className='bg-white p-3'>
        <InfoTab
          tabs={[
            { id: '1', tab: '전체' },
            { id: '2', tab: '애견관련' },
            { id: '3', tab: '육아관련' },
            { id: '4', tab: '방문후기' },
            { id: '5', tab: '생활관련' },
            { id: '6', tab: '제품관련' },
          ]}
        />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
        <InfoPost isQuestion={true} />
      </div>
    </>
  );
};

export default BDQnA;
