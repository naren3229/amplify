"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../utils/validation";
import PrimaryButton from "../common/Button";

/*
Property card component for displaying property information.
Shows image carousel, address, description, and price.
*/
const PropertyCard = ({ property }) => {
  const router = useRouter();
  const data = property.attributes || property;

  // Images array for carousel effect
  const images =
    data.images && data.images.length > 0
      ? data.images.map((img) => img.srcUrl)
      : [];
  const fallbackImage =
    data.thumbnail || "https://via.placeholder.com/400x300?text=No+Image";
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  // Title and address for the property
  const title = data.title || "Property";
  const address =
    data.display_address || (data.address && data.address.address1) || "";

  // Bedrooms, price, and description text
  const bedrooms = data.bedroom || 0;
  const price = data.price || 0;
  const priceQualifier = data.price_qualifier ? ` ${data.price_qualifier}` : "";
  const description =
    bedrooms > 1
      ? `${bedrooms} bedroom apartment for ${
          data.search_type === "lettings" ? "rent" : "sale"
        }`
      : bedrooms === 1
      ? "1 bedroom apartment for " +
        (data.search_type === "lettings" ? "rent" : "sale")
      : "Studio apartment for " +
        (data.search_type === "lettings" ? "rent" : "sale");

  // Navigate to property detail page on card click
  const handleClick = () => {
    sessionStorage.setItem('propertyDetails', JSON.stringify(property))
    const crmId = property?.attributes?.crm_id
    router.push(`/property/${crmId}`)
  };

  // Start image carousel on mouse enter
  const handleMouseEnter = () => {
    if (images.length <= 1) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 200);
    }, 1200);
  };

  // Stop carousel and reset image on mouse leave
  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImage(0);
    setFade(true);
  };

  return (
    <div
      className="bg-white group hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Property image with fade and carousel effect */}
        <img
          src={
            images.length > 0
              ? images[currentImage]
              : fallbackImage // Use fallbackImage if no images
          }
          alt={title}
          className={`w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300 transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          style={{ transition: "opacity 0.5s" }}
        />
        <div className="absolute top-3 right-3"> 
          <PrimaryButton
            className="!w-auto !p-2 !bg-white !text-black rounded-full shadow-md hover:bg-gray-50 transition-colors"
            
            onClick={(e) => {
              e.stopPropagation(); /* handle favorite */
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </PrimaryButton>
        </div>
      </div>
      <div className="p-4 text-center flex-1 flex flex-col justify-between">
        {/* Address */}
        <h3 className="font-semibold text-base text-gray-900 mb-1 uppercase line-clamp-1">
          {address}
        </h3>
        {/* Description */}
        <div className="text-md text-gray-600 mb-2 font-medium">
          {description}
        </div>
        {/* Price */}
        <div className="text-lg font-bold text-black mb-1">
          {formatCurrency(price)}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
