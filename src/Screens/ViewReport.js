
import Loader1 from '../component/loader';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import CircleBackground from '../component/background';
import Theme from '../Theme/Theme';
import { Report } from '../../utilis/Api/Api_controller';
import content from "../component/urduContent";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const ViewReport = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const indexRef = useRef();
  const [reportdata, setReportData] = useState([]);
  const [type, setType] = useState('from')
  var date = new Date()
  const [startDate, setStartDate] = useState(date);
  const [toDate, setToDate] = useState(date)

  const showDatePicker = (type) => {
    setType(type)
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date) => {
    type == 'from' ? setStartDate(date) : setToDate(date)
    setDatePickerVisibility(false)
  };


  useEffect(async () => {
    await getReport();
  }, [startDate, toDate])

  const getReport = async () => {
    setLoading(true)
    let body = {
      fromDate: startDate.toISOString().split("T")[0],
      toDate: toDate.toISOString().split("T")[0]
    }
    let resp = await Report(body)
    if (resp !== 'Error') {
      setReportData(resp.data)
      setLoading(false)
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.LONG)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBar backgroundColor="#000" />
      <CircleBackground />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
        <Text style={Theme.datetext}>
          From Date
        </Text>
        <Text style={Theme.datetext}>
          To Date
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
        <Text onPress={() => showDatePicker('from')}>{startDate.toISOString().split("T")[0]}</Text>
        <Text onPress={() => showDatePicker('to')}>{toDate.toISOString().split("T")[0]}</Text>
      </View>
     

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
       <View style={{ flexDirection: 'row', padding: 15, justifyContent:'space-around'}}>
        <Text style={[Theme.datetext,{}]}>{content.Products}</Text>
        <Text style={[Theme.datetext,{}]}>{content.Quantity}</Text>
        <Text style={[Theme.datetext,{}]}>{content.Price}</Text>
        <Text style={[Theme.datetext,{}]}>{content.Amount}</Text>
        <Text style={[Theme.datetext,{}]}>{content.Date}</Text> 
       
      </View>
      {isLoading ? <Loader1 /> :
        <FlatList style={{ flex: 1, }}
          data={reportdata}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) =>
          (
            <TouchableOpacity disabled={true} style={{ backgroundColor: item.isSaved ? 'rgba(239, 239, 238, 0.5)' : 'white', opacity: 1.6, borderRadius: 25, marginVertical: 15, marginHorizontal: 10, padding: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <Text numberOfLines={2} style={{ fontWeight: 'bold',fontSize:24 }}>{item.customerName}</Text>
              </View>
           
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>
              
                  <View style={{ flex: 1, }}>
                    {item.packing.map((item, key) => (
                    
                      <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'space-between' ,marginVertical:5}}>
                        <Text numberOfLines={2} style={{ fontWeight:'bold', width: '30%' }}>{item.productName}</Text>
                       
                        <Text >{item.morningQty}</Text>
                        <Text >{item.rate}</Text>
                        <Text >{item.totalAmount}</Text>
                        <Text>{item.saleDate.split("T")[0]}</Text>
                       
                      </View>
                     
                    
                    ))}
                  </View>
               
                </View>
              
              </View>
            </TouchableOpacity>
          )}
          ref={indexRef}
        />
      }

    </SafeAreaView>
  );
}


export default ViewReport;