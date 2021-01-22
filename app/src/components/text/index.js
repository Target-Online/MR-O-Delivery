import PropTypes from 'prop-types'
import React from 'react'
import { Text as RnText } from 'react-native'

import { Fonts, Metrics, Theme } from '@constants'
import Styles from './styles'

const Text = ({
  align,
  children,
  color,
  font,
  mb,
  mh,
  ml,
  mr,
  mt,
  mv,
  numberOfLines,
  styles,
  ...props
}) => (
  <RnText
    {...props}
    numberOfLines={numberOfLines}
    style={[
      Styles.text,
      {
        ...font,
        color,
        marginBottom: Metrics.base * mb || null,
        marginHorizontal: Metrics.base * mh || null,
        marginLeft: Metrics.base * ml || null,
        marginRight: Metrics.base * mr || null,
        marginTop: Metrics.base * mt || null,
        marginVertical: Metrics.base * mv || null,
        textAlign: align
      },
      styles.text
    ]}
  >
    {children}
  </RnText>
)

Text.propTypes = {
  align: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.any,
  color: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  font: PropTypes.object,
  mb: PropTypes.number,
  mh: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mv: PropTypes.number,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object
}

Text.defaultProps = {
  align: 'left',
  bold: null,
  children: null,
  color: "black",
  ellipsizeMode:'tail',
  font: Fonts.bodyBold,
  mb: null,
  mh: null,
  ml: null,
  mr: null,
  mt: null,
  mv: null,
  numberOfLines: 2,
  styles: {
    text: null
  }
}

export default Text
