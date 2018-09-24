import React from 'react'
import PropTypes from 'prop-types'
import './NavBar.css'

const NavBar = (props) => (
    <header>
    <h3>Memory Game</h3>
    <h3 onClick={props.onNewGame}>New Game</h3>
    </header>
    )

NavBar.propTypes = {
    onNewGame: PropTypes.func.isRequired
}

export default NavBar;