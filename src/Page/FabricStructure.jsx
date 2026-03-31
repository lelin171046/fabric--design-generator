import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Sparkles, Download, Send, Loader2, Image as ImageIcon } from "lucide-react"; // Nice icons
import { createTiledPattern } from "../tile";

export default function FabricAgent() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null); // Stores { image, tiled }

  const handleGenerate = async () => {
    if (!prompt) return toast.error("Please describe the fabric.");

    setIsGenerating(true);
    const loadingToast = toast.loading("Agent is conceptualizing design...");

    try {
      // We parse the natural language prompt or just send it as 'fabricType'
      const res = await axios.post("http://localhost:5000/generate", {
        fabricType: prompt,
        designType: "fabric",
        pattern: "custom", // Defaulting logic for the agent
      });

      const tiledImage = await createTiledPattern(res.data.image);
      
      setResult({
        original: res.data.image,
        tiled: tiledImage,
      });

      toast.success("Design synthesized successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Generation failed. Please try a different prompt.", { id: loadingToast });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = result.original;
    link.download = "agent-design.png";
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-black p-2 rounded-xl">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Fabric Design Agent</h1>
          <p className="text-sm text-slate-500">Describe textures, weaves, or patterns.</p>
        </div>
      </div>

      {/* Main Agent Interface */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Output Area */}
        <div className="min-h-[300px] p-6 flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50/50">
          {!result && !isGenerating && (
            <div className="text-center">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400">Your generated fabric will appear here.</p>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-black animate-spin" />
              <p className="text-sm font-medium animate-pulse text-slate-600">
                Interpreting patterns and weaving pixels...
              </p>
            </div>
          )}

          {result && !isGenerating && (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="relative group">
                <img 
                  src={result.original} 
                  alt="Generated fabric" 
                  className="rounded-lg shadow-lg max-h-80 object-cover border-4 border-white"
                />
                <button 
                  onClick={downloadImage}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <Download className="w-5 h-5 text-slate-700" />
                </button>
              </div>
              <div className="flex justify-center gap-2">
                 <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600 font-mono">Tiled Pattern Ready</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white">
          <div className="relative flex items-center">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g., 'A navy blue herringbone weave with gold silk threads'..."
              className="w-full pl-4 pr-14 py-4 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="absolute right-2 p-3 bg-black text-white rounded-lg disabled:bg-slate-300 hover:bg-slate-800 transition-colors"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="mt-3 text-[10px] text-center text-slate-400 uppercase tracking-widest font-semibold">
            AI-Powered Fabric Synthesis v1.0
          </p>
        </div>
      </div>
    </div>
  );
}