
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';

import NoMatch404 from './components/NoMatch404.js'
import ListingsMulti from './components/ListingsMulti.js'
import ShopsMulti from './components/ShopsMulti.js'

import RegisterForm from './components/RegisterForm.js'
import LoginForm from './components/LoginForm.js'

import Dashboard from './components/Dashboard'

import Navbar from './components/Navbar.js'

import request from 'superagent'


// B.1 - Pass react-router information to NavBar component
const NavBarWithRouter = withRouter(Navbar)

class App extends React.Component {
  // A.1 - Pass react-router information to NavBar component
  constructor(...args){
    super(...args)
    this.state = {
      currentUser : {}
    }
  }

  /* D.1 - write method to let us change state of App component from child components */
  _setAppState(stateObj){
    this.setState(stateObj)
  }

  /*E.1 - get current user from /auth/current, set to component state*/
  componentWillMount(){
    /* NOTE `this` keyword loses reference to APP inside superagent's .then() callback function */
    const component = this
    request.get('/auth/current')
      .then((serverRes)=>{
        const userInfo = serverRes.body
        component.setState({
          currentUser : userInfo
        })
      })
  }

  render (){
    const appComponent = this

    /* D.2 - bind the _setAppState() method to this (App) component */
    const _setAppStateWithAppContext = this._setAppState.bind(this)
    return <div>
      <NavBarWithRouter
        {...this.props}
        /* C.1a - pass state as props*/
        appState={this.state}

        /* D.3a - pass binded method as props */
        setAppState={_setAppStateWithAppContext}

      />
      <Switch>
        <Route path='/dashboard' component={(thePropsWithRouterInfo)=>{
          return <Dashboard
                  {...thePropsWithRouterInfo}
                  /* C.2a - pass state as props*/
                  appState={this.state}
                />
        }}
        />
        <Route path='/signup' component={RegisterForm}/>
        <Route path='/login'
          component={ (thePropsWithRouterInfo) => {
              return <LoginForm
                {...thePropsWithRouterInfo}
                /* D.3b - pass binded method as props */
                setAppState={ _setAppStateWithAppContext }
                />
          }}
        />
        <Route path='/shops' component={ShopsMulti}/>
        <Route path='/listings' component={ListingsMulti}/>
        <Route component={NoMatch404}/>
      </Switch>
    </div>
  }
}

ReactDOM.render(<BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('app-container'));
