import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/");

  };

  const modules = [
    {
      title: "Canteen",
      desc:
        "Order food and track live status.",
      emoji: "🍽️",
      route: "/canteen",
      available: true,
    },
    {
      title: "Library",
      desc:
        "Check seat availability and books.",
      emoji: "📚",
      route: "/library",
      available: true,
    },
    {
      title: "Bus Timetable",
      desc:
        "View campus bus schedules.",
      emoji: "🚌",
      route: "/bus",
      available: true,
    },
    {
      title: "Stationery",
      desc:
        "Order stationery essentials.",
      emoji: "✏️",
      available: false,
    },
  ];

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-14">

          <div>

            <h1 className="text-5xl font-semibold mb-3">

              Welcome,
              {" "}
              {user?.name || "Student"}

            </h1>

            <p className="text-gray-400 text-lg">

              Access all your campus services in one place.

            </p>

          </div>

          <button
            onClick={logout}
            className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Logout
          </button>

        </div>

        {/* MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {modules.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                onClick={() => {

                  if (
                    item.available &&
                    item.route
                  ) {

                    navigate(
                      item.route
                    );

                  }

                }}
                className={`rounded-3xl p-8 border transition duration-300 ${
                  item.available
                    ? "bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                    : "bg-white/[0.03] border-white/5 opacity-60 cursor-not-allowed"
                }`}
              >

                {/* ICON */}
                <div className="text-6xl mb-6">
                  {item.emoji}
                </div>

                {/* TITLE */}
                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-3xl font-semibold">

                    {item.title}

                  </h2>

                  {

                    !item.available && (

                      <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">

                        Soon

                      </span>

                    )

                  }

                </div>

                {/* DESC */}
                <p className="text-gray-400 leading-relaxed">

                  {item.desc}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}