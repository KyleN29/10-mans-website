import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <header id="header">
      <nav>
        <ul id="headerUnorderedList">
          <li id="headerListItem"><Link to="/"><button id="headerHyperlink">Leaderboards</button></Link></li>
          <li id="headerListItem"><Link to="/recent_matches"><button id="headerHyperlink">Recent Matches</button></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
