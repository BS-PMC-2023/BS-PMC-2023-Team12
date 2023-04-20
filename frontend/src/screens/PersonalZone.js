import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';

import {  useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/httpHook';




const PersonalZone = () => {
  
  const auth = useContext(AuthContext);

  

  // const [myString2, setMyString2] = useState("fd");
  // console.log(myString2);

  //console.log(useContext(AuthContext))
  console.log(auth.myUserName);
  //console.log(auth);
  

  return (
  <>
    <body>
      <center>
        <h1 className="ml" id="add">אזור אישי</h1>
        
        {auth.myUserName == "Manager@ac.sce.ac.il" && <button>Users Manager</button>}
      </center>
    </body>
    {}
  </>
  );


}

//yovel buld


export default PersonalZone;
