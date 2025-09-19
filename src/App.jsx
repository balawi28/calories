import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const foodItems = [
  { name: "Zsemle bread (60g)", calories: 160 },
  { name: "Cup of milk (270ml)", calories: 135 },
  { name: "Butter (50g)", calories: 335 },
  { name: "Chicken breast (100g)", calories: 165 },
  { name: "Olive oil (10g)", calories: 90 },
  { name: "Mars (50g)", calories: 220 },
  { name: "Tea & Milk (500ml, 50g Powder Milk, 17g Sugar)", calories: 315 },
];

export default function App() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [consumed, setConsumed] = useState([]);

  const addItem = (item) => {
    const existing = consumed.find((f) => f.name === item.name);
    if (existing) {
      setConsumed(
        consumed.map((f) =>
          f.name === item.name ? { ...f, count: f.count + 1 } : f
        )
      );
    } else {
      setConsumed([...consumed, { ...item, count: 1 }]);
    }
  };

  const increaseCount = (name) => {
    setConsumed(
      consumed.map((f) =>
        f.name === name ? { ...f, count: f.count + 1 } : f
      )
    );
  };

  const decreaseCount = (name) => {
    setConsumed(
      consumed
        .map((f) =>
          f.name === name ? { ...f, count: Math.max(f.count - 1, 0) } : f
        )
        .filter((f) => f.count > 0)
    );
  };

  const removeItem = (name) => {
    setConsumed(consumed.filter((f) => f.name !== name));
  };

  const clearAll = () => {
    setConsumed([]);
  };

  const totalCalories = consumed.reduce(
    (sum, item) => sum + item.calories * item.count,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Calorie Tracker</h1>
      <p className="text-gray-600 mb-6">{today}</p>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <div className="flex gap-2 mb-4">
          <select
            className="flex-grow border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              const item = foodItems.find((f) => f.name === e.target.value);
              if (item) addItem(item);
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Select a food item
            </option>
            {foodItems.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name} ({item.calories} cal)
              </option>
            ))}
          </select>
          <button
            onClick={clearAll}
            className="bg-red-500 text-white px-3 py-2 rounded-xl shadow hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        <ul className="space-y-3 mb-4">
          {consumed.map((item) => (
            <li
              key={item.name}
              className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2 shadow"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.count} × {item.calories} cal = {item.count * item.calories} cal
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseCount(item.name)}
                  className="p-1 text-gray-600 hover:text-blue-600"
                >
                  <Minus size={18} />
                </button>
                <button
                  onClick={() => increaseCount(item.name)}
                  className="p-1 text-gray-600 hover:text-blue-600"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={() => removeItem(item.name)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">Total Calories</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-1">
            {totalCalories}
          </p>
        </div>
      </div>
    </div>
  );
}
