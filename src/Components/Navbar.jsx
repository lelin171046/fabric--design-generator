import { NavLink } from "react-router-dom";

export default function Navbar() {
  // Utility for clean active link styling
  const navStyle = ({ isActive }) => 
    `hover:text-blue-400 transition-colors ${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-white"}`;

  return (
    <nav className="bg-black/90 backdrop-blur-md text-white p-4 flex justify-between items-center sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center gap-2">
        {/* You could add a small icon here later */}
        <h1 className="font-bold text-2xl md:text-3xl tracking-tighter italic">
          AI TEXTILE <span className="text-blue-500">LAB</span>
        </h1>
      </div>

      <div className="flex space-x-6 font-medium text-sm uppercase tracking-widest">
        <NavLink to="/" className={navStyle}>
          Fabric Structure
        </NavLink>
        <NavLink to="/design" className={navStyle}>
          Design Studio
        </NavLink>
        <NavLink to="/AboutUs" className={navStyle}>
          About Us
        </NavLink>
      </div>
    </nav>
  );
}