import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const user = useAuthStore().user;
  console.log(user);

  return (
    <div className="flex p-4 justify-between items-center border-b">
      <Link to="/" className="font-bold text-2xl">
        BOOKSTORE
      </Link>
      {user?.email ? (
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <BsCartFill className="w-6 h-6" />
          </div>
          <img
            src="../src/assets/images/profile.jpg"
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
      ) : (
        <AuthModal />
      )}
    </div>
  );
};

export default Navbar;
