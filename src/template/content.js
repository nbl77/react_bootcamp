import React from 'react';

function About() {
  return(
    <div className="about-side" id="about">
      <div className="left-side">
        <h2>About Me</h2>
        <p>My attachment to the IT field comes from my simple desire to make social life easier with computer technology.</p>
        <p>I have high interest in technology. I started learning coding on at school and the first programming language times learned is php. I believe everything can be on get it as long as we want to try and work hard.</p>
      </div>
      <div className="right-side information">
        <h2>Information</h2>
        <ul>
          <li>Age :</li>
          <li>19</li>
          <li>Email :</li>
          <li>amdnabil1810@gmail.com</li>
          <li>Phone :</li>
          <li>+62 8950 6974 203</li>
          <li>Address :</li>
          <li>Jakarta Selatan</li>
        </ul>
      </div>
    </div>
  )
}

function Skill() {
  return(
    <div className="skill-side" id="skill" style={{marginTop:"40px"}}>
      <center><h2>Skill</h2></center>
      <div className="skill-main">
        <div className="left-side">
          <ul>
            <li>HTML <small>(90%)</small> <div className="pre" style={{width:"90%"}}></div></li>
            <li>JS <small>(75%)</small> <div className="pre" style={{width:"75%"}}></div></li>
            <li>PHP <small>(80%)</small> <div className="pre" style={{width:"80%"}}></div></li>
            <li>JAVA <small>(70%)</small> <div className="pre" style={{width:"70%"}}></div></li>
          </ul>
        </div>
        <div className="right-side">
          <ul>
            <li>CSS <small>(90%)</small> <div className="pre" style={{width:"90%"}}></div></li>
            <li>PhotoShop <small>(60%)</small> <div className="pre" style={{width:"60%"}}></div></li>
            <li>Ilustrator <small>(35%)</small> <div className="pre" style={{width:"35%"}}></div></li>
            <li>Adobe XD <small>(65%)</small> <div className="pre" style={{width:"65%"}}></div></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
function Contact() {
  return(
    <div className="contact-side" id="contact" style={{marginTop:"40px"}}>
      <center><h2>Contact Me</h2></center>
      <div className="contact-main" style={{boxShadow:"none"}}>
          <label>Message :</label>
          <textarea name="" id="" cols="30" rows="10">Type here...</textarea>
          <button>Submit</button>
      </div>
    </div>
  )
}
export function Content() {
  return(
    <div className="content-side">
      <div className="container">
        <About />
        <Skill />
        <Contact />
      </div>
    </div>
  )
}
