import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/processStepInfoStyle";

const useStyles = makeStyles(styles);

export default function ProcessInfoStep(props) {
  const classes = useStyles();
  const { illusrationSource, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconBottomVertical]: vertical,
  });
  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <img
          style={{ height: 100 }}
          src={illusrationSource}
          alt={description}
        />
      </div>
      <br />
      <br />
      <div className={classes.descriptionWrapper}>
        <props.icon className={iconClasses} />
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

ProcessInfoStep.defaultProps = {
  iconColor: "gray",
};

ProcessInfoStep.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  illusrationSource: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  vertical: PropTypes.bool,
};
