import Logout from '../../page/Login/Logout';
import ProfilePhotoEdit from './ProfileEdit';
import NicknameEdit from './NicknameEdit';

interface UserInfoProps {
  profile: UserProfile;
}

interface UserProfile {
  profile_image: string | null;
  nickname: string;
  email: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ profile }) => {
  return (
    <div className='col flex justify-center bg-white py-[20px]'>
      <div className='flex h-[119px] w-full items-center rounded-[10px] border-[0.5px] border-[#b3b3b3] px-[15px]'>
        <ProfilePhotoEdit profile_image={profile.profile_image} />
        <div className='w-[100%]'>
          <NicknameEdit nickname={profile.nickname} />
          <div className='mt-[5px] text-[12px] text-caption'>
            <p>{profile.email}</p>
            <Logout />
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
