import Logout from "../auth/LogOut";

import { useAuth } from "../../hooks/useAuth";

import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

const Header = () => {
  const { auth } = useAuth();
  const {state} = useProfile();

  const imgUrl = state?.user?.avatar ?? auth?.user?.avatar;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-textBlue py-4">
      <div className="container flex items-center justify-between gap-6">
        <Link to="/" className="text-2xl lg:text-4xl font-bold tracking-wide">
          u<span className="text-lightBg">Alumni</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button> */}

          <Link to="/me" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {/* {auth?.user?.firstName} {auth?.user?.lastName} */}
              {auth?.user?.firstName}
            </span>
            <img
              className="h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                imgUrl
              }`}
              alt={auth?.user?.firstName}
            />
          </Link>
          
          <Logout />
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
