/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Book from "@material-ui/icons/LibraryBooks";
import DirectionsBike from "@material-ui/icons/DirectionsBike";
import Accessibility from "@material-ui/icons/Accessibility";
import Equalizer from "@material-ui/icons/Equalizer";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { CurrentUserContext } from "Store.js";

// Sections for this page

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const navigateSecuredTab = (currentUser, props, redirect) => {
  if (currentUser) {
    console.log("currentUser", currentUser);
    if (currentUser.isAdmin) props.history.push(redirect);
    else toast.error("No Access.");
  } else if (!currentUser) props.history.push("/login");
};

const navigate = (currentUser, props, redirect) => {
  if (currentUser) props.history.push(redirect);
  else props.history.push("/login");
};

export default function LandingPage(props) {
  const [currentUser] = useContext(CurrentUserContext);
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
            id="dashboardContainer"
            style={{
              paddingTop: isMobile ? "20vh" : "30vh",
              minHeight: "100vh",
            }}
          >
            <GridItem
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() =>
                navigateSecuredTab(currentUser, props, "/drivers-list")
              }
            >
              <Card className={"card-admins"}>
                <CardHeader style={customeStyles.driverHeader} stats icon>
                  <CardIcon color="warning">
                    <DirectionsBike>content_copy</DirectionsBike>
                  </CardIcon>
                  <h3 className={classes.cardTitle}>Drivers</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>Manage Drivers</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => navigate(currentUser, props, "/dashboard")}
            >
              <Card>
                <CardHeader style={customeStyles.ordersHeader} stats icon>
                  <CardIcon color="success">
                    <Book />
                  </CardIcon>
                  <h3 className={classes.cardTitle}>Orders</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>Manage Orders</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => navigate(currentUser, props, "/dashboard")}
            >
              <Card>
                <CardHeader style={customeStyles.statsHeader} stats icon>
                  <CardIcon color="danger">
                    <Equalizer />
                  </CardIcon>
                  <h3 className={classes.cardTitle}>Stats</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>Statisticts</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => navigate(currentUser, props, "/dashboard")}
            >
              <Card>
                <CardHeader style={customeStyles.customersHeader} stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <h3 className={classes.cardTitle}>Customers</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>Manage Customers</div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const customeStyles = {
  driverHeader: {
    color: "white",
    background: "linear-gradient(60deg, #135883, #fb8c00)",
    boxShadow:
      "0 12px 20px -10px #135883, 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)",
  },
  ordersHeader: {
    color: "#fff",
    background: "linear-gradient(60deg, #56b383, #92af4c)",
    boxShadow:
      "0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)",
  },
  statsHeader: {
    color: "#fff",
    background: "linear-gradient(60deg, #e5a9ab, #e53935)",
    boxShadow:
      "0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)",
  },
  customersHeader: {
    color: "#fff",
    background: "linear-gradient(60deg, #33c5f4, #00acc1)",
    boxShadow:
      "0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)",
  },
};
