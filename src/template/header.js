import React from 'react';

  export function Nav() {
    return (
      <div className="container">
        <nav>
          <div className="logo"><h2>MY CV</h2></div>
          <ul>
            <LinkNav href="#about">About</LinkNav>
            <LinkNav href="#skill">Skill</LinkNav>
            <LinkNav href="#contact">Contact</LinkNav>
          </ul>
        </nav>
      </div>
    );
  }

  function LinkNav(props) {
    return (
      <li><a href={props.href}>{props.children}</a></li>
    )
  }

  function Photo(props) {
    return(
      <div className="img-avatar">
        <img src={props.imgAvatar} alt="" width="100%"/>
      </div>
    )
  }

  export function HeadSlide(props) {
    const style = {
      backgroundImage:`url(${props.imgHead})`,
      width:"100%",
      backgroundSize:"cover",
      backgroundPosition:"center"
    }
    return (
      <div className="header-img" style={style}>
        <div className="info-header">
          <Photo imgAvatar={props.imgAvatar} />
          <div className="info">
            <h1>Ahmad Nabil</h1>
            <span>WEB DEVELOPER, GRAPHIC DESIGNER, PHOTOGRAPHER</span>
          </div>
          <button className="btn-cv">Download CV</button>
        </div>
        <div className="transparent"></div>
      </div>
    );
  }
