import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showSecureFields, setShowSecureFields] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  // Animation Variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    },
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      setFileUploadError(false);
      setFilePerc(0);
      const data = new FormData();
      data.append('avatar', file);

      const res = await fetch(`/api/user/upload-avatar/${currentUser._id}`, {
        method: 'POST',
        body: data,
      });
      setFilePerc(100); 
      const resData = await res.json();
      if (resData.success === false) {
        setFileUploadError(true);
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: resData.avatarUrl }));
      setFileUploadError(false);
    } catch (err) {
      setFileUploadError(true);
      setFilePerc(0);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (id === 'email' || id === 'password') {
      setShowSecureFields(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your password validation logic can go here
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    // --- Centering container ---
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="w-full p-8 space-y-4 bg-white rounded-2xl shadow-xl"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-500 text-sm">Update your personal details.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mx-auto group cursor-pointer" onClick={() => fileRef.current.click()}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="p-1 rounded-full bg-transparent group-hover:bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 transition-all duration-300"
            >
              <div className="p-1 bg-white rounded-full">
                <img
                  src={formData.avatar || currentUser.avatar}
                  alt="Profile"
                  className="rounded-full w-28 h-28 object-cover shadow-sm"
                />
              </div>
            </motion.div>
            <input 
              type="file" ref={fileRef} hidden accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </motion.div>
          
          <motion.p variants={itemVariants} className='text-sm self-center text-center h-4'>
            {fileUploadError && <span className='text-red-700'>Error Uploading Image</span>}
            {filePerc > 0 && filePerc < 100 && <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>}
            {filePerc === 100 && !fileUploadError && <span className='text-green-700'>Image Uploaded!</span>}
          </motion.p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <motion.div variants={itemVariants} className="relative">
              <input type="text" id="username" defaultValue={currentUser.username} onChange={handleChange} className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors duration-300" placeholder=" "/>
              <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">Username</label>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <input type="email" id="email" defaultValue={currentUser.email} onChange={handleChange} onFocus={() => setShowSecureFields(true)} className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors duration-300" placeholder=" "/>
              <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">Email</label>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <input type="password" id="password" onChange={handleChange} onFocus={() => setShowSecureFields(true)} className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors duration-300" placeholder=" "/>
              <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">New Password</label>
            </motion.div>

            <AnimatePresence>
              {showSecureFields && (
                <>
                  <motion.div key="currentPassword" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="relative">
                    <input type="password" id="currentPassword" onChange={handleChange} required className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer transition-colors duration-300" placeholder=" "/>
                    <label htmlFor="currentPassword" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">Current Password (Required)</label>
                  </motion.div>
                  
                  <motion.div key="confirmPassword" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }} className="relative">
                    <input type="password" id="confirmPassword" onChange={handleChange} className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors duration-300" placeholder=" "/>
                    <label htmlFor="confirmPassword" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">Confirm New Password</label>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <motion.button variants={itemVariants} type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300">
              Update Profile
            </motion.button>
          </form>
          
          <motion.p variants={itemVariants} className='text-red-700 mt-5 text-center h-5'>{error ? error : ''}</motion.p>
          <motion.p variants={itemVariants} className='text-green-700 mt-5 text-center h-5'>
            {updateSuccess ? 'Profile updated successfully!' : ''}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}