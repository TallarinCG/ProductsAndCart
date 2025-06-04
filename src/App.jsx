import { useState } from "react";
import "./App.css";
import Productos from "./data/productos.json";

function Items({ name, img, onAdd, onRemove, quantity }) {
  return (
    <div className="item">
      <img src={img} alt={name} />
      {quantity === 0 ? (
        <div
          className="buttonDiv"
          style={{
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
          }}
          onClick={onAdd}
        >
          Add to cart
        </div>
      ) : (
        <div className="buttonDiv" style={{ justifyContent: "space-between" }}>
          <button onClick={onRemove}>-</button>
          <p className="count">{quantity}</p>
          <button onClick={onAdd}>+</button>
        </div>
      )}
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState({});

  const handleAdd = (name) => {
    setCartItems((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  const handleRemove = (name) => {
    setCartItems((prev) => {
      const current = prev[name] || 0;
      if (current <= 1) {
        const { [name]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [name]: current - 1 };
      }
    });
  };

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  if (totalItems > 0) {
    document.title = `Cart (${totalItems})`;
  }

  return (
    <div id="content">
      <section id="items">
        <h1 id="titleItems">Desserts</h1>
        <div id="items-obj">
          {Productos.map((item, index) => (
            <Items
              key={index}
              name={item.name}
              img={item.img}
              quantity={cartItems[item.name] || 0}
              onAdd={() => handleAdd(item.name)}
              onRemove={() => handleRemove(item.name)}
            />
          ))}
        </div>
      </section>
      <section id="cart">
        <h2>Your cart ({totalItems})</h2>
      </section>
    </div>
  );
}

export default App;
