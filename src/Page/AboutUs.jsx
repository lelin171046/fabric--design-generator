const team = [
  {
    name: "Md Moniruzzaman",
    role: "Developer",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "Isteak",
    role: "Team Member",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "Bijoy",
    role: "Team Member",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "Iqbal",
    role: "Team Member",
    img: "https://via.placeholder.com/150",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      
      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-gray-600 mt-2">
          We developed this AI-based design system as our thesis project at
          Rangpur Textile Engineering College.
        </p>
      </div>

      {/* TEAM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {team.map((member, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:scale-105 transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-3"
            />

            <h2 className="font-semibold text-lg">{member.name}</h2>
            <p className="text-gray-500 text-sm">{member.role}</p>
          </div>
        ))}
      </div>

      {/* FOOT TEXT */}
      <div className="text-center mt-10 text-gray-600 max-w-2xl mx-auto">
        <p>
          This project focuses on integrating Artificial Intelligence with
          textile engineering to generate fabric structures, design patterns,
          and apparel graphics efficiently.
        </p>
      </div>
    </div>
  );
}