import { useState } from "react"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  const [showModal, setShowModal] = useState();
  return (
    <>
      {showModal}
      <Header handleModal={setShowModal}/>
      <main className="-mt-14 pt-14 min-h-screen">
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout