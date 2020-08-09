import React, { useState, useContext } from "react";
import { isMobile } from "react-device-detect";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import AddOutlined from "@material-ui/icons/AddOutlined";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import logo from "assets/img/logo.png";
import picPlaceHolder from "assets/img/faces/user.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { UsersContext } from "Store";

import View from "./Modal";
import Add from "./Add";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [users] = useContext(UsersContext);
  const [driver, setDriver] = useState({});
  const [search, setSearch] = useState("");

  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(classes.imgRaised, classes.imgFluid);

  const drivers = users.data.filter(
    (user) =>
      user.isDriver &&
      user.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const showProfile = (driver) => {
    setDriver(driver);
    setProfileVisible(true);
  };
  return (
    <div>
      <Header
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("assets/img/banners/banner-mockup.jpg")}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={logo} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <br />
                    <h3 className={classes.title}>DRIVERS</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {!users.inProgress ? (
              <span>
                <GridContainer justify="center">
                  <GridItem
                    style={{ marginLeft: isMobile ? 0 : 100 }}
                    xs={10}
                    sm={10}
                    md={5}
                    lg={5}
                  >
                    <CustomInput
                      labelText="Search"
                      id="material"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChangeValue={(value) => setSearch(value)}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    style={{ marginTop: 35 }}
                    onClick={() => setAddVisible(true)}
                  >
                    <AddOutlined style={{ color: "#fb9011" }} />
                  </GridItem>
                </GridContainer>
                <GridItem
                  style={{
                    overflow: "auto",
                    paddingBottom: 50,
                    maxHeight: 350,
                  }}
                >
                  {drivers
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((driver, key) => (
                      <GridItem
                        key={key}
                        xs={12}
                        sm={5}
                        md={5}
                        lg={5}
                        className={classes.navWrapper}
                        onClick={() => showProfile(driver)}
                      >
                        <CardHeader
                          style={{
                            ...custumStyles.cardHeader,
                            background: `linear-gradient(60deg, #eee,${
                              driver.isActive ? "#fb8c00" : "#555"
                            })`,
                          }}
                          stats
                          icon
                        >
                          <CardIcon
                            style={{
                              backgroundImage: `url(${
                                driver.profilePicUrl
                                  ? driver.profilePicUrl
                                  : picPlaceHolder
                              })`,
                              backgroundSize: "cover",
                              backgroundPosition: "center center",
                              width: 80,
                              height: 60,
                            }}
                            color="warning"
                          ></CardIcon>
                          <h3
                            className={classes.cardTitle}
                            style={{ marginTop: -5, paddingRight: "inherit" }}
                          >
                            {driver.displayName}
                          </h3>
                        </CardHeader>
                      </GridItem>
                    ))}
                  {drivers.length == 0 && (
                    <h4 align="center ">No drivers found.</h4>
                  )}
                </GridItem>
              </span>
            ) : (
              <GridContainer justify="center">
                <CircularProgress
                  style={{
                    color: "#fb9011",
                    marginTop: 50,
                  }}
                />
              </GridContainer>
            )}
            <View
              isVisible={isProfileVisible}
              setVisible={setProfileVisible}
              driver={driver}
              setDriver={setDriver}
            />
            <Add isVisible={isAddVisible} setVisible={setAddVisible} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const custumStyles = {
  cardHeader: {
    height: 50,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    color: "#fff",
  },
  cardAvatar: {
    backgroundImage:
      "url(http://localhost:3000/static/media/logo.eb04568d.png)",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: 80,
    height: 60,
  },
};
