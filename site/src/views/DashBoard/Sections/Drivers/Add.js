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
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import * as api from "api/index.js";
import * as validation from "shared/utils/validations.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function AddModal(props) {
  const [driver, setDriver] = useState({
    profilePicURL: "",
    isDriver: true,
    isActive: true,
  });

  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { isVisible, setVisible } = props;

  const registerDriver = () => {
    if (
      validation.fields(driver, [
        "displayName",
        "vehicleRegistration",
        "address",
        "phoneNumber",
      ])
    ) {
      api.set("users", driver, driver.phoneNumber);
      setVisible(false);
      toast.success("Driver added successfully");
    }
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} lg={4}>
            <Dialog
              classes={{
                root: classes.center,
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
                <h4 align={"center"} className={classes.modalTitle}>
                  Driver Registration
                </h4>
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
              >
                <CustomInput
                  labelText="Name..."
                  value={driver.displayName}
                  onChangeValue={(value) =>
                    setDriver({ ...driver, displayName: value })
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <CustomInput
                  labelText="Phone Number +234..."
                  value={driver.phoneNumber}
                  onChangeValue={(value) =>
                    setDriver({ ...driver, phoneNumber: value })
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <CustomInput
                  labelText="Bike Registration..."
                  value={driver.vehicleRegistration}
                  onChangeValue={(value) =>
                    setDriver({ ...driver, vehicleRegistration: value })
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <CustomInput
                  labelText="Address..."
                  id="address"
                  value={driver.description}
                  onChangeValue={(value) =>
                    setDriver({ ...driver, address: value })
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rows={5}
                  multiline={true}
                />
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button color="success" simple onClick={() => registerDriver()}>
                  Submit
                </Button>
                <Button onClick={() => setVisible(false)} color="danger" simple>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
