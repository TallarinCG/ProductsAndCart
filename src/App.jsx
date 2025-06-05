import { useState } from "react";
import "./App.css";
import Productos from "./data/data.json";

function CartControls({ count, onAdd, onRemove }) {
  if (count === 0) {
    return (
      <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-10 flex items-center rounded-3xl border-[#b6381b] bg-white cursor-pointer py-3 px-8 gap-2 shadow-md border-[1px] w-max">
        <img src="/icon-add-to-cart.svg" alt="" />
        Add to Cart
      </div>
    );
  }
  return (
    <div className="buttonDiv" style={{ justifyContent: "space-between" }}>
      <button onClick={onRemove}>-</button>
      <p className="count">{count}</p>
      <button onClick={onAdd}>+</button>
    </div>
  );
}

function Items({ id, img, name, category, price, count, onAdd, onRemove }) {
  return (
    <div className="flex flex-col items-center max-w-fit">
      <div className="relative">
        <img src={img} alt={name} className="rounded-2xl w-[300px] block" />
        <CartControls count={0} onAdd={onAdd} onRemove={onRemove} />
      </div>

      <div className="w-full my-10">
        <p className="text-[#a88e86]">{category}</p>
        <p className=" text-[18px] font-medium">{name}</p>
        <p className=" text-[#b6381b]">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex">
      <section className="desserts">
        <h1 className=" font-bold text-4xl">Desserts</h1>
        <div className="grid grid-cols-3 gap-6">
          {Productos.map((i, index) => {
            return (
              <Items
                key={index}
                id={i}
                img={i.image.desktop}
                name={i.name}
                category={i.category}
                price={i.price}
              />
            );
          })}
        </div>
      </section>
      <section className="cart">
        <h2 className="text-[#b6381b] font-bold text-3xl">You Cart (0)</h2>
      </section>
    </div>
  );
}
