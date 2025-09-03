import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Listing has been deleted' });
  } catch (error) {
    next(error);
  }
};


export const editListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only edit your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    // Find the listing by its ID and populate the userRef field
    const listing = await Listing.findById(req.params.id).populate('userRef');

   
    // This will log the result of the query to your backend terminal
    // console.log('Listing data after populate:', listing); 
    
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    // Send the complete listing object, now with the user's info included
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};


