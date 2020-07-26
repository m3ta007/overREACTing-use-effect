import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const withData = (endpoint, propName, props) => (WrappedComponent) => {
  console.log('widthData:', endpoint, propName, props, WrappedComponent)

  const [data, setData] = useState(props.propName)

  // API Helpers
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // Set loader
      setLoading(true)

      // Call a helper function to get/render endpoint, if needed
      if (typeof endpoint === 'function') {
        endpoint = endpoint(propName)
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
        // console.log('Data is ', dataFetched)
        setData({ [propName]: dataFetched })
        setError(null)
      } catch (e) {
        setError(e)
      } finally {
        // Remove loader
        setLoading(false)
        // console.log('Done?', propName, data, hasError, isLoading)
      }
    }

    // Fetch data from API on mount
    fetchData()
    console.log('iwthData - setData, ', data)

    // Run once, no cleaning needed
  }, [])

  // console.log('Dddddata:', data, props)
  // Conditionally render loader or error or WrappedComponent
  return (
    <>
      {isLoading && <p>Loading... Patience, please</p>}
      {hasError && (
        <p>Oops, an error sneaked in here! Try to refresh the page.</p>
      )}
      <WrappedComponent {...data} />
      {/* <WrappedComponent /> */}
    </>
  )
}

withData.propTypes = {}

export default withData
