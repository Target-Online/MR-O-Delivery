/* eslint-disable react/prop-types */
import React from "react";
import { isMobile } from "react-device-detect";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import TextFormat from "@material-ui/icons/TextFormat";
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import logo from "assets/img/logo.png";
import flier from "assets/img/Flier.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header absolute color="transparent" brand="Mr O Delivery" {...rest} />
      <div style={{ marginTop: isMobile ? -50 : -80, background: "white" }}>
        <div className={classes.container}>
          <GridContainer justify="center">
            {!isMobile && (
              <GridItem
                style={{
                  backgroundImage: "url(" + flier + ")",
                  backgroundSize: "cover",
                  borderRadius: 6,
                  maxHeight: 540,
                  marginTop: 30,
                  width: 360,
                  backgroundRepeat: "no-repeat",
                  boxShadow:
                    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                }}
                xs={12}
                sm={12}
                md={4}
              />
            )}
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    style={{
                      backgroundImage: "url(" + logo + ")",
                      height: 150,
                      backgroundSize: "cover",
                    }}
                    className={classes.cardHeader}
                  />
                  <CardBody>
                    <CustomInput
                      labelText="Name..."
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <TextFormat className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg">
                      Submit
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      onClick={() => props.history.push("/login-page")}
                      simple
                      color="primary"
                      size="lg"
                    >
                      Login
                    </Button>
                  </CardFooter>
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
