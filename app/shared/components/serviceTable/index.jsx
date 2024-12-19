'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Search, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { renderTableRows } from './tableRows'
import { ServiceDetailsModal } from './infoModal'
import { baseUrl } from '../../constants'

const ServiceTable = () => {
  // State management
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [prevPageUrl, setPrevPageUrl] = useState(null)
  const [totalServices, setTotalServices] = useState(0)
  const [selectedService, setSelectedService] = useState(null)

  const allData = useRef([])

  // Fetch services from API
  const fetchServices = async (url = `${baseUrl}?page=${currentPage}`) => {
    try {
      setLoading(true)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const { results, next, previous, count } = data
      allData.current = results
      
      setServices(results)
      setNextPageUrl(next)
      setPrevPageUrl(previous)
      setTotalServices(count)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchServices()
  }, [])

  // Pagination handlers
  const handleNextPage = () => {
    if (nextPageUrl) fetchServices(nextPageUrl)
  }

  const handlePrevPage = () => {
    if (prevPageUrl) fetchServices(prevPageUrl)
  }


  // Open service details modal
  const openServiceDetails = (service) => {
    setSelectedService(service)
  }

  function handleSearch(value) {
    const filteredServices = allData.current.filter((service) => service?.service_name.toLowerCase().includes(value.toLowerCase()))
    setSearchTerm(value)
    if (value === '') {
      setServices(allData.current)
    } else {
      setServices(filteredServices)
    }
  }

  // Columns
  const columns = [
    { key: 'service_name', label: 'Service' },
    { key: 'price', label: 'Price' },
    { key: 'service_time', label: 'Duration' },
    { key: 'details', label: 'Details' }
  ]

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        {/* Search Section */}
        <div className='flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50'>
          <div className='relative w-full md:w-2/3 mb-4 md:mb-0'>
            <input
              type='text'
              placeholder='Search services...'
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
          </div>
        </div>

        {/* Service Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-100 text-gray-600 uppercase text-sm leading-normal'>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className='px-4 py-3 text-left'>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 text-sm font-light'>{renderTableRows(services, loading, openServiceDetails)}</tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className='flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50'>
          <div className='text-sm text-gray-500 mb-4 md:mb-0'>
            Showing {services?.length} of {totalServices} services
          </div>
          <div className='flex space-x-2'>
            <button
              onClick={handlePrevPage}
              disabled={!prevPageUrl}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center'
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!nextPageUrl}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center'
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && <ServiceDetailsModal selectedService={selectedService} setSelectedService={setSelectedService} />}
    </div>
  )
}

export default ServiceTable
