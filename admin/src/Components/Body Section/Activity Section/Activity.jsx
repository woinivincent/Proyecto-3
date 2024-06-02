import React from 'react'
import './activity.css'

import { BsArrowRightShort } from "react-icons/bs";

import user from '../../../images/user 1.jpg'

const Activity = () => {
    return (
        <div className='activitySection'>
            <div className="heading flex">
                <h1>Recent Activity</h1>
                <button className='btn flex'>
                    See All
                    <BsArrowRightShort className='icon' />
                </button>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src={user} alt="customer img" />
                    <div className="customerDetails">
                        <span className='name'>
                            Mike Seller
                        </span>
                        <small>Hizo un Pedido</small>
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
            </div>
            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src={user} alt="customer img" />
                    <div className="customerDetails">
                        <span className='name'>
                            Mike Seller
                        </span>
                        <small>Hizo un Pedido</small>
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
            </div>
            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src={user} alt="customer img" />
                    <div className="customerDetails">
                        <span className='name'>
                            Mike Seller
                        </span>
                        <small>Hizo un Pedido</small>
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
            </div>
            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src={user} alt="customer img" />
                    <div className="customerDetails">
                        <span className='name'>
                            Mike Seller
                        </span>
                        <small>Hizo un Pedido</small>
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src={user} alt="customer img" />
                    <div className="customerDetails">
                        <span className='name'>
                            Mike Seller
                        </span>
                        <small>Hizo un Pedido</small>
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Activity
