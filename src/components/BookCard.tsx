import React from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type BookCardProps = {
  id: number;
  title: string;
  author: string;
  stock: number;
  price: number;
  img: string;
  description: string;
};

const BookCard: React.FC<BookCardProps> = ({
  author,
  id,
  img,
  price,
  title,
}) => {
  return (
    <div
      key={id}
      className="relative p- rounded-md border group  transition-all"
    >
      <img
        src={`../src/assets/images/${img}`}
        alt=""
        className="w-full h-72 object-cover group-hover:grayscale rounded-t-md"
      />
      <div className="flex flex-col p-2 text-start">
        <p className="text-gray-500 border-b text-xs">{author}</p>
        <p className="font-bold border-b truncate text-md">{title}</p>
        <p className="text-xs">
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center absolute top-0 right-0 w-full bg-white/50 h-full opacity-0 group-hover:opacity-100 ">
        <div className="bg-white p-2 cursor-pointer rounded-full hover:invert">
          <BsCartPlusFill className="text-2xl " />
        </div>
        <Link
          to={`/book/${id}`}
          className="bg-white p-2 rounded-full hover:invert"
        >
          <FaArrowRight className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
