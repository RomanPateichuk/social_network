import React from 'react'
import preLoader from '../../../assets/images/loader.svg'



let Preloader: React.FC = () => {
  return <div>
    <img src={preLoader} alt='preloader' />
  </div>
}


export default Preloader