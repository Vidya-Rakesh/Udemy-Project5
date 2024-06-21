import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

/*const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]; this was the initial array... we changed it into dynamic one using */

export default function App() {
  const [items, setItems] = useState(
    []
  ); /* Lifted the state up to parent of both form and packing component */

  function handleAddItems(item) {
    setItems((items) => [
      ...items,
      item,
    ]); /* lifted the state function to parent comp*/
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure that you want to delete all the items in the list?"
    );
    if (!confirmed) return;
    /*setItems((items) => []); or u can write as*/
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/*passing the state handling function to child comp (Form) from parent comp app as a prop*/}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItem={handleClearItems}
      />
      {/* passing state(items) as prop to child comp packinglist from parent comp App and also state handling fns*/}
      <Stats items={items} />
    </div>
  );
}
