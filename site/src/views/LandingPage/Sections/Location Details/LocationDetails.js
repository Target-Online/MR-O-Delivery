import "./index.css";

import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import GoogleMaps from "./google-maps.js";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

// eslint-disable-next-line react/prop-types
const CustomControlLabel = ({ icon, label }) => (
  <FormControlLabel
    className={"formControlLabel"}
    control={<Icon style={{ color: '#fb9011'}} className={icon} />}
    label={label}
  />
);

const LocationDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3} md={3}>
          <CustomControlLabel
            icon={"fa fa-envelope"}
            label={"info@mrodelivery.com"}
          />
          <CustomControlLabel
            icon={"fa fa-phone"}
            label={
              <span>
                {"09046659629"}
                <br />
                {"07042556007"}
              </span>
            }
          />
          <CustomControlLabel
            icon={"fa fa-home"}
            label={"No.3 Olise Okolie Street, Asaba, Delta State, Nigeria"}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Paper className={classes.paper}>
            <GoogleMaps />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default LocationDetails;
