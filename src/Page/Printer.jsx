import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  Shirt, 
  Target, 
  Wand2, 
  Download, 
  RefreshCcw, 
  Layers,
  Palette 
} from "lucide-react";

export default function DesignAgent() {
  const [designType, setDesignType] = useState("tshirt");
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [image, setImage] = useState("");

  const generateDesign = async () => {
    if (!prompt) return toast.error("Please describe your vision first.");

    setIsProcessing(true);
    const toastId = toast.loading(`Agent is sketching your ${designType}...`);

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        designType: designType,
        theme: prompt,
        style: "streetwear", // Agent default
        color: "black",      // Agent default
      });

      setImage(res.data.image);
      toast.success("Masterpiece generated!", { id: toastId });
    } catch (err) {
      toast.error("The agent encountered an error. Try again?", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadDesign = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `agent-${designType}-design.png`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen bg-[#fcfcfc] text-slate-900">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            AI TEXTILE Studio<span className="text-xs font-mono font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">v2.0</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Transform concepts into production-ready assets.</p>
        </div>

        {/* Design Type Switcher */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setDesignType("tshirt")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              designType === "tshirt" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Shirt className="w-4 h-4" /> T-Shirt
          </button>
          <button
            onClick={() => setDesignType("logo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              designType === "logo" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Target className="w-4 h-4" /> Logo
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side: Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">
              Design Intent
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cyberpunk tiger with neon accents and streetwear typography..."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed"
            />
            
            <button
              onClick={generateDesign}
              disabled={isProcessing}
              className="w-full mt-4 bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:bg-slate-300 transition-all active:scale-[0.98]"
            >
              {isProcessing ? (
                <RefreshCcw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Design
                </>
              )}
            </button>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5" />
              Agent Tip
            </h3>
            <p className="text-indigo-100 text-xs leading-relaxed">
              For better results, mention specific colors and artistic styles (e.g., "minimalist", "oil painting", "vector art").
            </p>
          </div>
        </div>

        {/* Right Side: Preview Canvas */}
        <div className="lg:col-span-3">
          <div className="aspect-square bg-white border-2 border-dashed border-slate-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center relative group">
            {!image && !isProcessing && (
              <div className="text-center p-10">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-400 font-medium">Waiting for your command...</p>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center animate-pulse">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-indigo-600 font-mono text-xs font-bold uppercase">Rendering Graphics</p>
              </div>
            )}

            {image && !isProcessing && (
              <>
                <img src={image} alt="AI Result" className="w-full h-full object-contain p-4" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={downloadDesign}
                    className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export Asset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}