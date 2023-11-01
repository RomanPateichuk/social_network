import React from "react"
import Preloader from "../components/common/Preloader/Preloader"


export const withSuspense = (component) => {
  return (props) => {
    <React.Suspense fallback={<Preloader />}>
      <component {...props} />
    </React.Suspense>
  }
}




