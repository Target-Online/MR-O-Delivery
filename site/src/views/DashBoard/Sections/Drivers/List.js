import React from "react";
import { isMobile } from "react-device-detect";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

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
import face from "assets/img/faces/christian.jpg";
import face2 from "assets/img/faces/marc.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    //classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div>
      <Header
        // color="transparent"
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
                  onChangeValue={(value) => console.log("value", value)}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1} lg={1} style={{ marginTop: 35 }}>
                <AddOutlined style={{ color: "#fb9011" }} />
              </GridItem>
            </GridContainer>
            <GridItem style={{ paddingBottom: 50 }}>
              {[
                { img: face, name: "John" },
                { img: face2, name: "Luke" },
              ].map((driver, key) => (
                <GridItem
                  key={key}
                  xs={12}
                  sm={5}
                  md={5}
                  lg={5}
                  className={classes.navWrapper}
                >
                  <CardHeader
                    style={custumStyles.cardHeader}
                    color="warning"
                    stats
                    icon
                  >
                    <CardIcon
                      style={{
                        backgroundImage: `url(${driver.img})`,
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
                      {driver.name}
                    </h3>
                  </CardHeader>
                </GridItem>
              ))}
            </GridItem>
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
    background: "linear-gradient(60deg, #eee, #fb8c00)",
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
