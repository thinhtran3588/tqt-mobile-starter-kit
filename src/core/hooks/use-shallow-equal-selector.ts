import {useSelector, shallowEqual} from 'react-redux';

export const useShallowEqualSelector = <TState = {}, TSelected = unknown>(
  selector: (state: TState) => TSelected,
): TSelected => {
  return useSelector(selector, shallowEqual);
};
