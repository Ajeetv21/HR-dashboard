import React, { useState } from 'react'
import './Leaves.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaves } from '../features/leaveSlice';
import { useEffect } from 'react';
function Calender() {

  const dispatch = useDispatch()
  const { leaves, loading, error } = useSelector((state) => state.leaves)


  useEffect(() => {
    dispatch(fetchLeaves())
  }, [dispatch])



  console.log(leaves)

  const [date, setDate] = useState(new Date());
  const imgUrl = "https://cdn-icons-png.freepik.com/512/168/168730.png";
  return (
    <div>

      <div className="card">
        <p className="heading">Leave Calander</p>
        <div className="grp">
          <div className="day">Today</div>
          <div className="cal"></div>

        </div>
        <div className='show-calender'>
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="container scrollable-leaves">
          {
            leaves.map((leave,id) => (
              <div key={id}>
                <ul>
                  <p>
                    {leave.employeeId.EmployeeName}
                  </p>
                  <div className="group">
                    <p>{leave.employeeId.department}</p>
                  </div>
                  <div className="timeline">
                    <p>{leave.
                      LeaveDate
                    }</p>

                  </div>
                </ul>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Calender
