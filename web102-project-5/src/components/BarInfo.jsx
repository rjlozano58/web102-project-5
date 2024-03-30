import { useState,useEffect } from "react";
import "../App.css"

const BarInfo = (props) => {



    return(
        <>
            <div className="bar-box">

                <div>
                    <p>Name</p>
                    <p>{props.name}</p>
                </div>
                <div>
                    <p>Address</p>
                    <p>{props.address}</p>
                </div>
                <div>
                    <p>City</p>
                    <p>{props.city}</p>
                </div>

            </div>
        </>
    );
}

export default BarInfo;