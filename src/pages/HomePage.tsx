import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

export type Book = {
  id: number;
  title: string;
  author: string;
  stock: number;
  price: number;
  img: string;
  description: string;
  category: string;
  status: string;
};

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:2000/posts");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="px-3 py-2 border rounded-md">
        <div className="flex justify-between items-center ">
          <p className="font-bold text-2xl md:text-3xl mb-2">BEST SELLER</p>
          <p className=" hover:underline cursor-pointer ">View All</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {books
            .filter((val) => val.status === "Best Seller")
            .map((val) => (
              <BookCard key={val.id} {...val} />
            ))}
        </div>
      </div>
      <div className="px-3 py-2 border rounded-md">
        <div className="flex justify-between items-center ">
          <p className="font-bold text-2xl md:text-3xl mb-2">ALL BOOK</p>
          <p className=" hover:underline cursor-pointer ">View All</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {books.map((val) => (
            <BookCard key={val.id} {...val} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
