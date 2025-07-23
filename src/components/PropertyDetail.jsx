export default function PropertyDetail({ attributes }) {
  const galleryImages = attributes?.gallery?.data || []

  return (
    <div className="p-4 md:flex gap-6">
      {/* Main Image */}
      <div className="md:w-1/2">
        <img
          src={attributes?.featuredImage?.data?.attributes?.url || '/no-image.jpg'}
          alt={attributes?.title}
          className="w-full object-cover"
        />

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {galleryImages.map((img) => (
            <img
              key={img.id}
              src={img.attributes?.url}
              className="w-full h-auto object-cover"
              alt={`Gallery image ${img.id}`}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="md:w-1/2 space-y-3 mt-6 md:mt-0">
        <h2 className="text-3xl font-bold">{attributes?.price_formatted}</h2>
        <p className="text-lg text-gray-600">{attributes?.bedrooms} bed | {attributes?.internal_area} sqm</p>
        <p className="text-gray-700">{attributes?.excerpt}</p>

        <div className="mt-4">
          <h4 className="font-semibold">Facts & Features</h4>
          <ul className="list-disc ml-5 text-sm">
            <li><strong>Neighbourhood:</strong> {attributes?.neighbourhood || 'N/A'}</li>
            <li><strong>Price per sqm:</strong> {attributes?.price_per_sqm || 'N/A'}</li>
            <li>
              <strong>Brochure:</strong> {attributes?.brochure ? (
                <a href={attributes?.brochure} target="_blank" className="text-blue-600 underline">Download</a>
              ) : 'N/A'}
            </li>
            <li>
              <strong>Floor plan:</strong> {attributes?.floor_plan ? (
                <a href={attributes?.floor_plan} target="_blank" className="text-blue-600 underline">View Floorplan</a>
              ) : 'N/A'}
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 mt-4">{attributes?.description || 'No description available.'}</p>
      </div>
    </div>
  )
}
