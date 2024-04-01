import * as React from 'react';
import { Animated } from 'react-native';
import Svg, { G, Rect } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function Loading(props: any) {
  const rotation = React.useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    rotation.setValue(0);
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  };

  React.useEffect(() => {
    startRotation();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    
    <AnimatedSvg
      style={{
        ...props.style,
        transform: [{ rotate: spin }],
      }}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <G transform="rotate(0 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(30 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(60 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(90 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(120 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(150 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(180 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(210 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(240 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(270 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(300 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
      <G transform="rotate(330 50 50)">
        <Rect x={47} y={24} rx={2.4} ry={2.4} width={6} height={12} fill="#008ce3" />
      </G>
    </AnimatedSvg>
  );
}

export default Loading;
