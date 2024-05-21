import React from 'react'
import './sidebar.css'

import logo from '../../images/PANIFICADOS_INTEGRALES-removebg-preview.png'

import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { BsTrophy } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";

import { Link } from 'react-router-dom';
const SideBar = () => {
  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        <img src={logo} alt="Image Name" />
        <h2>Patagonia</h2>
      </div>

      <div className="div menuDiv">
        <h3 className="divTitle">
          Quick Menu
        </h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <Link to="/dashboard" className="menuLink flex">
            <IoMdSpeedometer className='icon'/>
            <span className="smallText">
              Dashboard
            </span>
            </Link>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
            <MdDeliveryDining  className='icon'/>
            <span className="smallText">
              My Orders
            </span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
            <MdOutlineExplore className='icon'/>
            <span className="smallText">
              Explore
            </span>
            </a>
          </li>
          <li className="listItem">
            <Link to="/Products" className="menuLink flex">
            <BsTrophy className='icon'/>
            <span className="smallText">
              Products
            </span>
            </Link >
          </li>
        </ul>
      </div>
      <div className="div settingsDiv">
        <h3 className="divTitle">
          Settings
        </h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex">
            <AiOutlinePieChart className='icon'/>
            <span className="smallText">
             Charts
            </span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
            <BiTrendingUp  className='icon'/>
            <span className="smallText">
              Trends
            </span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
            <MdOutlinePermContactCalendar className='icon'/>
            <span className="smallText">
              Contact
            </span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
            <BsCreditCard2Front className='icon'/>
            <span className="smallText">
              Billing
            </span>
            </a>
          </li>
        </ul>
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
  )
}

export default SideBar