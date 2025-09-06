import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

export default function Home() {
  // --- FIX: Corrected the typo from _useState to = useState ---
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [isSwiperVisible, setIsSwiperVisible] = useState(false);
  SwiperCore.use([Navigation, Autoplay, EffectFade]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const offerPromise = fetch('/api/listing/getListings?offer=true&limit=4').then(res => res.json());
        const rentPromise = fetch('/api/listing/getListings?type=rent&limit=4').then(res => res.json());
        const salePromise = fetch('/api/listing/getListings?type=sale&limit=4').then(res => res.json());

        const [offerData, rentData, saleData] = await Promise.all([
          offerPromise,
          rentPromise,
          salePromise,
        ]);

        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
        
        setTimeout(() => setIsSwiperVisible(true), 100);

      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <div className='flex flex-col items-center justify-center text-center px-4 py-20'>
        <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-slate-900'>
          Your Trusted Home Awaits.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mt-2">
            Verified Listings. Total Peace of Mind.
          </span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-slate-600 mt-4 mb-8">
          Search with confidence. We meticulously verify every property so you can focus on finding the perfect, secure place to call home.
        </p>
        <Link
          to={'/search'}
          className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-bold text-lg rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Find Your SafeHouse
          <ArrowRightIcon />
        </Link>
      </div>

      {/* 2. DYNAMIC SWIPER CAROUSEL WITH NO PADDING */}
      <div className={`max-w-6xl mx-auto my-10 bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-1000 ease-in-out overflow-hidden ${isSwiperVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className='relative'>
          <Swiper
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            effect="fade"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className='h-[500px]'
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className='swiper-button-prev-custom absolute top-1/2 left-4 z-10 p-2 rounded-full bg-white/70 shadow-md cursor-pointer transition-all hover:bg-white hover:scale-110'>
            <FaChevronLeft className='text-slate-800 text-lg' />
          </div>
          <div className='swiper-button-next-custom absolute top-1/2 right-4 z-10 p-2 rounded-full bg-white/70 shadow-md cursor-pointer transition-all hover:bg-white hover:scale-110'>
            <FaChevronRight className='text-slate-800 text-lg' />
          </div>
        </div>
      </div>

      {/* 3. LISTING RESULTS SECTIONS */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-12 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3 flex justify-between items-center'>
              <h2 className='text-2xl font-semibold text-slate-700'>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3 flex justify-between items-center'>
              <h2 className='text-2xl font-semibold text-slate-700'>Recent Places for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3 flex justify-between items-center'>
              <h2 className='text-2xl font-semibold text-slate-700'>Recent Places for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}