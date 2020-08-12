import React, {useState} from 'react';
import dayjs from 'dayjs';
import {Button, Text, PickerDataItem, Picker, DatePicker, TimePicker} from '@core/components';
import {LANGUAGES} from '@core/contexts';
import {styles} from './picker-sample.styles';

const languages: PickerDataItem[] = LANGUAGES.map((lang) => ({value: lang.code, label: lang.text}));

export const PickerSample = (): JSX.Element => {
  const [language, setLanguage] = useState('vi');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Button testID='picker-button' style={styles.item} onPress={() => setPickerOpen(true)}>
        Open picker
      </Button>
      <Picker
        key='language-picker'
        value={language}
        open={pickerOpen}
        setOpen={setPickerOpen}
        dataSources={languages}
        onChangeValue={setLanguage}
      />
      <Text style={styles.text}>{languages.find((lang) => lang.value === language)?.label}</Text>
      <Button testID='date-picker-button' style={styles.item} onPress={() => setDatePickerOpen(true)}>
        Open date picker
      </Button>
      <DatePicker
        key='date-picker'
        value={date}
        open={datePickerOpen}
        setOpen={setDatePickerOpen}
        onChangeValue={setDate}
      />
      <Button testID='time-picker-button' style={styles.item} onPress={() => setTimePickerOpen(true)}>
        Open time picker
      </Button>
      <TimePicker
        key='time-picker'
        value={date}
        open={timePickerOpen}
        setOpen={setTimePickerOpen}
        onChangeValue={setDate}
      />
      <Text style={styles.text}>{dayjs(date).format('DD/MM/YYYY HH:mm')}</Text>
    </>
  );
};
