/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import TextFormat from "@material-ui/icons/TextFormat";
import DialpadIcon from "@material-ui/icons/Dialpad";

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
import background from "assets/img/app-adverts/background-gif.gif";

import * as api from "api/authApi.js";
import * as validations from "shared/utils/validations.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [user, setUser] = useState({});
  const [inProgress, setInProgress] = useState(false);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div
      style={{
        background:
          "linear-gradient( rgb(0 0 0 / 27%), rgb(251 144 17 / 73%)),url(" +
          background +
          ")",
      }}
    >
      <Header absolute color="transparent" brand="Mr O Delivery" {...rest} />
      <div style={{ marginTop: isMobile ? -50 : -80 }}>
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
                      value={user.name}
                      onChangeValue={(value) =>
                        setUser({ ...user, name: value })
                      }
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
                      labelText="Phone number..."
                      id="phoneNumber"
                      value={user.email}
                      onChangeValue={(value) =>
                        setUser({ ...user, email: value })
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <DialpadIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      value={user.password}
                      onChangeValue={(value) =>
                        setUser({ ...user, password: value })
                      }
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
                    {!inProgress ? (
                      <Button
                        color="primary"
                        size="lg"
                        disabled={inProgress}
                        onClick={() => {
                          if (
                            validations.fields(user, [
                              "name",
                              "email",
                              "password",
                            ])
                          ) {
                            setInProgress(true);
                            api.addUser(user, setInProgress, props);
                          }
                        }}
                      >
                        Submit
                      </Button>
                    ) : (
                      <CircularProgress
                        style={{
                          color: "#fb9011",
                        }}
                      />
                    )}
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
