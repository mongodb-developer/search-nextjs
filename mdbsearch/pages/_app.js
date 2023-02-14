import CategoryContextProvider from '../contexts/CategoryContext'
import LoadingContextProvider from '../contexts/LoadingContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <LoadingContextProvider>
      <CategoryContextProvider>
        <Component {...pageProps} />
      </CategoryContextProvider>
    </LoadingContextProvider>
  )
}

export default MyApp
