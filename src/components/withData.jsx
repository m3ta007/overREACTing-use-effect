import React from 'react'
import PropTypes from 'prop-types'

export default (WrappedComponent) => {
  const withData = (endpoint, dataToState) => {
    // API Helpers
    const [isLoading, setLoading] = useState(false)
    const [hasError, setError] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        // Set loader
        setLoading(true)

        // Call a helper function to get/render endpoint, if needed
        if (typeof endpoint === 'function') {
          endpoint = endpoint(props)
        }

        // Fetch data from API
        try {
          const response = await fetch(endpoint)
          if (!response.ok) {
            // Throw error
            setError(response.statusText)
            throw new Error(response.statusText)
          }

          // Set news, clean errors
          const data = await response.json()
          // Push fetched data into WrappedComponent state
          dataToState(data)
          setError(null)
        } catch (e) {
          setError(e)
        } finally {
          // Remove loader
          setLoading(false)
          console.log('Done?', data, dataToState, hasError, isLoading)
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
        <WrappedComponent {...props} data={data} />
      </>
    )
  }

  withData.propTypes = {}

  return withData
}
