import { Book } from "@/pages/HomePage";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type BookCardProps = {
  val: Book;
};

const BookCard: React.FC<BookCardProps> = ({ val }) => {
  const user = useAuthStore().user;
  const { addToCart, cart } = useCartStore();

  const handleCart = (val: Book) => {
    const existingItem = cart.find((item) => item.id === val.id);

    if (existingItem) {
      toast.info("Book already in cart");
    } else if (val.stock === 0) {
      toast.info("Book out of stock");
    } else {
      if (val) {
        addToCart({ ...val, qty: 1, totalPrice: val.price });
        toast.success("Item added to cart");
      }
    }
  };
  return (
    <div
      key={val.id}
      className="relative p- rounded-md border group  transition-all"
    >
      <img
        src={`../src/assets/images/${val.img}`}
        alt=""
        className="aspect-square object-cover group-hover:grayscale rounded-t-md"
      />
      <div className="flex flex-col p-2 text-start">
        <p className="text-gray-500 border-b text-xs">{val.author}</p>
        <p className="font-bold border-b truncate text-md">{val.title}</p>
        <p className="text-xs">
          {val.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center absolute top-0 right-0 w-full bg-white/50 h-full opacity-0 group-hover:opacity-100 ">
        <button
          onClick={() => handleCart(val)}
          className="bg-white p-2 cursor-pointer rounded-full hover:invert disabled:cursor-not-allowed disabled:opacity-70"
          disabled={!user}
        >
          <BsCartPlusFill className="text-2xl " />
        </button>
        <Link
          to={`/book/${val.id}`}
          className="bg-white p-2 rounded-full hover:invert"
        >
          <FaArrowRight className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
