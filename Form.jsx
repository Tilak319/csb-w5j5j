import React, { useState, useEffect } from "react";
import Input from '@tds/core-input'
import Box from '@tds/core-box'
import Button from '@tds/core-button'
import Select from '@tds/core-select'
import Radio from '@tds/core-radio'
import TextArea from '@tds/core-text-area'
import './Hey.css';
import { validEmail } from './regex.jsx';
import Axios from 'axios';
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"

function App() {

  //states
  const [salute, setSalute] = useState('');
  const [user, setUser] = useState('');
  const [radio, setRadio] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [textarea, setTextarea] = useState('');
  const [phone, setPhone] = useState('');

  const [userErr, setUserErr] = useState(false);
  const [conpwdError, setConPwdError] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [textError, setTextError] = useState(false);

  //handleEvents
  const validate = () => {

    //if((pwdError && conpwdError)==false && (conpwdError && emailErr) ==false && (emailErr && textError) == false && (textError && pwdError)==false) {
    if ([emailErr, pwdError, textError, conpwdError].every(x => x == false)) {
      alert("FORM SUBMITTED")
    }
    else {
      alert("PLEASE FILL THE REQUIRED DETAILS")
    }
  }

  const emailFunc = (e) => {
    setEmail({ email: e.target.value })
    if (!email.email.match(validEmail)) {
      setEmailErr(true);
    }

    else {
      setEmailErr(false);
    }
  }

  const passFunc = (e) => {
    setPassword({ password: e.target.value })
    if (password.password.length <= 7) {
      setPwdError(true);
    }
    else {
      setPwdError(false);
    }
  }
  const conpassFunc = (e) => {
    setConPassword({ confirmPassword: e.target.value })
    const x1 = document.getElementById("password1").value
    const x2 = document.getElementById("password2").value

    if (x1 != x2) {
      setConPwdError(true)
    }
    else if (x1 == x2) {
      setConPwdError(false)
    }
  }

  const saluteFunc = (e) => {
    setSalute({ salutation: e.target.value })
  }

  const userFunc = (e) => {
    setUser({ username: e.target.value })
    if (document.getElementById("user").value == " ") {
      setUserErr(true)
    }
  }

  const radioFunc = (e) => {
    setRadio({ gender: e.target.value })
  }

  const textFunc = (e) => {
    setTextarea({ profile: e.target.value })
    const word = document.getElementById("profile").value.replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length;
    if (word >= 100) {
      setTextError(true);
    }
    else {
      setTextError(false);
    }
  }

  const phoneFunc = (e) => {
    setPhone({ phone: e.target.value })
  }

  const handleForm = (e) => {
    e.preventDefault();

    //API CALLS
    Axios.post("https://reqres.in/api/users",
      [salute,
        user,
        email,
        password,
        textarea,
        phone]
    )
      .then(function (response) {
        console.log(response);
      });



    // Axios.get("https://reqres.in/api/unknown/2")
    //   .then(function (response) {
    //     console.log(response);
    //   });

    // const data = {
    //   "email": {
    //     "value": "tilak.rajora@telusinternational.com"
    //   },
    //   "password": {
    //     "value": "jygfyjhkvmb,j"
    //   },
    //   "id": 2
    // }

    // Axios.put("https://reqres.in/api/users/2", data)
    //   .then((data) => {
    //     console.log(data);
    //   })

    // Axios.delete("https://reqres.in/api/users/2", data)
    //   .then((data) => {
    //     console.log(data);
    //   })

    //Consoles
    console.log(e.target)
    console.log(salute)
    console.log(user)
    console.log(email)
    console.log(password)
    console.log(conPassword);
    console.log(radio);
    console.log(textarea);
    console.log(phone);

  }


  return (

    <div className="App">

      <div className="Form-app">
        <h1 style={{ fontSize: 48, color: "rgb(75, 40, 109)" }} >Hey, Please Log in to continue..</h1> <br />
        <Box between={2}>
          <form onSubmit={validate}>
            <div className="sal-div">
              <Select className="salute-class"
                label="Mr / Mrs."
                options={[
                  { text: 'Mr.', value: 'Mr' },
                  { text: 'Mrs.', value: 'Mrs' },

                ]}
                id="salute"
                value={salute.value}
                onChange={saluteFunc}
              />
            </div>
            <Input label="Username" type="text" value={user.value} name="user" placeholder="Enter your username" id="user" required onChange={userFunc} />
            {userErr && <p style={{ color: "red", fontSize: 13 }}>Username is required!</p>}

            <Input label="Email" type="text" value={email.value} name="email" placeholder="Enter your email" onChange={emailFunc} />
            {emailErr && <p style={{ color: "red", fontSize: 13 }}>Your email is invalid !</p>}

            <Input label="Password" type="password" value={password.value} name="password" id="password1" placeholder="Enter your password" onChange={passFunc} />
            {pwdError && <p style={{ color: "red", fontSize: 13 }}>Password must be greater than 8 digits</p>}

            <Input label="Confirm Password" type="password" value={conPassword.value} name="password2" id="password2" placeholder="Confirm your password" onChange={conpassFunc} />
            {conpwdError && <p style={{ color: "red", fontSize: 13 }}>Password does not match !</p>}

            <div className="radio-heading">Please select your gender</div>
            <Radio
              label="Male"
              name="gender"
              value="male"
              id="male"
              onChange={radioFunc}
            />
            <Radio
              label="Female"
              name="gender"
              value="female"
              id="female"
              onChange={radioFunc}
            />

            <TextArea
              label="Enter your profile description :"
              value={textarea.description}
              placeholder="Please give your profile description"
              id="profile"
              onChange={textFunc}
            />
            {textError && <p style={{ color: "red", fontSize: 13 }}>Word limit exceeded!!</p>}

            <Input className="phone-input"
              label="Mobile Phone : "
              type="tel"
              value={phone.value}
              pattern="[0-9]{10}"
              placeholder="Phone Number"
              maxLength="10"
              onChange={phoneFunc} />

            <ChevronLink 
            onClick={validate}
              reactRouterLinkComponent={Link}
              to="/login"
            >
              Login
            </ChevronLink>
           
          </form>
        </Box>
      </div>
    </div>

  );
}
export default App;
