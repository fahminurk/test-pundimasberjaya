import SidebarCart from "@/components/SidebarCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    totalItem,
    decrementItem,
    incrementItem,
    cart,
    subTotal,
    removeItem,
  } = useCartStore();
  const user = useAuthStore().user;
  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 min-h-[550px]">
      <div className="flex flex-col col-span-2 gap-3">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl md:text-4xl font-bold">YOUR CART</p>
            <div className="flex gap-1 text-sm md:text-base">
              <p>{totalItem}</p>
              <p>{totalItem > 1 ? "items" : "item"}</p>
            </div>
          </div>
        </div>
        {!cart.length && (
          <div className="flex justify-center items-center h-[550px]">
            NO ITEM
          </div>
        )}
        {cart.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-3 sm:grid-cols-5 gap-2 pb-2 border-b"
          >
            <img
              src={`../src/assets/images/${item.img}`}
              alt="img"
              className="object-cover"
            />
            <div className="relative flex flex-col col-span-2">
              <p className="font-bold text-xl lg:text-2xl">{item.title}</p>
              <div className="grid grid-cols-3 gap-1">
                <div>
                  <div className="flex justify-between fonb">
                    <p>Author</p>
                    <p>:</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Price</p>
                    <p>:</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="">{item.author}</p>

                  <p className="">
                    {item.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
              <div className="w-full absolute bottom-0 flex justify-end">
                <Button
                  className=" text-xs h-5 w-12"
                  onClick={() => removeItem(item)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex ">
                <Button
                  disabled={item.qty === 1}
                  className="p-2 rounded-none"
                  onClick={() => decrementItem(item)}
                >
                  -
                </Button>
                <Input
                  className="rounded-none w-10 h-10"
                  value={item.qty}
                  disabled
                />
                <Button
                  disabled={item.qty === item.stock}
                  className="p-2 rounded-none"
                  onClick={() => incrementItem(item)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between col-span-2 sm:col-span-1">
              <p className="font-bold">X</p>
              <p>
                {item.totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky top-20 flex flex-col gap-2 h-max lg:p-2">
        <SidebarCart totalItem={totalItem} subTotal={subTotal} />
      </div>
    </div>
  );
};

export default CartPage;
