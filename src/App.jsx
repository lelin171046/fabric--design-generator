import { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    fabricType: "woven",
    pattern: "geometric",
    color: "blue",
  });
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/generate", form);
    setImage(res.data.image);
  };

  return (
    <div className="p-6">
      <select onChange={(e) => setForm({ ...form, fabricType: e.target.value })}>
        <option>woven</option>
        <option>knit</option>
      </select>

      <select onChange={(e) => setForm({ ...form, pattern: e.target.value })}>
        <option>geometric</option>
        <option>floral</option>
      </select>

      <input
        placeholder="color"
        onChange={(e) => setForm({ ...form, color: e.target.value })}
      />

      <button onClick={handleSubmit}>Generate</button>

      {image && <img src={image} alt="fabric design" />}
    </div>
  );
}