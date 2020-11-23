/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import logo from "assets/img/logo.png";
import background from "assets/img/app-adverts/background-gif.gif";

import * as api from "api/authApi.js";
import { CurrentUserContext } from "Store";

const useStyles = makeStyles(styles);

export default function MobileLogin(props) {
  const [currentUser] = useContext(CurrentUserContext)
  const classes = useStyles();

  function encode(str) {
      var code = str.replace(/./g, function(c) {
          return ('00' + c.charCodeAt(0)).slice(-3);
      });

      return code.substring(0, 6)
  }

  return (
    <div style={customStyles.background}>
      <Header absolute color="transparent" brand="Mr O Delivery" {...props} />
      <div style={{ marginTop: -30 }}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ marginBottom: "auto" }}>
                <form className={classes.form}>
                  <CardHeader
                    style={customStyles.logo}
                    className={classes.cardHeader}
                  />
                  {currentUser
                    ? <h1 center style={customStyles.verificationCode} className={classes.title}>
                        Verification Code: {encode(currentUser.phoneNumber)}
                      </h1>
                    : <StyledFirebaseAuth
                        uiConfig={api.uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                  }
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
}


const customStyles = {
  verificationCode: { 
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 80,
    color: 'green'
  },
  logo: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(" + logo + ")",
    height: 150,
    backgroundSize: "contain",
  },
  background: {
    height: "155vh",
    background:
      "linear-gradient( rgb(0 0 0 / 27%), rgb(251 144 17 / 73%)),url(" +
      background +
      ")",
  }
}