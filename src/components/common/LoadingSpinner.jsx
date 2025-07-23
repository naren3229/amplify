"use client"

import React, { useEffect, useState } from "react";

// Simple Loader component  

const LoadingSpinner = ({ className = "" }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    {/* Simple spinning ring */}
    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-3"></div>
    {/* Loading text */}
    <div className="text-base font-medium text-gray-700">Loading ...</div>
  </div>
);

export default LoadingSpinner;

export const LoginButtonLoader = ({ className = "" }) => (
  <span className={`inline-block align-middle ${className}`}>
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </span>
);
