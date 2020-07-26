import {sleep} from '@core/helpers';

jest.useFakeTimers();

it('renders correctly', () => {
  sleep(1000);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
