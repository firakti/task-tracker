import React, { useState, useEffect } from "react";
import 'firebase/auth'
import 'firebase/firestore'
import { Route, Switch } from 'react-router-dom'
import "./styles.scss";
import Home from "./view/home";
import SignIn from "./view/auth/signin";
import SignUp from "./view/auth/signup";
import Spinner from "./view/shared/spinner";
import { useFirebaseApp } from "reactfire";
import getUser from "./utils/get-firebase-user";

export default function App() {

  const firebase = useFirebaseApp();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  useEffect(() => {
    // TODO refactor 
    const checkAuth = async () => {
      const user = await getUser(firebase);
      if (user === null) {
        setIsAuthenticated(false);
      }
      else {
        setIsAuthenticated(true);
      }
      setIsAuthChecked(true);
    }
    checkAuth();
  }, [firebase]);


  return (
    <>
      {isAuthChecked ?
        <Switch>
          <Route exact path='/' render={() => isAuthenticated ? <Home /> : <SignIn />} />
          <Route exact path='/signin' render={() => isAuthenticated ? <Home /> : <SignIn />} />
          <Route exact path='/signup' render={() => isAuthenticated ? <Home /> : <SignUp />} />
        </Switch>
        :
        <Spinner isVisible={true}></Spinner>
      }
    </>
  );
}

