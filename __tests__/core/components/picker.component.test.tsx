/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import RNPicker from 'react-native-picker';
import {render, toJSON, fireEvent, act} from '@test-utils';
import {Picker, Colors, Button, PickerDataItem} from '@core/components';
import {COLORS} from '@core/contexts';

const colors: PickerDataItem[] = COLORS.map((c) => ({value: c.id, label: c.text}));

it('renders close correctly', async () => {
  const setPickerOpen = jest.fn();
  const setPrimaryColor = jest.fn();
  const {baseElement} = render(
    <Picker
      key='primary-color-picker'
      initialValue={Colors.amber500}
      open={false}
      setOpen={setPickerOpen}
      dataSources={colors}
      onChangeValue={setPrimaryColor}
    />,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders open correctly', async () => {
  const setPickerOpen = jest.fn();
  const setPrimaryColor = jest.fn();
  const {baseElement} = render(
    <Picker
      key='primary-color-picker'
      initialValue={Colors.amber500}
      open
      setOpen={setPickerOpen}
      dataSources={colors}
      onChangeValue={setPrimaryColor}
    />,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders with incorrect initial value correctly', async () => {
  const setPickerOpen = jest.fn();
  const setPrimaryColor = jest.fn();
  const {baseElement} = render(
    <Picker
      key='primary-color-picker'
      initialValue=''
      open
      setOpen={setPickerOpen}
      dataSources={colors}
      onChangeValue={setPrimaryColor}
    />,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('opens picker and pick a value', async () => {
  const setPrimaryColor = jest.fn();
  const Wrapper = (): JSX.Element => {
    const ref = React.createRef();
    const [pickerOpen, setPickerOpen] = useState(false);
    const openPicker = (): void => {
      setPickerOpen(true);
      if (ref) {
        (ref.current as any).props.onShow();
      }
    };
    return (
      <>
        <Picker
          ref={ref}
          key='primary-color-picker'
          initialValue={Colors.amber500}
          open={pickerOpen}
          setOpen={setPickerOpen}
          dataSources={colors}
          onChangeValue={setPrimaryColor}
        />
        <Button onPress={openPicker}>Open picker</Button>
      </>
    );
  };
  const {getByText} = render(<Wrapper />);
  fireEvent.press(getByText('Open picker'));
  expect(RNPicker.init).toHaveBeenCalled();
  expect(RNPicker.show).toHaveBeenCalled();

  act(() => {
    (RNPicker.init as jest.Mock).mock.calls[0][0].onPickerConfirm(['Cyan']);
  });
  expect(RNPicker.hide).toHaveBeenCalled();
  expect(setPrimaryColor).toHaveBeenCalledWith('CYAN');
});

it('opens picker and do nothing if pick the same value', async () => {
  const setPrimaryColor = jest.fn();
  const Wrapper = (): JSX.Element => {
    const ref = React.createRef();
    const [pickerOpen, setPickerOpen] = useState(false);
    const openPicker = (): void => {
      setPickerOpen(true);
      if (ref) {
        (ref.current as any).props.onShow();
      }
    };
    return (
      <>
        <Picker
          ref={ref}
          key='primary-color-picker'
          initialValue={Colors.amber500}
          open={pickerOpen}
          setOpen={setPickerOpen}
          dataSources={colors}
          onChangeValue={setPrimaryColor}
        />
        <Button onPress={openPicker}>Open picker</Button>
      </>
    );
  };
  const {getByText} = render(<Wrapper />);
  fireEvent.press(getByText('Open picker'));
  expect(RNPicker.init).toHaveBeenCalled();
  expect(RNPicker.show).toHaveBeenCalled();

  act(() => {
    (RNPicker.init as jest.Mock).mock.calls[0][0].onPickerConfirm(['Amber']);
  });
  expect(RNPicker.hide).toHaveBeenCalled();
  expect(setPrimaryColor).not.toHaveBeenCalled();
});
