import React from 'react';
import Svg, { G,Polygon ,Path, SvgProps } from 'react-native-svg';

const HomeIcon = (
  (props, ref) => <Svg {...props} version="1.1" id="Capa_1"  x="0px" y="0px"
  width="24px" height="24px" viewBox="0 0 510 510" style="enable-background:new 0 0 30 30;" >
<G>
 <G id="home">
   <Polygon  fill={props.fill} points="204,471.75 204,318.75 306,318.75 306,471.75 433.5,471.75 433.5,267.75 510,267.75 255,38.25 0,267.75 
     76.5,267.75 76.5,471.75 		"/>
 </G>
</G>
</Svg>
);

export default HomeIcon;
