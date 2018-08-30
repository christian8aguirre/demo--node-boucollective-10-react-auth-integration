

import React from 'React'
import {Link, NavLink} from 'react-router-dom'
import request from 'superagent'

class NavBar extends React.Component {

  _renderSignupBtn(theAppState){
    if(typeof theAppState.currentUser.id === 'undefined'){
      return <NavLink
          activeClassName="nav__link--selected"
          className="nav__link"
          to={`/signup`}
          >
            Sign Up
          </NavLink>
    } else {
      return ''
    }
  }

  _renderLoginBtn(theAppState){
    if(typeof theAppState.currentUser.id === 'undefined'){
      return <NavLink
        activeClassName="nav__link--selected"
        className="nav__link"
        to={`/login`}
        >
          Log In
      </NavLink>
    } else {
      return ''
    }

  }

  _renderDashBtn(theAppState){
    if(typeof theAppState.currentUser.id !== 'undefined'){
      return <NavLink
        activeClassName="nav__link--selected"
        className="nav__link"
        to={`/dashboard`}
        >
          Dashboard
      </NavLink>
    } else {
      return ''
    }

  }

  _renderLogoutBtn(theAppState){
    if(typeof theAppState.currentUser.id !== 'undefined'){

      return <span
       className="nav__link--logout"
       /*(B.1) Assign event handler to Log Out button click*/
       onClick={ () =>{ this._handleLogout() }}
       >
        Log Out
      </span>
    } else {
      return ''

    }
  }

/*(B.2) Handle _Log Out_ button click by sending POST to `/auth/logout`, redirect user to `/login` route*/
_handleLogout(){
  const component = this
  request.post('/auth/logout')
    .then((serverRes)=>{
      /* NOTE: setAppState was passed as props in App component (see App.js, D.3b)*/
      component.props.setAppState({
        currentUser: {}
      })
      this.props.history.push('/login')

    })
}






  render(){
    console.log(this.props);
    return <nav className="nav">
      <span>B.<small>C</small></span>
      <NavLink
          activeClassName="nav__link--selected"
          className="nav__link"
          to={`/listings`}
          >
            Listings
        </NavLink>

      <NavLink
          activeClassName="nav__link--selected"
          className="nav__link"
          to={`/shops`}
          >
            Shops
        </NavLink>

      {/*(A) Conditionally render _Log In_ + _Sign Up_ NavLinks components.*/}

      {this._renderSignupBtn(this.props.appState)}
      {this._renderLoginBtn(this.props.appState)}
      {this._renderDashBtn(this.props.appState)}
      {this._renderLogoutBtn(this.props.appState)}


    </nav>
  }

}

export default NavBar


// <NavLink
//     activeClassName="nav__link--selected"
//     className="nav__link--logout"
//     to={`/login`}
//     >
//       Log In
//   </NavLink>
