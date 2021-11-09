import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DatePicker = ({ navigation }) => {

  const [selectedDate, setSelectedDate] = useState();

  return (
    <View style={{ paddingTop: 50, flex: 1 }}>
      <Calendar style={{ height: 350}}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#000',
          selectedDayTextColor: 'white',
          todayTextColor: '#000',
          dayTextColor: '#000',
          textDisabledColor: '#979797',
        }}
        onDayPress={(day) => { setSelectedDate({ [day.dateString]: { selected: true, selectedColor: '#4ec0ed' } }); navigation.navigate('MyTabs', { date: day }) }}

        markedDates={selectedDate}

        current={new Date()}
        monthFormat={'yyyy MM dd'}

        onMonthChange={month => {
          console.log('month changed', month);
        }}

        hideExtraDays={true}

        disableMonthChange={true}

        firstDay={1}
      />
    </View>
  );

}

export default DatePicker;

