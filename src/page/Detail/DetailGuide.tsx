const DetailGuide = () => {
  return (
    <div className='col'>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>이용안내</p>
      </div>

      <ul className='pb-[30px]'>
        <li className='text-[12px]'>
          - 이용금액 : 성인 14,000원 소인 12,000원
        </li>
        <li className='text-[12px]'>- 24개월 미만 아이 무료</li>
        <li className='text-[12px]'>
          - 반일권의 경우 15:30이후 부터 입장가능합니다.{' '}
        </li>
        <li className='text-[12px]'>- 이용시간 : 10시~7시</li>
      </ul>
    </div>
  );
};

export default DetailGuide;
