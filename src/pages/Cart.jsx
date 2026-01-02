import { FaRegTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { LuNotebook } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; 
import emptyCart from "../assets/empty-cart.png"

const Cart = ({ location = {}, getLocation }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useUser();
  const navigate=useNavigate();

  // ✅ total with quantity
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {cartItems.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-6">
            My Cart ({cartItems.length})
          </h1>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 bg-gray-100 p-4 rounded-lg items-center justify-between"
              >
                <div className="flex gap-4 items-center w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h1 className="font-semibold line-clamp-2">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-bold text-lg">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  {/* Quantity buttons */}
                  <div className="flex bg-red-500 text-white rounded-md overflow-hidden">
                    <button
                      className="px-3"
                      onClick={() =>
                        updateQuantity(item.id, "decrease")
                      }
                    >
                      -
                    </button>

                    <span className="px-4">{item.quantity}</span>

                    <button
                      className="px-3"
                      onClick={() =>
                        updateQuantity(item.id, "increase")
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <FaRegTrashAlt
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xl cursor-pointer hover:scale-110 transition"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            {/* Delivery Form */}
            <div className="bg-gray-100 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold">Delivery Information</h2>

              <input
                className="w-full p-2 rounded-md"
                placeholder="Full Name"
                value={user?.fullName || ""}
                readOnly
              />

              <input
                className="w-full p-2 rounded-md"
                placeholder="Address"
                value={location?.country || ""}
              />

              <button
                onClick={getLocation}
                className="border border-red-500 text-red-500 py-2 rounded-md w-full"
              >
                Detect Location
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white border shadow-lg p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="flex justify-between">
                <span className="flex gap-2 items-center">
                  <LuNotebook /> Items Total
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex gap-2 items-center">
                  <MdDeliveryDining /> Delivery
                </span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>

              <div className="flex justify-between">
                <span className="flex gap-2 items-center">
                  <GiShoppingBag /> Handling
                </span>
                <span>$5</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>${(totalPrice + 5).toFixed(2)}</span>
              </div>

              <button className="bg-red-500 text-white w-full py-2 rounded-md">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
       <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
         <h1 className="text-center text-red-500/80 text-5xl font-bold text-muted">
          Cart is empty 
        </h1>
        <img src={emptyCart} alt="cartitem"  className="w-[400px]"/>
        <button onClick={()=>navigate("/products")} className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
