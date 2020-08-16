import React, {useState} from 'react';
import dayjs from 'dayjs';
import {Button, Text, PickerDataItem, Picker, DatePicker, TimePicker} from '@core/components';
import {LANGUAGES} from '@core/contexts';
import {config} from '@core/config';
import {styles} from './picker-sample.styles';

const languages: PickerDataItem[] = LANGUAGES.map((lang) => ({value: lang.code, label: lang.text}));

export const PickerSample = (): JSX.Element => {
  const [language, setLanguage] = useState('vi');
  const [openPicker, setOpenPicker] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Button testID='picker-button' style={styles.item} onPress={() => setOpenPicker(true)}>
        Open picker
      </Button>
      <Picker
        key='language-picker'
        value={language}
        open={openPicker}
        setOpen={setOpenPicker}
        dataSources={languages}
        onChangeValue={(value) => setLanguage(value || config().defaultLang)}
      />
      <Text style={styles.text}>{languages.find((lang) => lang.value === language)?.label}</Text>
      <Button testID='date-picker-button' style={styles.item} onPress={() => setOpenDatePicker(true)}>
        Open date picker
      </Button>
      <DatePicker
        key='date-picker'
        value={date}
        open={openDatePicker}
        setOpen={setOpenDatePicker}
        onChangeValue={setDate}
      />
      <Button testID='time-picker-button' style={styles.item} onPress={() => setOpenTimePicker(true)}>
        Open time picker
      </Button>
      <TimePicker
        key='time-picker'
        value={date}
        open={openTimePicker}
        setOpen={setOpenTimePicker}
        onChangeValue={setDate}
      />
      <Text style={styles.text}>{dayjs(date).format('DD/MM/YYYY HH:mm')}</Text>
    </>
  );
};
