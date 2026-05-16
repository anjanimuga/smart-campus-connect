import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  ShoppingCart,
  Package,
  CreditCard,
} from "lucide-react";

import API from "../services/api";

export default function StationeryCart() {

  const navigate =
    useNavigate();

  const [cart, setCart] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    const storedCart =
      JSON.parse(
        localStorage.getItem(
          "stationeryCart"
        )
      ) || [];

    setCart(
      storedCart
    );

  }, []);

  const totalPrice =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        item.price *
          item.quantity,
      0
    );

  // PLACE ORDER
  const placeOrder =
    async () => {

      try {

        await API.post(
          "/stationery-orders",
          {
            userId:
              user._id,

            userName:
              user.name,

            items: cart,

            totalPrice,
          }
        );

        localStorage.removeItem(
          "stationeryCart"
        );

        navigate(
          "/stationery-orders"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#f8f5ef] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 bg-white border border-[#ece7df] px-5 py-3 rounded-full shadow-sm mb-6">

            <ShoppingCart
              size={18}
              className="text-[#c27c2c]"
            />

            <p className="text-[#7a6d5b] font-medium text-sm">

              Your Stationery Cart

            </p>

          </div>

          <h1 className="text-[65px] lg:text-[85px] leading-[0.95] font-black tracking-tight text-[#1f1f1f] mb-6">

            Shopping
            <br />

            <span className="text-[#c27c2c]">

              Cart

            </span>

          </h1>

          <p className="text-xl text-[#6f6659] leading-relaxed max-w-2xl">

            Review your stationery items before placing your campus order.

          </p>

        </div>

        {/* EMPTY */}

        {

          cart.length === 0 ? (

            <div className="bg-white border border-[#ece7df] rounded-[36px] p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

              <div className="w-24 h-24 rounded-3xl bg-[#f8f5ef] border border-[#ece7df] flex items-center justify-center mx-auto mb-8">

                <Package
                  size={40}
                  className="text-[#c27c2c]"
                />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#1f1f1f] mb-5">

                Your Cart Is Empty

              </h2>

              <p className="text-[#6f6659] text-lg">

                Add stationery items to continue.

              </p>

            </div>

          ) : (

            <>

              {/* ITEMS */}

              <div className="space-y-6">

                {cart.map(
                  (
                    item,
                    index
                  ) => (

                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          index * 0.05,
                      }}
                      className="bg-white border border-[#ece7df] rounded-[34px] p-7 flex flex-col md:flex-row md:justify-between md:items-center gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
                    >

                      <div className="flex items-center gap-6">

                        <div className="w-20 h-20 rounded-3xl bg-[#f8f5ef] border border-[#ece7df] flex items-center justify-center overflow-hidden">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        </div>

                        <div>

                          <h2 className="text-3xl font-black tracking-tight text-[#1f1f1f] mb-3">

                            {item.name}

                          </h2>

                          <p className="text-[#7a6d5b]">

                            Quantity:
                            {" "}
                            {item.quantity}

                          </p>

                        </div>

                      </div>

                      <p className="text-3xl font-black text-[#1f1f1f]">

                        ₹
                        {item.price *
                          item.quantity}

                      </p>

                    </motion.div>

                  )
                )}

              </div>

              {/* TOTAL */}

              <div className="mt-12 bg-white border border-[#ece7df] rounded-[36px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

                <div>

                  <p className="text-[#8a7c67] mb-3 font-medium">

                    Order Total

                  </p>

                  <h2 className="text-5xl font-black tracking-tight text-[#1f1f1f]">

                    ₹{totalPrice}

                  </h2>

                </div>

                <button
                  onClick={placeOrder}
                  className="flex items-center justify-center gap-3 bg-[#1f1f1f] text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-[#2f2f2f] transition duration-300"
                >

                  <CreditCard size={20} />

                  Place Order

                </button>

              </div>

            </>

          )

        }

      </div>

    </div>

  );

}