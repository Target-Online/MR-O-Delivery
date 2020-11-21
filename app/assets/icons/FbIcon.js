import React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';


const FbIcon = (
  (props, ref) => {


    return (
      <Svg
        {...props}
        width="26.122"
        height="25.961"
        viewBox="0 0 26.122 25.961"
      >
        <G transform="translate(0 0)">
          <Path
            fill={'white'}
            d="M26.122,13.062a13.061,13.061,0,1,0-15.1,12.9V16.837H7.7V13.062H11.02V10.184c0-3.273,1.95-5.082,4.933-5.082a20.169,20.169,0,0,1,2.924.255V8.572H17.23A1.888,1.888,0,0,0,15.1,10.613v2.449h3.623l-.58,3.775H15.1v9.127A13.061,13.061,0,0,0,26.122,13.062Z"
            transform="translate(0 -0.003)"
          />
        </G>
      </Svg>
    );
  }
);

export default FbIcon;
