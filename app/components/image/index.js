import PropTypes from 'prop-types'
import React from 'react'
import { Image as RnImage, View } from 'react-native'

import { Colors, Metrics } from '../../constants'
import Styles from './Styles'

const Image = ({
  background,
  backgroundColor,
  height,
  mb,
  mh,
  ml,
  mr,
  mt,
  mv,
  network,
  radius,
  resizeMode,
  source,
  spinnerColor,
  styles,
  width
}) => {
  const renderResizeMode = resizeMode || (background || network ? 'cover' : null)

  const sizeStyles = width || height || network ? { width: width || '100%', height: height || Metrics.base * 22 } : null

  const renderStyles = {
    borderRadius: radius ? Metrics.radius : null,
    ...sizeStyles
  }

  return (
    <View style={[
      {
        ...renderStyles,
        marginBottom: Metrics.base * mb || null,
        marginHorizontal: Metrics.base * mh || null,
        marginLeft: Metrics.base * ml || null,
        marginRight: Metrics.base * mr || null,
        marginTop: Metrics.base * mt || null,
        marginVertical: Metrics.base * mv || null
      },
      background ? Styles.background : null
    ]}
    >
      {network && (
        <View style={[
          Styles.networkContainer,
          renderStyles,
          background ? Styles.background : null,
          {
            backgroundColor
          },
          styles.container
        ]}
        >
          {/* <ProcessingSpinner color={spinnerColor} /> */}
        </View>
      )}

      <RnImage
        borderRadius={radius ? Metrics.radius : null}
        resizeMode={renderResizeMode}
        source={network ? { uri: source } : source}
        style={[
          renderStyles,
          background ? Styles.background : null,
          styles.container
        ]}
      />
    </View>
  )
}

Image.propTypes = {
  background: PropTypes.bool,
  backgroundColor: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  mb: PropTypes.number,
  mh: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mv: PropTypes.number,
  network: PropTypes.bool,
  radius: PropTypes.bool,
  resizeMode: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  spinnerColor: PropTypes.string,
  styles: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

Image.defaultProps = {
  background: false,
  backgroundColor: Colors.grey4,
  height: null,
  mb: null,
  mh: null,
  ml: null,
  mr: null,
  mt: null,
  mv: null,
  network: false,
  radius: false,
  resizeMode: null,
  source: null,
  spinnerColor: Colors.grey2,
  styles: {
    container: null
  },
  width: null
}

export default Image
