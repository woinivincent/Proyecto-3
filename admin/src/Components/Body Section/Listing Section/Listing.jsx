import React from 'react'
import './listing.css'

import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";


import img from '../../../images/vecteezy_ai-generado-un-pan-en-cesta-aislado-en-transparente_35879645.png'
import img2 from '../../../images/flauta.png'
import img3 from '../../../images/galleta.png'
import img4 from '../../../images/pan3.png'
import user1 from '../../../images/Imagen de WhatsApp 2024-02-13 a las 16.59.43_4718f1b7.jpg'
import user2 from '../../../images/user 1.jpg'
import user3 from '../../../images/user 2.jpg'
import user4 from '../../../images/user 3.jpg'


const Listing = () => {
  return (
    <div className='listingSection'>

      <div className="heading flex">
        <h1>My Listings</h1>
        <button className='btn flex'>
          See All <BsArrowRightShort className='icon' />
        </button>
      </div>

      <div className="secContainer flex">
        <div className="singleItem">
        <AiFillHeart className='icon' />
        <img src={img} alt="" />
          <h3>Pan frances </h3>
        </div>

        <div className="singleItem">
        <AiOutlineHeart 
 className='icon' />
        <img src={img2} alt="" />
          <h3>Flauta </h3>
        </div>

        <div className="singleItem">
        <AiOutlineHeart  className='icon' />
        <img src={img3} alt="" />
          <h3>Galleta con semillas</h3>
        </div>
        
        <div className="singleItem">
        <AiOutlineHeart  className='icon' />
        <img src={img4} alt="" />
          <h3>Galleta de campo </h3>
        </div>
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Top Sellers</h3>
              <button className='btn flex'>
               See All <BsArrowRightShort className='icon' />
              </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="User Image" />
              <img src={user2} alt="User Image" />
              <img src={user3} alt="User Image" />
              <img src={user4} alt="User Image" />
            </div>
            <div className="cardText">
              <span>
                1.000 productos vendidos <br />
                <small>
                  10 vendedores <span className='date'> 7 Dias</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Featured Sellers</h3>
              <button className='btn flex'>
               See All <BsArrowRightShort className='icon' />
              </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user4} alt="User Image" />
              <img src={user1} alt="User Image" />
              <img src={user3} alt="User Image" />
              <img src={user2} alt="User Image" />

            </div>
            <div className="cardText">
              <span>
                3.000 productos vendidos <br />
                <small>
                  10 vendedores <span className='date'> 28 Dias</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing