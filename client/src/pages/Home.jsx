import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
// 1. Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

// 2. Import Swiper styles
import "swiper/css/bundle";

export default function Home() {
  SwiperCore.use([Navigation]);
  // In a real app, you would fetch this data from your backend
  const offers = [
    /* placeholder for offer listings */
  ];
  const rentListings = [
    /* placeholder for rent listings */
  ];
  const saleListings = [
    /* placeholder for sale listings */
  ];

  return (
    <main>
      {/* 1. HERO BANNER */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-slate-900">
          Welcome to SafeHouse
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mt-2">
            Your Sanctuary of Safety & Security.
          </span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-slate-600 mt-4 mb-8">
          We provide cutting-edge solutions and expert guidance to protect what
          matters most. Explore our services to find peace of mind.
        </p>
        <Link
          to="/search"
          className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Explore Our Services
          <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 2. SWIPER / CAROUSEL */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        <Swiper navigation>
          {/* In a real app, you would map over your featured listings here */}
          {[1, 2, 3, 4].map((_, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(https://source.unsplash.com/random/1200x600?house,${index}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 3. LISTING RESULTS FOR OFFERS, SALE, AND RENT */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {/* Recent Offers Section */}
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent offers
            </h2>
            <Link
              to={"/search?offer=true"}
              className="text-sm text-blue-800 hover:underline"
            >
              Show more offers
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* You would map over your 'offers' array here to display listing cards */}
            <p className="text-slate-500">Offer listings will be shown here.</p>
          </div>
        </div>

        {/* Recent Places for Rent Section */}
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent places for rent
            </h2>
            <Link
              to={"/search?type=rent"}
              className="text-sm text-blue-800 hover:underline"
            >
              Show more places for rent
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* You would map over your 'rentListings' array here */}
            <p className="text-slate-500">
              Listings for rent will be shown here.
            </p>
          </div>
        </div>

        {/* Recent Places for Sale Section */}
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent places for sale
            </h2>
            <Link
              to={"/search?type=sale"}
              className="text-sm text-blue-800 hover:underline"
            >
              Show more places for sale
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* You would map over your 'saleListings' array here */}
            <p className="text-slate-500">
              Listings for sale will be shown here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}