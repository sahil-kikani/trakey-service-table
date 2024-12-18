const { Info } = require('lucide-react')

export const renderTableRows = (services, loading, openServiceDetails) => {
  console.log('services', services)
  if (loading) {
    return Array(10)
      .fill()
      .map((_, index) => (
        <tr key={index} className='animate-pulse'>
          <td colSpan='4' className='px-4 py-3 bg-gray-200 h-12'></td>
        </tr>
      ))
  }

  if (services?.length === 0) {
    return (
      <tr>
        <td colSpan='4' className='text-center py-4 text-gray-500'>
          No Services Available
        </td>
      </tr>
    )
  }

  return services?.map((service) => (
    <tr key={service.id} className='hover:bg-gray-100 transition-colors duration-200 border-b'>
      <td className='px-4 py-3 flex items-center'>
        <img src={service?.service_image} alt={service?.service_name} className='w-12 h-12 rounded-full mr-3 object-cover' />
        <div>
          <div className='font-medium'>{service?.service_name}</div>
          <div className='text-xs text-gray-500'>{service?.salon_name}</div>
        </div>
      </td>
      <td className='px-4 py-3'>
        <div className='flex items-center'>
          <span className='mr-2'>₹{service?.price}</span>
          {service?.discount > 0 && <span className='text-green-600 text-xs'>({service?.discount}% off)</span>}
        </div>
      </td>
      <td className='px-4 py-3'>{service?.service_time.minutes} mins</td>
      <td className='px-4 py-3'>
        <button onClick={() => openServiceDetails(service)} className='text-blue-500 hover:text-blue-700'>
          <Info size={20} />
        </button>
      </td>
    </tr>
  ))
}
