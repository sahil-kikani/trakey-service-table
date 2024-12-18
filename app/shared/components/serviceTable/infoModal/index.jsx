export const ServiceDetailsModal = ({ selectedService, setSelectedService }) => {
  if (!selectedService) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>{selectedService?.service_name}</h2>
          <button onClick={() => setSelectedService(null)} className='text-gray-600 hover:text-gray-900'>
            ✕
          </button>
        </div>

        <img
          src={selectedService?.service_image}
          alt={selectedService?.service_name}
          className='w-full h-48 object-cover rounded-md mb-4'
        />

        <div className='space-y-2'>
          <p>
            <strong>Salon:</strong> {selectedService?.salon_name}
          </p>
          <p>
            <strong>Price:</strong> ₹{selectedService?.price}
            {selectedService?.discount > 0 && <span className='text-green-600 ml-2'>({selectedService?.discount}% off)</span>}
          </p>
          <p>
            <strong>Duration:</strong> {selectedService?.service_time.minutes} mins
          </p>
          <p>
            <strong>Category:</strong> {selectedService?.category_data?.name || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong>
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: selectedService.description || 'No description available'
            }}
            className='text-sm text-gray-700'
          />
        </div>
      </div>
    </div>
  )
}
