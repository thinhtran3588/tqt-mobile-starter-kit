import React, {useState, useContext} from 'react';
import {Colors} from 'react-native-paper';
import {usePersistence} from '@core/hooks';

interface PrimaryColorProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (primaryColor: string) => void;

export const DEFAULT_PRIMARY_COLOR = Colors.amber500;
export const LIGHT_BACKGROUND_COLOR = '#fff';
export const DARK_BACKGROUND_COLOR = '#272727';
export const PRIMARY_COLOR_KEY = 'PRIMARY_COLOR';

export const COLORS = [
  {
    code: Colors.amber500,
    text: 'Amber',
  },
  {
    code: Colors.blue500,
    text: 'Blue',
  },
  {
    code: Colors.blueGrey500,
    text: 'Blue Grey',
  },
  {
    code: Colors.brown500,
    text: 'Brown',
  },
  {
    code: Colors.cyan500,
    text: 'Cyan',
  },
  {
    code: Colors.deepOrange500,
    text: 'Deep Orange',
  },
  {
    code: Colors.deepPurple500,
    text: 'Deep Purple',
  },
  {
    code: Colors.green500,
    text: 'Green',
  },
  {
    code: Colors.grey500,
    text: 'Grey',
  },
  {
    code: Colors.indigo500,
    text: 'Indigo',
  },
  {
    code: Colors.lightBlue500,
    text: 'Light Blue',
  },
  {
    code: Colors.lightGreen500,
    text: 'Light Green',
  },
  {
    code: Colors.lime500,
    text: 'Lime',
  },
  {
    code: Colors.orange500,
    text: 'Orange',
  },
  {
    code: Colors.pink500,
    text: 'Pink',
  },
  {
    code: Colors.purple500,
    text: 'Purple',
  },
  {
    code: Colors.red500,
    text: 'Red',
  },
  {
    code: Colors.teal500,
    text: 'Teal',
  },
  {
    code: Colors.yellow500,
    text: 'Yellow',
  },
];

const PrimaryColorContext = React.createContext(DEFAULT_PRIMARY_COLOR);
const PrimaryColorDispatchContext = React.createContext<Dispatch>(undefined as never);

const PrimaryColorProvider = (props: PrimaryColorProviderProps): JSX.Element => {
  const {children} = props;
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [setPrimaryColorPersistence] = usePersistence(primaryColor, setPrimaryColor, PRIMARY_COLOR_KEY, false);
  return (
    <PrimaryColorContext.Provider value={primaryColor}>
      <PrimaryColorDispatchContext.Provider value={setPrimaryColorPersistence}>
        {children}
      </PrimaryColorDispatchContext.Provider>
    </PrimaryColorContext.Provider>
  );
};

const usePrimaryColor = (): [string, Dispatch] => {
  const primaryColor = useContext(PrimaryColorContext);
  const setPrimaryColor = useContext(PrimaryColorDispatchContext);
  return [primaryColor, setPrimaryColor];
};

export {PrimaryColorProvider, usePrimaryColor};
