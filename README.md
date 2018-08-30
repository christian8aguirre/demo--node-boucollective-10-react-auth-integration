# Auth Notes

### Pre-Configuration
+ install `react-notification-system`

  ```
  npm install --save react-notification-system
  ```


### Relevant files/folders

+ `src/client/components/Dashboard.js`
  - (A) conditionally render dashboard if there is an 'email' property on `this.props.appState.currentUser`


+ `src/client/components/RegisterForm.js`
  - (A) Import react notification system + implement as component
  - (B) Handle form's `onSubmit` event + collect form values
  - (C) Validate form inputs (email, pw, pw confirmation)
  - (D) Send POST request w/ new user credentials to `/auth/register`


+ `src/client/components/LoginForm.js`
  - (A) Import react notification system + implement as component
  - (B) Handle form's `onSubmit` event + collect form values
  - (C) Send POST request w/ user credentials  to `/auth/login`
    - handle successful + unsuccessful login attempts


+ `src/client/components/Navbar.js`
  - (A) Conditionally render _Log In_ + _Sign Up_ NavLinks components.
  - (B) Handle _Log Out_ button click by sending POST to `/auth/logout`, redirect user to `/login` route

+ `src/client/components/App.js`
  - (A) Set initial state for `currentUser` in `contructor()`
  - (B) Configure NavBar component to receive react-router props using `withRouter`
  - (C) Pass appState as props to `<Dashboard/>` , `<NavBar/>` components
  - (D) Create a method to update the App State  `_setAppState()` method and pass to`<NavBar/>` and `<LogInForm/>` components
  - (E) in `componentWillMount()`, query `/auth/current` for current user session, set value for state for `currentUser`
