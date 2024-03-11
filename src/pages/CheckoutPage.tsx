import SidebarCheckout from "@/components/SidebarCheckout";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const user = useAuthStore().user;
  const nav = useNavigate();
  const { totalItem, subTotal } = useCartStore();

  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 min-h-[550px]">
      <div className="flex flex-col gap-3 col-span-2">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl md:text-4xl font-bold">SHIPPING DETAILS</p>
            <p>Your saved addresses</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          no address
        </div>
      </div>
      <div className="sticky top-20 flex flex-col gap-2 h-max lg:p-2">
        <SidebarCheckout totalItem={totalItem} subTotal={subTotal} />
      </div>
    </div>
  );
};

export default CheckoutPage;
