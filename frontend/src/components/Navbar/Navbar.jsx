import { Link, NavLink } from "react-router-dom";
import {
  Clapperboard,
  House,
  Flame,
  Heart,
  Bookmark,
  Search,
  Moon,
  UserCircle2,
  Menu,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      title: "Home",
      icon: House,
      path: "/",
    },
    {
      title: "Trending",
      icon: Flame,
      path: "/",
    },
    {
      title: "Favorites",
      icon: Heart,
      path: "/favorites",
    },
    {
      title: "Watchlist",
      icon: Bookmark,
      path: "/watchlist",
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-20">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">

            <Clapperboard size={28} />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">

              Movie<span className="text-red-500">AI</span>

            </h1>

            <p className="text-xs text-slate-400">

              Recommendation System

            </p>

          </div>

        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? "text-red-500"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                {item.title}

              </NavLink>

            );
          })}

        </nav>

        {/* Right */}

        <div className="hidden lg:flex items-center gap-4">

          <button
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition"
          >
            <Search size={20} />
          </button>

          <button
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition"
          >
            <Moon size={20} />
          </button>

          <button
            className="w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center"
          >
            <UserCircle2 size={24} />
          </button>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
        >
          <Menu />
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (

        <div className="lg:hidden bg-slate-900 border-t border-slate-800">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4 px-6 py-5 hover:bg-slate-800"
              >
                <Icon size={20} />

                {item.title}

              </NavLink>

            );
          })}

        </div>

      )}

    </header>
  );
};

export default Navbar;



// import { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Clapperboard,
//   House,
//   Flame,
//   Heart,
//   Bookmark,
//   Search,
//   Moon,
//   UserCircle2,
//   Menu,
//   X,
// } from "lucide-react";

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     window.addEventListener("scroll", onScroll);

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const navItems = [
//     {
//       title: "Home",
//       icon: House,
//       path: "/",
//     },
//     {
//       title: "Trending",
//       icon: Flame,
//       path: "/",
//     },
//     {
//       title: "Favorites",
//       icon: Heart,
//       path: "/favorites",
//     },
//     {
//       title: "Watchlist",
//       icon: Bookmark,
//       path: "/watchlist",
//     },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled
//           ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl"
//           : "bg-gradient-to-b from-black/70 to-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-10">

//         <div className="flex items-center justify-between h-20">

//           {/* Logo */}

//           <Link
//             to="/"
//             className="flex items-center gap-4"
//           >
//             <motion.div
//               whileHover={{ rotate: -8, scale: 1.08 }}
//               transition={{ duration: 0.3 }}
//               className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg"
//             >
//               <Clapperboard size={28} className="text-white" />
//             </motion.div>

//             <div>
//               <h1 className="text-2xl font-extrabold tracking-wide text-white">
//                 Movie
//                 <span className="text-red-500">AI</span>
//               </h1>

//               <p className="text-xs text-slate-400">
//                 AI Recommendation Engine
//               </p>
//             </div>
//           </Link>

//           {/* Desktop */}

//           <nav className="hidden lg:flex items-center gap-10">

//             {navItems.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <NavLink
//                   key={item.title}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `relative flex items-center gap-2 font-medium transition-all duration-300 ${
//                       isActive
//                         ? "text-red-500"
//                         : "text-slate-300 hover:text-white"
//                     }`
//                   }
//                 >
//                   {({ isActive }) => (
//                     <>
//                       <Icon size={18} />

//                       <span>{item.title}</span>

//                       {isActive && (
//                         <motion.div
//                           layoutId="navbar-indicator"
//                           className="absolute -bottom-7 left-0 right-0 h-[3px] rounded-full bg-red-500"
//                         />
//                       )}
//                     </>
//                   )}
//                 </NavLink>
//               );
//             })}
//           </nav>

//           {/* Right */}

//           <div className="hidden lg:flex items-center gap-3">

//             <button
//               className="w-11 h-11 rounded-full bg-slate-800/80 hover:bg-red-600 transition duration-300 flex items-center justify-center"
//             >
//               <Search size={19} />
//             </button>

//             <button
//               className="w-11 h-11 rounded-full bg-slate-800/80 hover:bg-yellow-500 transition duration-300 flex items-center justify-center"
//             >
//               <Moon size={19} />
//             </button>

//             <button
//               className="w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition flex items-center justify-center"
//             >
//               <UserCircle2 size={23} />
//             </button>

//           </div>

//           {/* Mobile */}

//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden text-white"
//           >
//             {mobileOpen ? (
//               <X size={30} />
//             ) : (
//               <Menu size={30} />
//             )}
//           </button>

//         </div>

//       </div>

//       {/* Mobile Menu */}

//       <AnimatePresence>

//         {mobileOpen && (

//           <motion.div
//             initial={{ opacity: 0, y: -25 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -25 }}
//             transition={{ duration: 0.25 }}
//             className="lg:hidden bg-slate-950 border-t border-slate-800"
//           >

//             <div className="flex flex-col py-4">

//               {navItems.map((item) => {

//                 const Icon = item.icon;

//                 return (

//                   <NavLink
//                     key={item.title}
//                     to={item.path}
//                     onClick={() => setMobileOpen(false)}
//                     className={({ isActive }) =>
//                       `flex items-center gap-4 px-6 py-4 transition ${
//                         isActive
//                           ? "bg-red-600/20 text-red-500"
//                           : "text-slate-300 hover:bg-slate-800"
//                       }`
//                     }
//                   >
//                     <Icon size={20} />

//                     {item.title}

//                   </NavLink>

//                 );
//               })}

//               <div className="flex justify-center gap-5 mt-5 pb-5">

//                 <button className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center">
//                   <Search size={20} />
//                 </button>

//                 <button className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center">
//                   <Moon size={20} />
//                 </button>

//                 <button className="w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
//                   <UserCircle2 size={22} />
//                 </button>

//               </div>

//             </div>

//           </motion.div>

//         )}

//       </AnimatePresence>

//     </header>
//   );
// };

// export default Navbar;