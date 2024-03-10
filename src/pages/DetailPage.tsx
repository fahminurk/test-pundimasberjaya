import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "./HomePage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book>();

  const fetchBookById = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/posts/${id}`);
      console.log(res.data);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchBookById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <img
        src={`../src/assets/images/${book?.img}`}
        alt=""
        className="object-cover sm:sticky top-5"
      />

      <div className="sticky top-0 h-max flex flex-col gap-5 p-2">
        <p className="font-bold text-4xl md:text-4xl lg:text-6xl capitalize">
          {book?.title}
        </p>
        <div className="grid grid-cols-3 p-2 border rounded-md bg-gray-100 text-center text-sm md:text-base">
          <div className="flex flex-col items-center gap-1">
            <p className="text-gray-500">Author</p>
            <p className="font-bold">{book?.author}</p>
          </div>
          <div className="flex flex-col items-center gap-1 border-x">
            <p className="text-gray-500">Category</p>
            <p className="font-bold">{book?.category}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-gray-500">Status</p>
            <p className="font-bold">{book?.status}</p>
          </div>
        </div>

        <p className="text-justify p-1">{book?.description}</p>
        <p className="font-bold text-xl">
          {book?.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        <div className="flex gap-2 items-center">
          <Select disabled={book?.stock === 0}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="0" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: book?.stock as number }).map((_, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button disabled={book?.stock === 0}>Add to Cart</Button>
        </div>
        {book?.stock === 0 && <p className="text-red-500">Out of Stock</p>}
      </div>
    </div>
  );
};

export default DetailPage;
