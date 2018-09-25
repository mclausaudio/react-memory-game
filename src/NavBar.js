import React from 'react'
import PropTypes from 'prop-types'
import './NavBar.css'

const NavBar = (props) => (
    <header>
    <h3>React Memory Game</h3>
    <div className="nav-div">
        <h3 onClick={props.onNewGame}>New Game</h3>
        <h3><a href="http://www.michaelclaus.io">Created by Michael Claus</a></h3>
    </div>
    </header>
    )

NavBar.propTypes = {
    onNewGame: PropTypes.func.isRequired
}

export default NavBar;