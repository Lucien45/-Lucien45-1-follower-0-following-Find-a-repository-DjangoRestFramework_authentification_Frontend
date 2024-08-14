import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../../assets/admin/tache.css'

const Tache = () => {
  return (
    <div className=''>
      <div className="navbarPage">
        <div className='titre-page' >Tache</div>
        <div><button className='button is-success' id='btnAdd'><Link to={`/admin/tache/addEditTache`}>Nouveau Tache</Link></button></div>
      </div>
      <div className='outlet-page' id='list-content'>
          <Outlet/>
      </div>
    </div>
  )
}

export default Tache