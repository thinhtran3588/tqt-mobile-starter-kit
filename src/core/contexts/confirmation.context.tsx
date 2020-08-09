import React, {useContext, useMemo} from 'react';
import {useImmer} from 'use-immer';
import {ColorType} from './app-theme.context';

interface ConfirmationProviderProps {
  children?: React.ReactNode;
}

export interface ConfirmationButton {
  text: string;
  onPress?: () => void;
  type?: ColorType;
}

export interface ConfirmationState {
  open?: boolean;
  message: string;
  buttons: ConfirmationButton[];
  title?: string;
  titleType?: ColorType;
  showTitle?: boolean;
}

export interface OpenConfirmationParams {
  message: string;
  buttons: ConfirmationButton[];
  title?: string;
  titleType?: ColorType;
  showTitle?: boolean;
}

interface Dispatch {
  openConfirmation: (params: OpenConfirmationParams) => void;
  closeConfirmation: () => void;
}

export const DEFAULT_CONFIRMATION: ConfirmationState = {
  open: false,
  message: '',
  buttons: [],
  title: '',
  titleType: 'INFO',
  showTitle: true,
};

const ConfirmationContext = React.createContext(DEFAULT_CONFIRMATION);
const ConfirmationDispatchContext = React.createContext<Dispatch>(undefined as never);

const ConfirmationProvider = (props: ConfirmationProviderProps): JSX.Element => {
  const {children} = props;
  const [confirmation, setConfirmation] = useImmer(DEFAULT_CONFIRMATION);

  const dispatch = useMemo(
    (): Dispatch => ({
      openConfirmation: (params) => {
        setConfirmation((draft) => {
          draft.open = true;
          draft.showTitle = draft.showTitle !== false;
          Object.assign(draft, params);
        });
      },
      closeConfirmation: () => {
        setConfirmation((draft) => Object.assign(draft, DEFAULT_CONFIRMATION));
      },
    }),
    [setConfirmation],
  );
  return (
    <ConfirmationContext.Provider value={confirmation}>
      <ConfirmationDispatchContext.Provider value={dispatch}>{children}</ConfirmationDispatchContext.Provider>
    </ConfirmationContext.Provider>
  );
};

const useConfirmation = (): {confirmation: ConfirmationState; dispatch: Dispatch} => {
  const confirmation = useContext(ConfirmationContext);
  const dispatch = useContext(ConfirmationDispatchContext);
  return {confirmation, dispatch};
};

export {ConfirmationProvider, useConfirmation};
