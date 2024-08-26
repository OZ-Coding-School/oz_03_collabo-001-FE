import Logout from '../../page/Login/Logout';
import { Link } from 'react-router-dom';
import ProfilePhotoEdit from './ProfileEdit';
import NicknameEdit from './NicknameEdit';

const UserInfo: React.FC = () => {
  return (
    <div className='flex justify-center bg-white py-[20px]'>
      <div className='flex h-[119px] items-center rounded-[10px] border-[0.5px] border-[#b3b3b3] px-[15px] py-[20px]'>
        <ProfilePhotoEdit />
        <div>
          <NicknameEdit />
          <div className='mt-[5px] text-[12px] text-caption'>
            <p>12345@naver.com(계정정보)</p>
            {/* <Logout /> */}
          </div>
        </div>
      </div>
      {/* //비로그인 상태 */}
      {/* <div className='flex h-[119px] w-[360px] items-center rounded-[10px] border-[0.5px] border-[#b3b3b3] px-[15px] py-[20px]'>
        <Link to='/login'>
          <button className='text-[18px] font-bold'>로그인하기</button>
        </Link>
      </div> */}
    </div>
  );
};

export default UserInfo;
