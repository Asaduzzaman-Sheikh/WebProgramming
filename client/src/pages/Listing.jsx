// Import necessary hooks and components
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair, FaShare, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Listing() {
  // Hooks for accessing URL parameters, navigation, and Redux state
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // State variables for the component
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch listing data when the component mounts or listingId changes
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Handler for the contact message input
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Handlers for navigating the image slider
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.imageUrls.length - 1 : prevIndex - 1
    );
  };

  // Main component render
  return (
    <main className="min-h-screen">
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <div className='text-center my-7 text-2xl'>
            <p>Something went wrong!</p>
            <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Go Home</button>
        </div>
      )}

      {listing && !loading && !error && (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            {/* Image Slider Section */}
            <div className="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-2xl shadow-lg mb-6">
                <motion.img
                    key={currentImageIndex}
                    src={listing.imageUrls[currentImageIndex]}
                    alt="listing image"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0.5, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                {listing.imageUrls.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-md hover:bg-white transition">
                            <FaArrowLeft className="text-slate-700"/>
                        </button>
                        <button onClick={nextImage} className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-md hover:bg-white transition">
                            <FaArrowRight className="text-slate-700"/>
                        </button>
                    </>
                )}
                 <div className='absolute top-3 right-3 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                    <FaShare
                        className='text-slate-500'
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}
                    />
                </div>
                {copied && (
                    <p className='fixed top-[13%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link copied!</p>
                )}
            </div>

            {/* Listing Details Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                    {listing.name} - ${' '}
                    {listing.offer
                        ? listing.discountPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                </h1>
                <p className='flex items-center mt-4 gap-2 text-slate-600  text-sm mb-4'>
                    <FaMapMarkerAlt className='text-green-700' />
                    {listing.address}
                </p>
                <div className='flex gap-4 mb-6'>
                    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {listing.offer && (
                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        ${+listing.regularPrice - +listing.discountPrice} OFF
                    </p>
                    )}
                </div>

                <p className='text-slate-800 mb-6'>
                    <span className='font-semibold text-black'>Description - </span>
                    {listing.description}
                </p>

                {/* Amenities Section */}
                <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mb-6'>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaBed className='text-lg' />
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaBath className='text-lg' />
                        {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaParking className='text-lg' />
                        {listing.parking ? 'Parking spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaChair className='text-lg' />
                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                    </li>
                </ul>

                {/* Contact Landlord Section - Conditionally rendered */}
                {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button onClick={() => setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full'>
                        Contact landlord
                    </button>
                )}
                {contact && (
                    <div className="flex flex-col gap-4 mt-6">
                         <p>Contact <span className="font-semibold">{listing.userRef.name || 'the landlord'}</span> for <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
                         <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder="Enter your message here..." className="w-full border p-3 rounded-lg"></textarea>
                         <a href={`mailto:${listing.userRef.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
                             Send Message
                         </a>
                    </div>
                )}
            </div>
        </div>
      )}
    </main>
  );
}

