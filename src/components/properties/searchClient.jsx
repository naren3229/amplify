'use client';

import React, { useState, useMemo } from "react";
import Header from "../Header";
import SearchFilters from "./SearchFilters";
import PropertyGrid from "./PropertyGrid";
import Footer from "../Footer";



const SearchPageLayout = ({properties}) => {
    // State for all filter values
    const [filters, setFilters] = useState({
      bedrooms: "",
      neighbourhood: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "price",
    });



    // Filter and sort properties based on selected filters
    const filteredProperties = useMemo(() => {
      let filtered = properties;

      
      if (!filtered) return [];

      // All filters should use the nested attributes object
      filtered = filtered.filter((property) => {
        const data = property.attributes || property;

        // Bedrooms filter
        if (filters.bedrooms) {
          if (filters.bedrooms === "4+") {
            if ((data.bedroom || 0) < 4) return false;
          } else {
            if ((data.bedroom || "").toString() !== filters.bedrooms)
              return false;
          }
        }

        // Neighbourhood filter (checks display_address and address fields)
        if (filters.neighbourhood) {
          const address = (
            data.display_address ||
            data.address?.address1 ||
            ""
          ).toLowerCase();
          if (!address.includes(filters.neighbourhood.toLowerCase()))
            return false;
        }

        // Min price filter
        if (filters.minPrice) {
          if ((data.price || 0) < parseInt(filters.minPrice)) return false;
        }

        // Max price filter
        if (filters.maxPrice) {
          if ((data.price || 0) > parseInt(filters.maxPrice)) return false;
        }

        return true;
      });

      // Sorting
      filtered.sort((a, b) => {
        const aData = a.attributes || a;
        const bData = b.attributes || b;
        switch (filters.sortBy) {
          case "price":
            return (bData.price || 0) - (aData.price || 0);
          case "bedrooms":
            return (bData.bedroom || 0) - (aData.bedroom || 0);
          case "area":
            return (bData.area || 0) - (aData.area || 0);
          case "newest":
            return (b.id || 0) - (a.id || 0);
          case "oldest":
            return (a.id || 0) - (b.id || 0);
          default:
            return 0;
        }
      });

      return filtered;
    }, [properties, filters]);

    // Handle filter changes from SearchFilters component
    const handleFiltersChange = (newFilters) => {
      setFilters(newFilters);
    };

    // Compute filter options for SearchFilters
    const filterOptions = useMemo(() => {
      if (!properties) return {
        bedrooms: [],
        neighbourhoods: [],
        minPrice: 0,
        maxPrice: 0,
      };

      const bedroomsSet = new Set();
      const neighbourhoodsSet = new Set();
      let minPrice = Number.POSITIVE_INFINITY;
      let maxPrice = Number.NEGATIVE_INFINITY;

      properties.forEach((property) => {
        const data = property.attributes || property;

        // Bedrooms
        if (typeof data.bedroom === 'number') {
          bedroomsSet.add(data.bedroom);
        }

        // Neighbourhood (use display_address or address fields)
        if (data.display_address) {
          neighbourhoodsSet.add(data.display_address);
        } else if (data.address?.address2) {
          neighbourhoodsSet.add(data.address.address2);
        }

        // Price
        if (typeof data.price === 'number') {
          minPrice = Math.min(minPrice, data.price);
          maxPrice = Math.max(maxPrice, data.price);
        }
      });

      // Sort bedrooms and neighbourhoods
      const bedrooms = Array.from(bedroomsSet).sort((a, b) => a - b);
      const neighbourhoods = Array.from(neighbourhoodsSet).sort();

      // Handle empty data
      if (minPrice === Number.POSITIVE_INFINITY) minPrice = 0;
      if (maxPrice === Number.NEGATIVE_INFINITY) maxPrice = 0;

      return {
        bedrooms,
        neighbourhoods,
        minPrice,
        maxPrice,
      };
    }, [properties]);

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header title="STAY VIEW" />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-gray-900 mb-2 md:mb-4 tracking-tight">
            Property for Sales
          </h1>

          {/* Filters Row */}
          <div className="mb-8">
            <SearchFilters
              onFiltersChange={setFilters}
              resultCount={filteredProperties?.length}
              filterOptions={filterOptions}
            />
          </div>

          {/* Property Grid */}
          <PropertyGrid
            properties={filteredProperties}
            loading={false}
            error={''}
          />
        </main>

        <Footer />
      </div>
    );
  };
export default SearchPageLayout;
