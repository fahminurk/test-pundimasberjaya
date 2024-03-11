import { Button } from "@/components/ui/button";
import { formatToIDR } from "@/lib/utils";
import React from "react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarCheckout: React.FC<{ totalItem: number; subTotal: number }> = ({
  totalItem,
  subTotal,
}) => {
  const nav = useNavigate();
  const { cart } = useCartStore();
  return (
    <>
      <p className="font-bold text-2xl md:text-4xl">ORDER SUMMARY</p>
      <div>
        <div className="flex gap-1 py-3 border-b">
          <p>{totalItem}</p>
          <p>{totalItem > 1 ? "items" : "item"}</p>
        </div>
        <div className="flex justify-between py-2 border-b">
          <p>Subtotal</p>
          <p>{formatToIDR(subTotal)}</p>
        </div>
        <div className="flex justify-between py-2 border-b">
          <p>Delivery</p>
          <p>FREE</p>
        </div>
        <div className="flex justify-between py-2 font-bold">
          <p>Total</p>
          <p>{formatToIDR(subTotal)}</p>
        </div>
      </div>

      <div className="flex flex-col">
        {cart.map((item, i) => (
          <div key={i} className="flex  gap-2 pb-2">
            <img
              src={`../src/assets/images/${item.img}`}
              alt="img"
              className="object-cover h-32"
            />
            <div className="flex flex-col col-span-2 flex-1">
              <p className="font-bold">{item.title}</p>
              <p className="">author: {item.author}</p>
              <div className="flex flex-col items-end">
                <div className="flex gap-2">
                  <p>{item.qty} x</p>
                  <p>{formatToIDR(item.price)}</p>
                </div>
                <div className="flex gap-2">
                  <p>Total</p>
                  <p>{formatToIDR(item.totalPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="w-full"
        onClick={() => toast.info("still in development")}
      >
        CONTINUE
      </Button>
    </>
  );
};

export default SidebarCheckout;
