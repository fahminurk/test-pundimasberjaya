import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "./HomePage";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const DetailPage = () => {
  const user = useAuthStore().user;
  const { addToCart, cart } = useCartStore();
  const { id } = useParams();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    if (id) fetchBookById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBookById = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = (val: Book) => {
    const existingItem = cart.find((item) => item.id === val.id);

    if (existingItem) {
      toast.info("Book already in cart");
    } else {
      if (book) {
        addToCart({ ...val, qty: 1, totalPrice: val.price });
        toast.success("Item added to cart");
      }
    }
  };

  return (
    <>
      {!book ? (
        <div className="flex justify-center items-center h-[550px]">
          Book not found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <img
            src={`../src/assets/images/${book?.img}`}
            alt=""
            className="object-cover sm:sticky top-20"
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

            <div>
              <div className="flex gap-2 items-center">
                <Button
                  disabled={book?.stock === 0 || !user}
                  onClick={() => handleCart(book)}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
              {book?.stock === 0 ? (
                <p className="text-red-500 text-center text-sm ">
                  Out of Stock
                </p>
              ) : (
                <p className="text-center text-sm my-1">
                  {book.stock} in stock
                </p>
              )}
              {!user && (
                <p className="text-red-500 text-sm mt-1 p-1 text-center border">
                  Please log in first to add items to your cart
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
