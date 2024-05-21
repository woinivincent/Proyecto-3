import React from 'react'
import './top.css'

import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsArrowRightShort } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";

import img2 from '../../../images/vecteezy_un-pan-png-con-ai-generado_25066842.png'
import img from '../../../images/Imagen de WhatsApp 2024-02-13 a las 16.59.43_4718f1b7.jpg'
import video from '../../../images/mixkit-cutting-fresh-vegan-bread-46333-medium.mp4'


const Top = () => {
  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Patagonia</h1>
          <p>Hello Vicente, welcome back</p>
        </div>

    <div className="searchBar flex">
      <input type="text" placeholder='Search Dashboard' />
      <BiSearchAlt className='icon' />
    </div>

    <div className="adminDiv flex">
    < TbMessageCircle2 className='icon'/>
    <IoMdNotificationsOutline className='icon' />
    <div className="adminImage">
      <img src={img} alt="AdminImage" />
    </div>
    </div>

      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Create and sell extraordinary products</h1>
          <p>Best Bakery on the market
          </p>

          <div className="buttons flex">
            <button className="btn">Explore more</button>
            <button className="btn transparent">Top Sellers</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex ">

            <div className="textDiv">
              <h1>My Stat</h1>

              <div className="flex">
                <span>
                  Today <br /> <small> 4 Orders</small>
                </span>
                <span>
                  This Month <br /> <small> 100 Orders</small>
                </span>
              </div>

              <span className="flex link">
                 Go to my Orders <BsArrowRightShort className='icon' />

              </span>

            </div>

            <div className="imgDiv">
              <img src={img2} alt="Image name" />
            </div>

          <div className="sideBarCard">
      <BsQuestionCircle  className='icon'/>
      <div className="cardContent">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <h3>Help Center</h3>
        <p>Having problems in Patagonia? Contact Us</p>
        <button className='btn'>Go to Help</button>
      </div>
  
      </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top