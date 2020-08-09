/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast } from "react-toastify";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import ViewProfile from "./View";
import EditProfile from "./Edit";

import * as api from "api/index.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function Edit(props) {
  const classes = useStyles();
  const [isModeEdit, setEditMode] = useState(false);
  const { isVisible, setVisible, driver, setDriver } = props;

  const toggleAccountStatus = (driver) => {
    api.updateData("users", driver.id, {
      ...driver,
      isActive: !driver.isActive,
    });
    setVisible(false);
    toast.success(
      `Driver ${driver.isActive ? "deactivated" : "activated"} successfully`
    );
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Dialog
              open={isVisible}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setVisible(false)}
              aria-labelledby="classic-modal-slide-title"
              aria-describedby="classic-modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <IconButton
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => setVisible(false)}
                >
                  <Close className={classes.modalClose} />
                </IconButton>
                <br />
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
                style={{ maxWidth: "600px" }}
              >
                {isModeEdit ? (
                  <EditProfile driver={driver} setDriver={setDriver} />
                ) : (
                  <ViewProfile driver={driver} />
                )}
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button
                  color={driver.isActive ? "danger" : "success"}
                  simple
                  onClick={() => toggleAccountStatus(driver)}
                >
                  {driver.isActive ? "DEACTIVATE" : "ACTIVATE"}
                </Button>
                <Button
                  color="success"
                  simple
                  onClick={() => setEditMode(!isModeEdit)}
                >
                  {isModeEdit ? "View" : "Edit"}
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
