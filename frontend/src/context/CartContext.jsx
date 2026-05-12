import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {

  const [cart, setCart] =
    useState(() => {

      const savedCart =
        localStorage.getItem(
          "campus-cart"
        );

      return savedCart
        ? JSON.parse(savedCart)
        : [];

    });

  // SAVE CART
  useEffect(() => {

    localStorage.setItem(
      "campus-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // ADD TO CART
  const addToCart = (food) => {

    const existingItem =
      cart.find(
        (item) =>
          item._id === food._id &&
          item.flavour ===
            food.flavour
      );

    // ITEM EXISTS
    if (existingItem) {

      // STOCK LIMIT
      if (
        existingItem.quantity >=
        food.stock
      ) {

        alert(
          "Maximum stock reached"
        );

        return;

      }

      const updatedCart =
        cart.map((item) => {

          if (
            item._id ===
              food._id &&
            item.flavour ===
              food.flavour
          ) {

            return {
              ...item,
              quantity:
                item.quantity + 1,
            };

          }

          return item;

        });

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);

    }

  };

  // INCREASE QUANTITY
  const increaseQuantity =
    (index) => {

      const updatedCart = [
        ...cart,
      ];

      if (
        updatedCart[index]
          .quantity >=
        updatedCart[index].stock
      ) {

        alert(
          "Maximum stock reached"
        );

        return;

      }

      updatedCart[index]
        .quantity += 1;

      setCart(updatedCart);

    };

  // DECREASE QUANTITY
  const decreaseQuantity =
    (index) => {

      const updatedCart = [
        ...cart,
      ];

      if (
        updatedCart[index]
          .quantity > 1
      ) {

        updatedCart[index]
          .quantity -= 1;

        setCart(updatedCart);

      } else {

        removeFromCart(index);

      }

    };

  // REMOVE ITEM
  const removeFromCart =
    (index) => {

      const updatedCart =
        cart.filter(
          (_, i) => i !== index
        );

      setCart(updatedCart);

    };

  // CLEAR CART
  const clearCart = () => {

    setCart([]);

  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

};