import Loader1 from '../component/loader';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, TextInput, StatusBar, Image, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from 'react-native';
import CircleBackground from '../component/background';
import Modal from "react-native-modal";
import Theme from '../Theme/Theme';
import { customer_list, save_Delivery, sale_List } from '../../utilis/Api/Api_controller';
import { get_data } from "../../utilis/AsyncStorage/Controller";
import content from "../component/urduContent";
import AntDesign from 'react-native-vector-icons/AntDesign';


const CustomerList = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const indexRef = useRef();
  const [data, setData] = useState([]);
  const [modalSate, setModalState] = useState({ show: false, id: '', title: '', data: '', index: '' });
  const [date, setDate] = useState(route.params.dateString)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState(false)
  const [productDelivery, setProductDelivery] = useState([])
  const [errorIndex, setErrorIndex] = useState('')
  const [indexError, setIndexError] = useState('')
  const [count, setCount] = useState(null)
  const [respData, setrespData] = useState([])

  const renderPrevousItem = () => {
    if (currentIndex !== 0) {
      let indes = data[currentIndex - 1];
      setModalState({ ...modalSate, id: indes.customerId, data: indes });
      setCurrentIndex(currentIndex - 1)
      clearState();
      setProductDelivery([]);
    }
  };

  const renderNextItem = () => {
    if (currentIndex + 1 !== data.length) {
      let indes = data[currentIndex + 1]; setModalState({ ...modalSate, id: indes.customerId, data: indes }); setCurrentIndex(currentIndex + 1)
      clearState();
      setProductDelivery([]);
    }
  }

  const modelHandler = (itemId, itemIndex, item) => {
    setStatus(true)
    setModalState({ ...modalSate, show: true, id: itemId, data: item, index: itemIndex });
    setCurrentIndex(itemIndex);
  }

  const clearState = () => {
    setCount("");
  };

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getCustomers();
    });
    await getCustomers();
    return () => unsubscribe;
  }, [navigation])

  const getCustomers = async () => {
    setLoading(true)
    let { user } = await get_data("USER")
    let body = {
      id: user.id
    }
    let resp = await customer_list(body)
    if (resp !== 'Error') {
      setData(resp.data)
      setLoading(false)
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.LONG)
      setLoading(false)
    }
  }

  const addProductdetail = async (count, item, indexs) => {
    setCount(null)
    let body = {
      customerId: modalSate.data.customerId,
      productId: item.productId,
      saleDate: new Date().toISOString().split("T")[0],
      quantity: count,
      productName: item.productName
    }
    respData.splice(indexs, 1, body);
  }


  const submitDelivery = async () => {
    let newdata = [];
    for (let index = 0; index < respData.length; index++) {
      const element = respData[index];
      if (element.quantity !== 0 && element.quantity !== '') {
        element["saleDate"] = new Date().toISOString().split("T")[0]
        newdata.push(element)
      }
    }
    console.log(newdata,"dfgh")
    let resp = await save_Delivery(newdata)
    if (resp !== 'Error') {
      setLoading(true)
      ToastAndroid.show("ترسیل کامیابی کے ساتھ شامل کی گئی", ToastAndroid.SHORT)
      getCustomers();
      setProductDelivery([]);
      setModalState({ ...modalSate, show: false, id: null })
      setLoading(false)
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.LONG)
      setProductDelivery([]);
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBar backgroundColor="#000" />
      <CircleBackground />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <Text style={Theme.datetext}>{content.Date}: <></>{date}</Text>
      </View>
      {isLoading ? <Loader1 /> :
        <FlatList style={{ flex: 1 }}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) =>
          (
            <TouchableOpacity style={{ backgroundColor: item.isSaved ? 'rgba(192, 244, 132, 0.5)' : 'white', opacity: 1.6, borderRadius: 25, marginVertical: 15, marginHorizontal: 10, padding: 20 }} onPress={() => { modelHandler(item.id, index, item); setrespData(item.customerProductDetailApi) }}>
              <View style={{ marginTop: -35 }}>
                <Image source={require('../../assets/newuser.jpg')} style={Theme.imageNewUser}></Image>
              </View>
              <View style={Theme.flatlistView}>
                <Text style={Theme.titleList}>{item.customerName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                  <Text style={Theme.titleList}>{item.serialNo}</Text>
                  <Text style={Theme.titleList}>{content.SerialNo}: </Text>
                </View>
              </View>

              {item.customerContactNo &&
                <View style={Theme.lstview}>
                  <Text style={Theme.listdetail}>{item.customerContactNo}</Text>
                  <Text style={Theme.listheading}>{content.ContactNo}: </Text>
                </View>
              }
              {item.customerAddress &&
                <View style={Theme.lstview}>
                  <Text style={Theme.listdetail}>{item.customerAddress}</Text>
                  <Text style={Theme.listheading}>{content.Address}:</Text>
                </View>
              }
            </TouchableOpacity>
          )}
          ref={indexRef}
        />
      }


      <Modal backdropOpacity={0.6} isVisible={modalSate.show} >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ padding: 5 }} onPress={() => { setModalState({ ...modalSate, show: false }); }}><AntDesign name='closesquare' size={25} color={'#3489eb'} /></TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#f2f2f2", borderRadius: 20, padding: 35, }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={Theme.modalHeading}>{content.Delivery}</Text>
            <Text style={Theme.modalHeading}>{modalSate.data.customerName}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: '5%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={Theme.ProductHeading}>{content.Products}</Text>
                <Text style={Theme.ProductHeading}>{content.Quantity}</Text>
              </View>
              <FlatList
                data={modalSate.data.customerProductDetailApi}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) =>
                (
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'black' }}>{item.productName}</Text>
                      <TextInput value={count} style={[Theme.modalInputStyle, { borderColor: index === errorIndex ? 'red' : null, borderWidth: index === errorIndex ? 1 : 0, marginVertical: 5 }]} keyboardType="numeric" selectionColor="#3489eb" blurOnSubmit={false} onChangeText={(count) => { addProductdetail(count, item, index) }} >{item.quantity.toString()}</TextInput>
                    </View>
                    {index === errorIndex && indexError !== "" ?
                      <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{indexError}</Text>
                      : null
                    }
                  </View>
                )}
              />

              <View style={Theme.modalBtnView}>
                <TouchableOpacity style={Theme.modalBtn} onPress={() => { renderPrevousItem() }}>
                  <Text style={Theme.modalbtnTextStyle}>{content.Previous}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Theme.modalBtn} onPress={() => { submitDelivery() }}>
                  <Text style={Theme.modalbtnTextStyle}>{content.OK}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Theme.modalBtn} onPress={() => { renderNextItem() }} >
                  <Text style={Theme.modalbtnTextStyle}>{content.Next}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>

      </Modal>
    </SafeAreaView>
  );
}


export default CustomerList;