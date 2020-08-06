/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { toast } from "react-toastify";
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
import HeaderLinks from "components/Header/HeaderLinks.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        /*color="transparent"*/
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks {...props} />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer
            justify="center"
            style={{
              paddingTop: isMobile ? "20vh" : "30vh",
              minHeight: "100vh",
            }}
          >
            <GridItem xs={12} sm={4} md={4} lg={4}>
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
              <AddOutlined color={"primary"} />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
