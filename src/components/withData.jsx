import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const withData = (endpoint, dataToState) => (WrappedComponent) => {
  console.log(endpoint, dataToState, WrappedComponent)
  const [data, setData] = useState(dataToState)
  // API Helpers
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // Set loader
      setLoading(true)

      // Call a helper function to get/render endpoint, if needed
      if (typeof endpoint === 'function') {
        endpoint = endpoint(dataToState)
      }

      // Fetch data from API
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          // Throw error
          setError(response.statusText)
          throw new Error(response.statusText)
        }

        // Set data, clean errors
        const dataFetched = await response.json()
        // Push fetched data into WrappedComponent state
        console.log('Data is ', dataFetched)
        setData(dataFetched)
        setError(null)
      } catch (e) {
        setError(e)
      } finally {
        // Remove loader
        setLoading(false)
        console.log('Done?', dataToState, data, hasError, isLoading)
      }
    }

    // Fetch data from API on mount
    fetchData()

    // Run once, no cleaning needed
  }, [])

  // Conditionally render loader or error or WrappedComponent
  return (
    <>
      {isLoading && <p>Loading... Patience, please</p>}
      {hasError && (
        <p>Oops, an error sneaked in here! Try to refresh the page.</p>
      )}
      <WrappedComponent data={data} />
    </>
  )
}

withData.propTypes = {}

export default withData
