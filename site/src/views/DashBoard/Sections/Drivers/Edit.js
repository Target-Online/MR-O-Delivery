/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast } from "react-toastify";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";

import picPlaceHolder from "assets/img/faces/user.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import * as api from "api";
import * as validations from "shared/utils/validations.js";
import { _updateUserAvatar } from "shared/utils/imagePicker";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const { driver, setDriver, setVisible } = props;
  const [profilePicUpdateInprogress, setProfilePicStatus] = useState(false);

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const update = () => {
    if (
      validations.fields(driver, [
        "displayName",
        "vehicleRegistration",
        "address",
        "phoneNumber",
      ])
    ) {
      api.update("users", driver.id, driver);
      toast.success("Driver updated successfully");
    }
  };

  const remove = () => {
    api.remove("users", driver.id);
    setVisible(false);
    toast.success("Driver deleted successfully");
  };

  return (
    <div>
      <Parallax
        disableTranform
        style={{ height: 300, marginTop: -120 }}
        image={require("assets/img/banners/banner-mockup.jpg")}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.profile}>
                  <div>
                    {!profilePicUpdateInprogress ? (
                      <div className="image-upload">
                        <label htmlFor="file-input">
                          <img
                            src={
                              driver.profilePicUrl
                                ? driver.profilePicUrl
                                : picPlaceHolder
                            }
                            alt="..."
                            className={imageClasses}
                            style={{ height: 150, width: 150 }}
                          />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            _updateUserAvatar(
                              e.target.files[0],
                              driver,
                              setProfilePicStatus
                            )
                          }
                        />
                      </div>
                    ) : (
                      <CircularProgress
                        style={{
                          color: "#fb9011",
                          marginBottom: 50,
                        }}
                      />
                    )}
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {driver ? driver.displayName : ""}
                    </h3>
                    <h6>{driver ? driver.phoneNumber : ""}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" style={{ paddingBottom: 50 }}>
              <GridItem xs={12} sm={12} md={10} lg={10}>
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
                  value={driver.address}
                  onChangeValue={(value) =>
                    setDriver({ ...driver, address: value })
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rows={5}
                  multiline={true}
                />
              </GridItem>
              <DialogActions className={classes.modalFooter}>
                <Button color="danger" simple onClick={() => remove()}>
                  DELETE
                </Button>
                <Button color="success" simple onClick={() => update()}>
                  UPDATE
                </Button>
              </DialogActions>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
