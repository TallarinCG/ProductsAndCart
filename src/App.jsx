import { useState } from "react";
import "./App.css";
import Productos from "./data/data.json";

function Cart({ totalCart, items }) {
  if (totalCart === 0) {
    return (
      <div className="bg-white w-fit rounded-3xl p-10 min-w-md flex flex-col gap-10">
        <h2 className="text-[#b6381b] font-bold text-3xl">
          Your Cart({totalCart})
        </h2>
        <div className="flex flex-col items-center justify-center">
          <img src="/illustration-empty-cart.svg" alt="" />
          <p className="text-[#a88e86] text-center mt-10 font-bold">
            Your added items will appear here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 w-fit min-w-md bg-white rounded-3xl p-10">
      <h2 className="text-[#b6381b] font-bold text-3xl ">
        Your Cart({totalCart})
      </h2>
      <div className="flex flex-col gap-5">
        {Object.entries(items).map(([name, cantidad]) => {
          if (cantidad <= 0) return null;

          return (
            <div
              key={name}
              className="flex justify-between gap-1 items-center border-b-[1px] border-[#c7b4aa] pb-5"
            >
              <div className="flex justify-between flex-col gap-2">
                <p className="font-semibold">{name}</p>
                <div className="flex items-center gap-5">
                  <p className="text-[#b6381b] font-semibold">{cantidad}x</p>
                  <p className="text-[#a88e86]">
                    @$
                    {Productos.find((producto) => producto.name === name).price}
                  </p>
                  <p>
                    {Productos.find((producto) => producto.name === name)
                      .price * cantidad}
                    $
                  </p>
                </div>
              </div>
              <div>
                <button className="cursor-pointer">
                  <img
                    src="/icon-remove-item.svg"
                    alt=""
                    className="w-5 h-5 border-[1px] border-[#a88e86] rounded-full"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex  justify-center items-center gap-2 bg-[#fdf5f0] py-4 rounded-xl">
        <img src="/icon-carbon-neutral.svg" alt="" className="" />
        This is a <span className="font-semibold">carbon-neutral</span> delivery
      </div>
    </div>
  );
}

function CartControls({ count, onAdd, onRemove }) {
  if (count === 0) {
    return (
      <div
        className="absolute left-1/2 bottom-0 translate-x-[-50%] justify-center translate-y-1/2 z-10 flex items-center rounded-3xl border-[#b6381b] bg-white cursor-pointer w-[60%] gap-2 shadow-md border-[1px] h-[50px] font-medium"
        onClick={onAdd}
      >
        <img src="/icon-add-to-cart.svg" alt="" />
        Add to Cart
      </div>
    );
  }
  return (
    <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-10 flex items-center rounded-3xl border-[transparent] bg-red-500 shadow-md border-[1px] w-[60%] h-[50px] justify-around gap-5">
      <button
        onClick={onRemove}
        className="cursor-pointer bg-red-500 relative h-full w-full rounded-full flex items-center justify-center"
      >
        <img src="/icon-decrement-quantity.svg" alt="" />
      </button>
      <p className=" cursor-context-menu w-full text-center text-white">
        {count}
      </p>
      <button
        onClick={onAdd}
        className="cursor-pointer bg-red-500 relative h-full w-full rounded-full flex items-center justify-center"
      >
        <img src="/icon-increment-quantity.svg" alt="" />
      </button>
    </div>
  );
}

function Items({ id, img, name, category, price, count, onAdd, onRemove }) {
  return (
    <div className="flex flex-col items-center max-w-fit">
      <div className="relative">
        <img src={img} alt={name} className="rounded-2xl w-[300px] block" />
        <CartControls count={count} onAdd={onAdd} onRemove={onRemove} />
      </div>

      <div className="w-full my-10">
        <p className="text-[#a88e86]">{category}</p>
        <p className=" text-[18px] font-medium">{name}</p>
        <p className=" text-[#b6381b] font-medium">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState({});

  function handleAdd(name) {
    setCount((prevCount) => ({
      ...prevCount,
      [name]: (prevCount[name] || 0) + 1,
    }));
  }

  function handleRemove(name) {
    setCount((prev) => {
      const current = prev[name] || 0;
      return { ...prev, [name]: current - 1 };
    });
  }

  const result = Object.values(count).reduce((acc, curr) => acc + curr, 0);

  return (
    <div
      className="flex mx-30 my-10 justify-center gap-10 bg-[#fdf5f0] rounded-2xl
    py-20"
    >
      <section className="desserts">
        <h1 className=" font-bold text-4xl">Desserts</h1>
        <div className="grid grid-cols-3 gap-6 my-10">
          {Productos.map((i) => {
            return (
              <Items
                key={i.name}
                id={i}
                img={i.image.desktop}
                name={i.name}
                category={i.category}
                price={i.price}
                count={count[i.name] || 0}
                onAdd={() => handleAdd(i.name)}
                onRemove={() => handleRemove(i.name)}
              />
            );
          })}
        </div>
      </section>
      <section className="cart">
        <Cart totalCart={result} items={count} />
      </section>
    </div>
  );
}
