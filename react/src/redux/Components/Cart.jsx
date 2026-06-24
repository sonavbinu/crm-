import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  return (
    <div className="flex flex-col  items-center justify-center mt-10">
      <h2 className="text-2xl font-bold mb-10">Shoping Cart</h2>
      <div className="flex justify-between gap-10 mb-2">
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-400 cursor-pointer"
          onClick={() =>
            dispatch(
              addToCart({
                id: 1,
                name: "Laptop",
                price: 50000,
              }),
            )
          }
        >
          Add laptop
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 cursor-pointer"
          onClick={() =>
            dispatch(
              addToCart({
                id: 2,
                name: "Iphone",
                price: 70000,
              }),
            )
          }
        >
          Add Mobile
        </button>
        <button
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400 cursor-pointer"
          onClick={() =>
            dispatch(
              addToCart({
                id: 3,
                name: "headPhone",
                price: 2000,
              }),
            )
          }
        >
          Add Headphone
        </button>
      </div>

      <ul className="flex flex-col gap-2 justify-between">
        {items.map((item) => (
          <li
            key={item.id}
            className="border border-gray-300 rounded p-2 flex items-center justify-between w-100"
          >
            {item.name} - Rs{item.price}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="bg-red-500  text-white p-2 cursor-pointer hover:bg-red-400"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
