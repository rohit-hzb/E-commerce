import { useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🛒 Add to cart
  const addToCart = (product) => {
    const itemInCart = cartItems.find((item) => item.id === product.id);

    if (itemInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.info("Product quantity increased 🧾");
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success("Product added to cart 🛒");
    }
  };

  // 🔼 Increase / 🔽 Decrease quantity
  const updateQuantity = (productId, action) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty =
              action === "increase"
                ? item.quantity + 1
                : item.quantity - 1;

            if (newQty <= 0) {
              toast.error("Product removed from cart ❌");
              return null;
            }

            action === "increase"
              ? toast.info("Quantity increased ➕")
              : toast.warning("Quantity decreased ➖");

            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // ❌ Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.error("Product removed from cart 🗑️");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
