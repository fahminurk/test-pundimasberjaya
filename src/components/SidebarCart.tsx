import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarCart: React.FC<{ totalItem: number; subTotal: number }> = ({
  totalItem,
  subTotal,
}) => {
  const nav = useNavigate();
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
          <p>
            {subTotal.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
        <div className="flex justify-between py-2 border-b">
          <p>Delivery</p>
          <p>FREE</p>
        </div>
        <div className="flex justify-between py-2 font-bold">
          <p>Total</p>
          <p>
            {subTotal.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => nav("/checkout")}
        disabled={totalItem === 0}
      >
        CHECKOUT
      </Button>
    </>
  );
};

export default SidebarCart;
