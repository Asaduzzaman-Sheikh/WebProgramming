import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const isGoogleUser = currentUser.authMethod === 'google';

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    password: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    },
  };

  // Password validation
  useEffect(() => {
    if (formData.password && !isGoogleUser) {
      const validations = [
        { regex: /.{8,}/, message: "Be at least 8 characters long." },
        { regex: /[A-Z]/, message: "Contain at least one uppercase letter." },
        { regex: /[a-z]/, message: "Contain at least one lowercase letter." },
        { regex: /[0-9]/, message: "Contain at least one number." },
        { regex: /[^A-Za-z0-9]/, message: "Contain at least one special character." }
      ];
      for (const { regex, message } of validations) {
        if (!regex.test(formData.password)) {
          setPasswordError(`Password must: ${message}`);
          return;
        }
      }
      setPasswordError('');
    } else {
      setPasswordError('');
    }
  }, [formData.password, isGoogleUser]);

  // Handle file upload when a new file is selected
  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    setFilePerc(0);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'omrlo2vb'); // your Cloudinary preset

    try {
      setFilePerc(40);
      const res = await fetch('https://api.cloudinary.com/v1_1/dntrypsos/image/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      setFilePerc(100);
      setFormData(prev => ({ ...prev, avatar: data.secure_url }));
      setFileUploadError(false);
    } catch (err) {
      setFileUploadError(true);
      setFilePerc(0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return;

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
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
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

          {/* Avatar Upload */}
          <motion.div variants={itemVariants} className="mx-auto group cursor-pointer" onClick={() => fileRef.current.click()}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="p-1 rounded-full bg-transparent group-hover:bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 transition-all duration-300"
            >
              <div className="p-1 bg-white rounded-full">
                <img src={formData.avatar} alt="Profile" className="rounded-full w-28 h-28 object-cover shadow-sm"/>
              </div>
            </motion.div>
            <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
          </motion.div>

          <motion.p variants={itemVariants} className='text-sm self-center text-center h-4'>
            {fileUploadError && <span className='text-red-700'>Error Uploading Image</span>}
            {filePerc > 0 && filePerc < 100 && <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>}
            {filePerc === 100 && !fileUploadError && <span className='text-green-700'>Image Uploaded!</span>}
          </motion.p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Username */}
            <motion.div variants={itemVariants} className="relative">
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">Username</label>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isGoogleUser}
                className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">Email</label>
            </motion.div>

            {/* Password */}
            {!isGoogleUser && (
              <>
                <motion.div variants={itemVariants} className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3">New Password</label>
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 cursor-pointer">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </motion.div>
                {passwordError && <motion.p variants={itemVariants} className="text-xs text-red-600 -mt-4 ml-1">{passwordError}</motion.p>}
              </>
            )}

            {isGoogleUser && (
              <motion.div variants={itemVariants} className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">Your account is connected via Google. Password is managed by Google.</p>
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading || !!passwordError}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className='text-red-700 text-center h-5'>{error}</motion.p>
          <motion.p variants={itemVariants} className='text-green-700 text-center h-5'>{updateSuccess && 'Profile updated successfully!'}</motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
