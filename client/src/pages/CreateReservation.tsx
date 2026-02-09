import React from "react";
import "./CreateReservation.css";

const CreateReservation: React.FC = () => {
  return (
    <>
      <div className="hud">
        <p>temporary hud</p>
      </div>

      <div className="content">
        <div className="main">
          <div className="reservation-header">
            <h1 className="create-reservation">Create Reservation</h1>
            <h1 className="lab">Gokongwei 307A</h1>

            <div className="legend">
              <div className="available">
                <p>Available</p>
              </div>
              <div className="reserved">
                <p>Reserved</p>
              </div>
              <div className="unavailable">
                <p>Unavailable</p>
              </div>
            </div>
          </div>

          <div className="diagram">
            {/* Row A */}
            <div className="box set" id="table1">
              <div className="slot1"><p className="row-column">A1</p></div>
              <div className="slot2"><p className="row-column">A2</p></div>
              <div className="table" />
            </div>

            <div className="box set" id="table2">
              <div className="slot1"><p className="row-column">A3</p></div>
              <div className="slot2"><p className="row-column">A4</p></div>
              <div className="table" />
            </div>

            <div className="box set" id="table3">
              <div className="slot1"><p className="row-column">A5</p></div>
              <div className="slot2"><p className="row-column">A6</p></div>
              <div className="table" />
            </div>

            <div className="box set" id="table4">
              <div className="slot1"><p className="row-column">A7</p></div>
              <div className="slot2"><p className="row-column">A8</p></div>
              <div className="table" />
            </div>

            {/* Row B */}
            <div className="box set" id="table5">
              <div className="slot3"><p className="row-column">B1</p></div>
              <div className="slot4"><p className="row-column">B2</p></div>
              <div className="elbat" />
            </div>

            <div className="box set" id="table6">
              <div className="slot3"><p className="row-column">B3</p></div>
              <div className="slot4"><p className="row-column">B4</p></div>
              <div className="elbat" />
            </div>

            <div className="box set" id="table7">
              <div className="slot3"><p className="row-column">B5</p></div>
              <div className="slot4"><p className="row-column">B6</p></div>
              <div className="elbat" />
            </div>

            <div className="box set" id="table8">
              <div className="slot3"><p className="row-column">B7</p></div>
              <div className="slot4"><p className="row-column">B8</p></div>
              <div className="elbat" />
            </div>

            {/* Row C */}
            <div className="box set" id="table9">
              <div className="slot1"><p className="row-column">C1</p></div>
              <div className="slot2"><p className="row-column">C2</p></div>
              <div className="table" />
            </div>

            <div className="box set" id="table10">
              <div className="slot1"><p className="row-column">C3</p></div>
              <div className="slot2"><p className="row-column">C4</p></div>
              <div className="table" />
            </div>

            <div className="box set" id="table11">
              <div className="slot1"><p className="row-column">C5</p></div>
              <div className="slot2"><p className="row-column">C6</p></div>
              <div className="table" />
            </div>

            <div className="box set" id="table12">
              <div className="slot1"><p className="row-column">C7</p></div>
              <div className="slot2"><p className="row-column">C8</p></div>
              <div className="table" />
            </div>

            {/* Row D */}
            <div className="box set" id="table13">
              <div className="slot3"><p className="row-column">D1</p></div>
              <div className="slot4"><p className="row-column">D2</p></div>
              <div className="elbat" />
            </div>

            <div className="box set" id="table14">
              <div className="slot3"><p className="row-column">D3</p></div>
              <div className="slot4"><p className="row-column">D4</p></div>
              <div className="elbat" />
            </div>

            <div className="box set" id="table15">
              <div className="slot3"><p className="row-column">D5</p></div>
              <div className="slot4"><p className="row-column">D6</p></div>
              <div className="elbat" />
            </div>

            <div className="box set" id="table16">
              <div className="slot3"><p className="row-column">D7</p></div>
              <div className="slot4"><p className="row-column">D8</p></div>
              <div className="elbat" />
            </div>
          </div>
        </div>

        <div className="reminders">
          <h1>Reservation Reminders</h1>
        </div>

        <div className="reserve">
          <h1>Reserve A Slot</h1>

          <div className="rs-content">
            <label htmlFor="laboratory">Laboratory:</label>
            <select id="laboratory">
              <option value="">Select Laboratory</option>
              <option value="lab1">Gokongwei 307A</option>
              <option value="lab2">Gokongwei 307B</option>
              <option value="lab3">Gokongwei 404A</option>
            </select>

            <label htmlFor="time-start">Time Start:</label>
            <select id="time-start">
              <option value="">Select Start Time</option>
              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
            </select>

            <label htmlFor="time-end">Time End:</label>
            <select id="time-end">
              <option value="">Select End Time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
            </select>

            <p><strong>Slot</strong></p>

            <label htmlFor="row">Row:</label>
            <select id="row" className="small-select">
              <option value="">Select Row</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            <label htmlFor="column">Column:</label>
            <select id="column" className="small-select">
              <option value="">Select Column</option>
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button className="rs-submit">
            Reserve Slot
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateReservation;
