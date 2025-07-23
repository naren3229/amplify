"use client";
import React, { useState, useRef, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header"; 
import PrimaryButton from "../../../components/common/Button";
import { formatCurrency } from "../../../components/utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGalleryModal from "../../../components/propertyDetail/ImageGalleryModal";
import MainImageSection from "../../../components/propertyDetail/MainImageSection";
import PropertyDetails from "../../../components/propertyDetail/PropertyDetails";
import FactsAndFeatures from "../../../components/propertyDetail/FactsAndFeatures";
import DescriptionSection from "../../../components/propertyDetail/DescriptionSection";
import AgentAndLocation from "../../../components/propertyDetail/AgentAndLocation";
import Footer from "../../../components/Footer";

const DetailPage = () => { 
  const [propertyData, setProperty] = useState(null);

  const router = useRouter();
  const mainImageRef = useRef(null);

  const [showGallery, setShowGallery] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  // Fetch property details from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("propertyDetails");
    if (stored) {
      try {
        setProperty(JSON.parse(stored)); 
      } catch (e) {
        console.error("Invalid property data in sessionStorage");
      }
    }
  }, []);


  //Normalize property data and extract relevant fields
  const currentProperty = propertyData
    ? {
        ...(propertyData.attributes || propertyData),
        images:
          (
            propertyData.attributes?.images?.map((img) => img.url) ||
            propertyData.images?.map((img) => img.url) ||
            []
          )?.length > 0
            ? propertyData.attributes?.images?.map((img) => img.url) ||
              propertyData.images?.map((img) => img.url)
            : [propertyData.thumbnail || propertyData.attributes?.thumbnail].filter(
                Boolean
              ),
        bedrooms:
          propertyData.attributes?.bedrooms ??
          propertyData.attributes?.bedroom ??
          propertyData.bedrooms ??
          propertyData.bedroom ??
          0,
        neighbourhood:
          propertyData.attributes?.display_address ||
          propertyData.display_address ||
          propertyData.attributes?.address?.address2 ||
          propertyData.address?.address2 ||
          "",
        agent: {
          name:
            propertyData.attributes?.crm_negotiator_id?.name ||
            propertyData.agent?.name ||
            "",
          title:
            propertyData.attributes?.crm_negotiator_id?.job_title ||
            propertyData.agent?.title ||
            "",
          phone:
            propertyData.attributes?.crm_negotiator_id?.work_phone ||
            propertyData.agent?.phone ||
            "",
          email:
            propertyData.attributes?.crm_negotiator_id?.email ||
            propertyData.agent?.email ||
            "",
          image:
            propertyData.attributes?.crm_negotiator_id?.profile_img ||
            propertyData.agent?.image ||
            "https://ui-avatars.com/api/?name=Agent",
        },
        area: propertyData.attributes?.area || propertyData.area || "",
        pricePerSqm:
          propertyData.attributes?.pricePerSqm ||
          (propertyData.attributes?.price &&
          propertyData.attributes?.area &&
          !isNaN(propertyData.attributes.price) &&
          !isNaN(propertyData.attributes.area)
            ? Math.round(propertyData.attributes.price / propertyData.attributes.area)
            : undefined),
        description:
          propertyData.attributes?.description || propertyData.description || "",
        location:
          propertyData.attributes?.display_address ||
          propertyData.display_address ||
          "",
        price: propertyData.attributes?.price || propertyData.price || 0,
        title: propertyData.attributes?.title || propertyData.title || "",
        floorarea_min:
          propertyData.attributes?.floorarea_min || propertyData.floorarea_min || "",
      }
    : null;

  // Check if property data is not found
  const notFound = !propertyData;
 

  //Not found  for invalid or missing property data
  if (notFound || !currentProperty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="STAY VIEW" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">😞</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Property not found
            </h3>
            <p className="text-gray-600 mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <PrimaryButton onClick={() => router.push("/search")}>
              Back to Search
            </PrimaryButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="STAY VIEW" />
      
      {/* Modal for image gallery with carousel slider in dynamic detail page */}
      <ImageGalleryModal
        show={showGallery}
        onClose={() => setShowGallery(false)}
        images={currentProperty.images}
        startIndex={galleryStartIndex}
        setStartIndex={setGalleryStartIndex}
      />

      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6"> 

        {/* Back to Search button */}
        <PrimaryButton
          onClick={() => router.push("/search")}
          className="flex items-center text-blue-700 hover:text-blue-900 mb-6 font-medium !bg-transparent !text-blue-700 !shadow-none !px-0 !py-0"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </PrimaryButton>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
          {/* Left side: Main image and property details */}
          <MainImageSection
            images={currentProperty.images}
            title={currentProperty.title}
            setShowGallery={setShowGallery}
            setGalleryStartIndex={setGalleryStartIndex}
            mainImageRef={mainImageRef}
            toast={toast}
          />
 
          <div> 
            {/* Right side: Property details, facts, features, description, agent and location */}
            <PropertyDetails
              currentProperty={currentProperty}
              formatCurrency={formatCurrency}
            /> 
            <FactsAndFeatures currentProperty={currentProperty} /> 
            <DescriptionSection description={currentProperty.description} /> 
            <AgentAndLocation
              agent={currentProperty.agent}
              location={currentProperty.location}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPage;
