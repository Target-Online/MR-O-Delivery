import React, { useContext, useState } from "react";

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
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import * as api from "api/authApi";
import { CurrentUserContext } from "Store.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function UpdateUserNameModal(props) {
  const [currentUser] = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { isVisible, setVisible } = props;
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal,
              }}
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
                <h4 align="center" className={classes.modalTitle}>
                  Welcome {currentUser && currentUser.phoneNumber}
                </h4>
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
              >
                <CustomInput
                  labelText="Enter Name..."
                  value={userName}
                  onChangeValue={(value) => setUserName(value)}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button
                  disabled={!userName.length}
                  onClick={() => {
                    api.newUser(
                      "users",
                      {
                        phoneNumber: currentUser.phoneNumber,
                        displayName: userName,
                      },
                      currentUser.phoneNumber
                    );
                    setVisible(false);
                  }}
                  color="success"
                  simple
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
