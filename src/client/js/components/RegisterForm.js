import React from 'react';


/*A.1 - import react-notification-system */

import NotificationSystem from 'react-notification-system'
import request from 'superagent'


export default class RegisterForm  extends React.Component {

    _validateFields(emailStr, pwStr, confirmStr){

      /*C.2a Validate email input (ensure that not empty) */
      if(emailStr.trim().length === 0 ) {
        /* C.2b send error, return false */
        this.refs.notificationSystem.addNotification({
          title: 'Incomplete Email Field',
          message: 'Please add your email to the to register field',
          level: 'error'
        })
        return false
      }

      /*C.3a Validate password input (ensure that not empty) */
      if( pwStr.trim().length === 0  ) {
        /* C.3b send error, return false */
        this.refs.notificationSystem.addNotification({
          title: 'Incomplete Password Field',
          message: 'Please add your password to the to password field',
          level: 'error'
        })
        return false
      }

      /*C.4a Validate password input + password confirmation (ensure that they are equal) */
      if(pwStr !== confirmStr) {
        this.refs.notificationSystem.addNotification({
          title: 'Password Not Confirmed',
          message: 'Password field does not match confirm password field',
          level: 'error'
        })
        return false
      }

      /*C.4a if ALL the above conditions pass, return true */
      return true

    }

   _handleResgisterClick(evt){
      /*B.2- prevent page from reloading*/
      evt.preventDefault()

      /*B.3- Collect form values */
      const theFormEl = evt.target
      console.log(theFormEl.email)
      const emailInput = theFormEl.email.value
      const pwInput = theFormEl.password.value
      const confirmPwInput = theFormEl.confirmpassword.value
      /*B.4 END */

      /*C.1 Validate Form Inputs w/ method*/
      const allFieldsValid = this._validateFields(emailInput, pwInput, confirmPwInput)

      /*C.5 If all Form Inputs are valid...*/
      if( allFieldsValid === true ){

        /*D.1 ... Send POST request w/ data to /auth/register endpoint */
        request
          .post('/auth/register')
          .send({email: emailInput, password: pwInput })
          .then((serverRes)=>{

            const user = serverRes.body

            /*D.2a
              With successful response, send success notfication
            */
            this.refs.notificationSystem.addNotification({
              title: `New Account Created`,
              message : `Please login, ${user.email}`,
              level : 'success'
            })
            /*D.2b
              Redirect the user to /login page after 3 secons
            */
              setTimeout(()=>{
                this.props.history.push('/login')
            }, 3000)
          })
          .catch((err)=>{
            /*D.3
              Handle server error
            */
            this.refs.notificationSystem.addNotification({
              title: `Whoops!`,
              message : `New account could not be created.`,
              level : 'error'
            })
        })
      }

    }



  render(){
    return   <div className="form form--register">
    {/* B.1 - handle submit event */ }
      <form onSubmit={ (evt)=>{ this._handleResgisterClick(evt) } }>
        <h2 className="form__title">Register</h2>
        <input ref="emailinput" className="form__field" type="text" name="email" placeholder="Email"/>
        <input className="form__field" type="password" name="password" placeholder="Password"/>
        <input className="form__field" type="password" name="confirmpassword" placeholder="Confirm Password"/>
        <input className="form__register-btn"type="submit" value="register"/>
      </form>

      {/* A.2 - Create NotificationSystem component w/ notificationSystem  */ }
      <NotificationSystem ref="notificationSystem"/>

    </div>
}
}
