
import './App.css';

import { UseStateFunction } from './usestate/usestate';
import { Signin } from './component1/signin/signin';
import { Signup } from './component1/signup/signup';
import { ForgotPassword } from './component1/forgetpassword/forgetpassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentData } from './component1/usersdata/students';


function App() {
  const verify=sessionStorage?.auth && JSON.parse(sessionStorage?.auth)?.Gmail
  return (
    
    <>
      {/* <Component/>
      <Component1/>
      <Component2/>
      <UseStateFunction/> */}
      
      
      <Router>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/students' element={verify?<StudentData />:<Signin/>} />
          <Route path='/' element={<ProductInfo/>}/>
        </Routes>
      </Router>
      
      {/* <Signin/>
      <Signup/>
      <ForgotPassword/> */}
    </>
  );
}

export default App;
