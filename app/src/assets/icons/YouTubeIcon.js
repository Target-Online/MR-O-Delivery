import React from 'react';
import Svg, { Circle, G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & { focused?: boolean; variant?: 'white' };

const TwitterIcon = React.forwardRef<React.Component<SvgProps>, Props>(
  (props, ref) => {
    const getBackgroundFill = () => {
      if (props.variant && props.variant === 'white') {
        return '#fff';
      }
      return props.focused ? '#3aadee' : '#CCCCCC';
    };

    return (
      <Svg
        fill="white"
        {...props}
        ref={ref}
        width="26"
        height="26"
        viewBox="0 0 26 26"
      >
        <G transform="translate(0.367 -0.061)">
          <Circle
            stroke={'black'}
            cx="13"
            cy="13"
            r="13"
            transform="translate(-0.367 0.061)"
          />
          <G transform="translate(5.714 8.163)">
            <Path
              fill={'black'}
              d="M14.058,6.873a3,3,0,0,0-.577-1.419,2.075,2.075,0,0,0-1.419-.621C10.067,4.7,7.1,4.7,7.1,4.7h0s-2.971,0-4.967.133A2.075,2.075,0,0,0,.71,5.454,3,3,0,0,0,.133,6.873,23.056,23.056,0,0,0,0,9.179v1.064a23.056,23.056,0,0,0,.133,2.306A3,3,0,0,0,.71,13.969a2.512,2.512,0,0,0,1.552.621c1.153.089,4.834.133,4.834.133s2.971,0,4.967-.133a2.075,2.075,0,0,0,1.419-.621,3,3,0,0,0,.577-1.419,23.056,23.056,0,0,0,.133-2.306V9.179A23.056,23.056,0,0,0,14.058,6.873Zm-8.426,4.7V7.583l3.814,2Z"
              transform="translate(0 -4.7)"
            />
          </G>
        </G>
      </Svg>
    );
  }
);

export default TwitterIcon;
