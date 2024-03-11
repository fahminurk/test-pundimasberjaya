import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { AvatarDropdown } from "./AvatarDropdown";

const Navbar = () => {
  const user = useAuthStore().user;
  const { totalItem } = useCartStore();

  return (
    <div className="flex sticky top-0 bg-white z-20 p-4 justify-between items-center border-b">
      <Link to="/" className="font-bold text-2xl">
        BOOKSTORE
      </Link>
      {user?.email ? (
        <Link to={"/cart"} className="flex gap-2 items-center">
          <div className="relative border p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <BsCartFill className="w-6 h-6" />
            <div className="absolute text-xs -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex justify-center items-center">
              {totalItem}
            </div>
          </div>
          <AvatarDropdown />
        </Link>
      ) : (
        <AuthModal />
      )}
    </div>
  );
};

export default Navbar;
