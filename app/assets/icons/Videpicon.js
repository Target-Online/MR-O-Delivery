import React from 'react';
import Svg, {G, Rect, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const VoiceIcon: React.FC<Props> = props => (
  <Svg {...props}>
    <Path d="M6.55 13.754a3.941 3.941 0 0 0 3.93-3.93V3.93A3.941 3.941 0 0 0 6.55 0a3.941 3.941 0 0 0-3.93 3.93v5.894a3.941 3.941 0 0 0 3.93 3.93z" />
    <Path d="M13.1 9.824a.655.655 0 1 0-1.31 0 5.24 5.24 0 0 1-10.479 0 .619.619 0 0 0-.656-.655.619.619 0 0 0-.655.655 6.538 6.538 0 0 0 5.895 6.484v1.375h-2.62a.655.655 0 1 0 0 1.31h6.55a.655.655 0 1 0 0-1.31H7.2v-1.375a6.538 6.538 0 0 0 5.9-6.484z" />
  </Svg>
);

export default VoiceIcon;
