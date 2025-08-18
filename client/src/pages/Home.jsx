import React from "react";
import { Link } from "react-router-dom";

// This is the animated placeholder for the carousel slide.
const AnimatedPlaceholderSlide = ({ title, subtitle, icon }) => (
  <div className="h-[500px] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex flex-col justify-center items-center relative overflow-hidden text-center">
    {/* Animated background shapes */}
    <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200/50 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200/50 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
    
    <div className="relative z-10 flex flex-col items-center">
        <div className="text-6xl text-slate-500 mb-4">{icon}</div>
        <h3 className="text-3xl font-bold text-slate-800">{title}</h3>
        <p className="text-lg text-slate-600 mt-2 max-w-sm">{subtitle}</p>
    </div>
    <style>{`
        @keyframes blob {
	        0% { transform: translate(0px, 0px) scale(1); }
	        33% { transform: translate(30px, -50px) scale(1.1); }
	        66% { transform: translate(-20px, 20px) scale(0.9); }
	        100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
    `}</style>
  </div>
);


// Inlined SVG to replace the FiArrowRight icon from react-icons
const ArrowRightIcon = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-xl transition-transform duration-300 group-hover:translate-x-1"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Placeholder for a Listing Card component
const ListingCard = ({ text }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm w-full sm:w-[250px]">
        <p className="text-slate-500">{text}</p>
    </div>
);

export default function Home() {
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
    // Replaced <main> with <> to ensure the universal background is visible
    <>
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
          <ArrowRightIcon />
        </Link>
      </div>

      {/* 2. CAROUSEL PLACEHOLDER */}
      {/* Swiper component has been replaced with a static placeholder to resolve errors. */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        <AnimatedPlaceholderSlide 
            icon={'🛡️'} 
            title={'Verified Listings'} 
            subtitle={'Every property is checked for your safety and peace of mind.'} 
        />
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
            <ListingCard text="Offer listings will be shown here." />
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
            <ListingCard text="Listings for rent will be shown here." />
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
            <ListingCard text="Listings for sale will be shown here." />
          </div>
        </div>
      </div>
    </>
  );
}
