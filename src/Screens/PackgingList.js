import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import { ProductList, List_Packging } from '../../utilis/Api/Api_controller';
import { get_data } from "../../utilis/AsyncStorage/Controller";
import Theme from '../Theme/Theme';
import content from "../component/urduContent";
import Loader1 from '../component/loader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';

const PackageList = ({ route, navigation }) => {
  // const {date}= route.params;
  const [Package, setPackages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [view, setView] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <TouchableOpacity style={{ padding: 5 }} onPress={() => { showDatePicker() }}><AntDesign name='calendar' size={16} /></TouchableOpacity>,
    });
  }, [navigation]);





  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date) => {
    // alert(date)
    setDate(date)

    setDatePickerVisibility(false)
    // alert(date.toISOString().split("T")[0])
  };
  const getPackage = async (date) => {
    setLoading(true)
    var array = []
    let { user } = await get_data("USER")
    let body = {
      id: user.id,
      Date: date.toISOString().split("T")[0],
    }
    // alert(JSON.stringify(body));
    let resp = await List_Packging(body)
    if (resp !== 'Error') {
      let respLp = resp.data
      let plist = await ProductList()
      if (plist !== "Error") {
        let respP = plist.data
        for (let index = 0; index < respP.length; index++) {
          let element = respP[index];
          element.data = []
          array.push(element)
        }
      }

      for (let i = 0; i < respLp.length; i++) {
        for (let index = 0; index < array.length; index++) {
          if (respLp[i].productName == array[index].productName) {
            let dada = {
              qty: respLp[i].qty,
              size: respLp[i].size
            }
            array[index].data.push(dada)
          }
        }
      }

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.data.length !== 0) {
          setView(true)
          break;
        }

      }
      setPackages(array)
      setLoading(false)
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.SHORT)
    }
  }

  useEffect(async () => {
    await getPackage(date);
  }, [date])

  return (
    <SafeAreaView style={[Theme.container, { backgroundColor: '#6cd2ff' }]}>
      <StatusBar backgroundColor="#000" />
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
        <Text style={Theme.datetext}>{content.Products}</Text>
        <Text style={Theme.datetext}>{content.Quantity}</Text>
        <Text style={Theme.datetext}>{content.size}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <View style={{ flex: 1 }}>
        {isLoading ? <Loader1 /> :
          view == true ?
            <View style={{ flex: 1 }}>
              <FlatList
                data={Package}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => (
                  <View>
                    {item.data.length !== 0 &&
                      <TouchableOpacity disabled={true} style={{ backgroundColor: '#f5f5f5', borderRadius: 25, marginVertical: 5, marginHorizontal: 10, padding: 20, flexDirection: 'row', }}>
                        <Text numberOfLines={2} style={{ fontWeight: 'bold', flex: 1, textAlignVertical: 'center' }}>{item.productName}</Text>
                        <View style={{ flexDirection: 'row', flex: 1, }}>
                          <View style={{ flex: 1, }}>
                            {item.data.map((item, key) => (
                              <View style={{ flexDirection: 'row', textAlign: 'center' }}>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>{item.qty}</Text>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>{item.size}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                  </View>
                )}
              />
            </View>
            : <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}> {content.NORecord}</Text>
        }
      </View>

    </SafeAreaView>
  )

}





export default PackageList;
