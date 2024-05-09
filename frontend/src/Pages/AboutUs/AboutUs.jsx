import React from "react";
import './AboutUs.css'
class AboutUs extends React.Component{
    render(){ return( <div>
        <main className="main__about">
            <h2>Nosotros</h2>
            <div className="card-container">
                <div className="card">
                    <img src="/images/63f7db8da8ea1.image.jpg" alt="PAN" />
                </div>
            </div>
            <div className="container-text">
                <p>
                    Panificados Patagonia es una empresa familiar que se dedica,
                    desde
                    hace más de 10 años, a hornear productos frescos y de la más
                    alta
                    calidad. Hacemos entregas diarias a todos los consumidores y
                    locales de
                    la zona. estamos ubicados en Lujan-Buenos Aires.
                </p>
            </div>
        </main>
    </div>)
       
    }
}




export default AboutUs