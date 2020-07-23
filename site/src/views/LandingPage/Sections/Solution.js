import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/ImgInfoArea/ImgInfoArea.js";

import noMonthlyAccounts from "assets/img/solution/no-monthly-accounts.jpg";
import payAsYouGo from "assets/img/solution/pay-as-you-go.png";
import upFrontBilling from "assets/img/solution/up-front-billing.png";
import easyToUseApp from "assets/img/solution/easy-to-use-mobile-application.jpg";
import collectAroundAsaba from "assets/img/solution/we-collect-wherever-in-asaba.png";
import realTimeTracking from "assets/img/solution/real-time-tracking.JPG";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export const Solution = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="solution">
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={8}>
          <h2 className={classes.title}>Why we the best solution for you</h2>
          <h5 className={classes.description}>
            No more queues or hanging on the line for an operator.
          </h5>
        </GridItem>
      </GridContainer>
      <br/>
      <br/>
      <br/>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="No monthly accounts"
              illusrationSource={noMonthlyAccounts}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Pay as you go pricing"
              illusrationSource={payAsYouGo}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Up front billing"
              illusrationSource={upFrontBilling}
              vertical
            />
          </GridItem>
        </GridContainer>
        <br/>
        <br/>
        <br/>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Easy to use mobile application"
              illusrationSource={easyToUseApp}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="We collect wherever you are in ASABA"
              illusrationSource={collectAroundAsaba}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Real-time tracking and confirmations"
              illusrationSource={realTimeTracking}
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default Solution;
