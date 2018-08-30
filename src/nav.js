import React, { Component } from 'react';
import './App.css';


class NavBar extends Component {
  render() {
  	const pages = ["About", "Privacy", "Contact", "Blog"];
  	const navlinks = pages.map((page, i) => {
  		return (
  			<a key={'page_' + i} href={'/' + page}>
  			{page}
  			</a>)
  		});


    return (
    	<nav className="nav">
	    	<div className="public-pages">{navlinks}</div>
	    	<div className="logo"><img src="https://pegatin.com/v4_img/avatar_menu_top.png"/></div>
    	</nav>
    );
  }
}

export default NavBar;
