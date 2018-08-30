import React from 'react';
import request from 'superagent'

/*A.1 - import react-notification-system */
import NotificationSystem from 'react-notification-system'

export default class LoginForm  extends React.Component {


  _handleLogin(evt){
    evt.preventDefault()
    const formEl = evt.target
    const emailInput = formEl.email.value
    const pwInput = formEl.password.value


    const component = this

    {/* C.1 - send POST request to /auth/login w/ credentials */ }

    request
      .post('/auth/login')
      .send({email: emailInput, password: pwInput})
      .then((serverRes)=>{
        {/* C.2 - handle successful login by putting user on App.state */ }

          component.props.setAppState({
            currentUser : serverRes.body
          })

          {/* C.3 - redirect authenticated user to /dashboard */ }
          component.props.history.push('/dashboard')

      })
      .catch((e)=>{
        console.log(e);
        {/* C.4 - unsuccessful auth attempt pops an error notification */ }
        component.refs.notificationSystem.addNotification({
            title: 'Unauthorized',
            message: 'Your email or password was incorrect',
            level: 'error'
          })
      })

  }

  render(){
    console.log(this.props);
    return   <div className="form form--login">
       {/* B.1 - handle submit event */ }
        <form onSubmit={ (evt)=>{ this._handleLogin(evt) }}>
          <h2 className="form__title">Login</h2>
          <input className="form__field" type="text" name="email" placeholder="Email"/>
          <input className="form__field" type="password" name="password" placeholder="Password"/>
          <input className="form__login-btn"type="submit" value="login"/>
        </form>

        {/* A.2 - Create NotificationSystem component w/ notificationSystem  */ }
        <NotificationSystem ref="notificationSystem" />
      </div>
  }
}
