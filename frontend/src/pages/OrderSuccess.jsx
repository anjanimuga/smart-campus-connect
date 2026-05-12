import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {

  const location = useLocation();

  const navigate = useNavigate();

  const order = location.state;

  // SAFETY
  if (!order) {

    return (

      <div className="min-h-screen bg-[#151312] text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-4xl font-semibold mb-6">
            No Order Found
          </h1>

          <button
            onClick={() =>
              navigate("/canteen")
            }
            className="bg-white text-black px-6 py-3 rounded-full"
          >
            Back to Canteen
          </button>

        </div>

      </div>

    );

  }

  return (
    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

          {/* HEADER */}
          <div className="text-center mb-10">

            <h1 className="text-5xl font-semibold mb-4">
              Order Placed
            </h1>

            <p className="text-gray-400">
              Your order has been placed successfully.
            </p>

          </div>

          {/* CUSTOMER DETAILS */}
          <div className="mb-10 space-y-4">

            <div className="flex justify-between">

              <p className="text-gray-400">
                Name
              </p>

              <p>
                {
                  order.customerName
                }
              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">
                Contact
              </p>

              <p>
                {
                  order.phoneNumber
                }
              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">
                Order Number
              </p>

              <p>
                {
                  order.orderNumber
                }
              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">
                Token Number
              </p>

              <p>
                #
                {
                  order.tokenNumber
                }
              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">
                Order Placed
              </p>

              <p>

                {new Date(
                  order.createdAt
                ).toLocaleString()}

              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">
                Pickup Time
              </p>

              <p>
                {
                  order.pickupTime
                }
              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">
                Status
              </p>

              <p className="text-yellow-400 font-semibold">
                {
                  order.status
                }
              </p>

            </div>

          </div>

          {/* ITEMS */}
          <div className="border-t border-white/10 pt-8">

            <h2 className="text-2xl font-semibold mb-6">
              Ordered Items
            </h2>

            <div className="space-y-4">

              {order.items.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="flex justify-between"
                  >

                    <div>

                      <p>
                        {
                          item.name
                        }{" "}
                        ×{" "}
                        {
                          item.quantity
                        }
                      </p>

                      {item.flavour && (

                        <p className="text-sm text-gray-400 mt-1">
                          Flavour:
                          {" "}
                          {
                            item.flavour
                          }
                        </p>

                      )}

                    </div>

                    <p>
                      ₹
                      {item.price *
                        item.quantity}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

          {/* TOTAL */}
          <div className="border-t border-white/10 mt-8 pt-8 flex justify-between items-center">

            <h2 className="text-3xl font-semibold">
              Total
            </h2>

            <h2 className="text-4xl font-semibold">
              ₹{order.total}
            </h2>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold"
            >
              View Orders
            </button>

            <button
              onClick={() =>
                window.print()
              }
              className="flex-1 bg-green-500 text-black py-4 rounded-2xl font-semibold"
            >
              Print Receipt
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}