import {useEffect, useState} from 'react';
import {ScaledSize, Dimensions} from 'react-native';

interface DimensionInfo {
  window: ScaledSize;
  screen: ScaledSize;
}

export const useDimensions = (): DimensionInfo => {
  const [dimensions, setDimensions] = useState<DimensionInfo>({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  const onChange = (newDimensions: DimensionInfo): void => {
    setDimensions(newDimensions);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });
  return dimensions;
};
