import React from 'react'
import './404.css'

export const PageNotFounded = () => {
    return (
        <div className={`wrapper`}>
            <div className="face">
                <div className="band">
                    <div className="red"></div>
                    <div className="white"></div>
                    <div className="blue"></div>
                </div>
                <div className="eyes"></div>
                <div className="dimples"></div>
                <div className="mouth"></div>
            </div>

            <h1 className={`text`}>Oops! Something went wrong!</h1>
            <div className="btn">Return to Home</div>
        </div>


    )
}