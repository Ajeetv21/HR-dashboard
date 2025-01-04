import React from 'react'
import './Leaves.css'
function Calender() {
    const imgUrl = "https://cdn-icons-png.freepik.com/512/168/168730.png";
  return (
    <div>
       <div className="card">
          <p className="heading">Leave Calander</p>
          <div className="grp">
            <div className="day">Today</div>
            <div className="cal">10/09/24</div>
          </div>

          <div className="container">
            <img src={imgUrl} alt="" />
            <div className="group">
              <p></p>
              <p>Senior Software Developer</p>
            </div>
            <div className="timeline">
              <p>10/09/24</p>
              <p>13/09/24</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Calender
