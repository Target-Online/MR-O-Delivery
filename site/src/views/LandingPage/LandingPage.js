import React, { useState, useEffect, useContext } from "react";
import ScrollIntoView from "react-scroll-into-view";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomButton from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import FoatingButton from "components/FloatingButtons";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import HowItWorksSection from "./Sections/HowItWorks.js";
import SolutionSection from "./Sections/Solution.js";
import ServiceSection from "./Sections/Service.js";
import AboutUsSection from "./Sections/AboutUs.js";
import ContactUsSection from "./Sections/ContactUs.js";
import DriveSection from "./Sections/Drive.js";
import AppAdvertSection from "./Sections/FooterPoster.js";
import UpdateUserName from "./Sections/UpdateUserName.js";
import { CurrentUserContext } from "Store.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const [currentUser] = useContext(CurrentUserContext);
  const [UpdateUserNameVisible, setUpdateUserNameVisible] = useState(false);
  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    if (currentUser && !currentUser.displayName) setUpdateUserNameVisible(true);
  }, [currentUser]);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks includeHomePageLinks {...rest} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/banners/banner.jpeg")}>
        <div className={classes.container}>
          <UpdateUserName
            isVisible={UpdateUserNameVisible}
            setVisible={setUpdateUserNameVisible}
          />
          <GridContainer>
            <GridItem xs={12} sm={12} md={7} />
            <GridItem xs={12} sm={12} md={5}>
              <h1 style={{ fontSize: 45 }} className={classes.title}>
                Delivery Simplified
              </h1>
              <h3>
                On demand anywhere in ASABA delivery at the click of a button.
              </h3>
              <br />
              <span style={{ display: "flex", justifyContent: "space-evenly" }}>
                <ScrollIntoView selector="#download-app-now">
                  <CustomButton
                    style={{ background: "#fb9011", width: 220 }}
                    size="lg"
                  >
                    Place Pickup
                  </CustomButton>
                </ScrollIntoView>
                <ScrollIntoView selector="#download-app-now">
                  <Button
                    style={{
                      background: "white",
                      borderColor: "#fb9011",
                      color: "#fb9011",
                      width: 220,
                      height: 54,
                      marginTop: 5,
                    }}
                    variant="outlined"
                  >
                    Place Delivery
                  </Button>
                </ScrollIntoView>
              </span>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <HowItWorksSection />
          <SolutionSection />
          <ServiceSection />
          <AboutUsSection />
          <ContactUsSection />
          <DriveSection />
          <AppAdvertSection />
          <FoatingButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}
