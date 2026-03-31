import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message
    setMessages((prev) => [...prev, { type: "text", value: input }]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        designType: "tshirt",
        theme: input,
      });

      // add AI image
      setMessages((prev) => [
        ...prev,
        { type: "image", value: res.data.image },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (img) => {
    const link = document.createElement("a");
    link.href = img;
    link.download = "design.png";
    link.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.type === "text" ? "justify-end" : "justify-start"
            }`}
          >
            {/* TEXT MESSAGE */}
            {msg.type === "text" && (
              <div className="bg-black text-white px-4 py-2 rounded-xl max-w-xs">
                {msg.value}
              </div>
            )}

            {/* IMAGE MESSAGE */}
            {msg.type === "image" && (
              <div className="bg-white p-3 rounded-xl shadow max-w-xs">
                <img src={msg.value} className="rounded" />
                <button
                  onClick={() => downloadImage(msg.value)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        ))}

        {/* LOADER */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-xl shadow animate-pulse">
              Generating...
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Make a t-shirt design..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}