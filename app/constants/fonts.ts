// import WebFont from 'webfontloader'

import Metrics from './metrics'


const fonts = {
  primaryRegular: { fontWeight : '400' },
  primaryBold: {  fontWeight : '700' },
  secondaryRegular: {  fontWeight : '400' },
  secondaryBold: {  fontWeight : '700' }
}
let small = Metrics.window.height <= 568
let red = small ? 0.85 : 1
const sizes = {
  title: 36 * red,
  jumbo: 32 * red,
  display: 24 * red,
  heading: 20 * red,
  subheading: 18 * red,
  button: 17 * red,
  body: 16 * red,
  caption: 14 * red,
  error: 14 * red,
  barText : 13 * red,
  tiny: 12 * red
 
}

export default {
  title: {
    ...fonts.primaryRegular,
    fontSize: sizes.title
  },
  titleBold: {
    ...fonts.primaryBold,
    fontSize: sizes.title
  },
  jumbo: {
    ...fonts.primaryRegular,
    fontSize: sizes.jumbo
  },
  jumboBold: {
    ...fonts.primaryBold,
    fontSize: sizes.jumbo
  },
  display: {
    ...fonts.primaryRegular,
    fontSize: sizes.display
  },
  displayBold: {
    ...fonts.primaryBold,
    fontSize: sizes.display
  },
  heading: {
    ...fonts.primaryRegular,
    fontSize: sizes.heading
  },
  headingBold: {
    ...fonts.primaryBold,
    fontSize: sizes.heading
  },
  subheading: {
    ...fonts.primaryRegular,
    fontSize: sizes.subheading
  },
  subheadingBold: {
    ...fonts.primaryBold,
    fontSize: sizes.subheading
  },
  button: {
    ...fonts.primaryRegular,
    fontSize: sizes.button
  },
  buttonBold: {
    ...fonts.primaryBold,
    fontSize: sizes.button
  },
  barText: {
    ...fonts.primaryRegular,
    fontSize: sizes.barText
  },
  barTextBold: {
    ...fonts.primaryBold,
    fontSize: sizes.barText
  },
  body: {
    ...fonts.secondaryRegular,
    fontSize: sizes.body
  },
  bodyBold: {
    ...fonts.secondaryBold,
    fontSize: sizes.body
  },
  caption: {
    ...fonts.secondaryRegular,
    fontSize: sizes.caption
  },
  captionBold: {
    ...fonts.secondaryBold,
    fontSize: sizes.caption
  },
  error: {
    ...fonts.secondaryRegular,
    fontSize: sizes.error
  },
  errorBold: {
    ...fonts.secondaryBold,
    fontSize: sizes.error
  },
  tiny: {
    ...fonts.secondaryRegular,
    fontSize: sizes.tiny
  },
  tinyBold: {
    ...fonts.secondaryBold,
    fontSize: sizes.tiny
  }
}
