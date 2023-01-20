import React from 'react'
import {Link} from 'react-router-dom'
import Public from '@mui/icons-material/Public';
import Stars from '@mui/icons-material/Stars';
import Work from '@mui/icons-material/Stars';
import '../css/sidebar.css'

const Sidebar = () => {
  return (
    <>
      <div className='sidebar' >
        <div className='sidebar-container'>
          <div className='sidebar-container-options'>
            <div className='sidebar-container-option'>
              <Link>Home</Link>
            </div>
            <div className='sidebar-container-option'>
              <Link>PUBLIC</Link>
              <div className='link'>
              <div className='link-tags'>
                <Public />
                <Link>Question</Link>
              </div>
              <div className='tags'>
                <p>Tags</p>
                <p>Users</p>
              </div>
              </div>
            </div>
            <div className='sidebar-container-option'>
              <p>Collectives</p>
              <div className='link'>
              <div className='link-tags'>
                <Stars />
                <Link>Explore collectives</Link>
              </div>
              </div>
            </div>
            <div className='sidebar-container-option'>
              <p>Find a job</p>
              <div className='link'>
              <div className='link-tags'>
                <Link>JObs</Link>
                <Link>Companies</Link>
              </div>
              </div>
            </div>
            <div className='sidebar-container-option'>
              <p>Teams</p>
              <div className='link'>
              <div className='link-tags'>
              <Work />
                <Link>Companies</Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar