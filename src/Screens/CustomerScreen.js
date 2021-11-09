import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, PermissionsAndroid, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ToastAndroid } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import CircleBackground from '../component/background';
import { FormInput } from '../../utilis/Text_input';
import { CustomerScreen_validation } from '../../utilis/validation';
import { ProductList, CustomerReg } from "../../utilis/Api/Api_controller";
import Geolocation from 'react-native-geolocation-service';
import { Btn } from "../../utilis/Btn";
import { save_data, get_data } from "../../utilis/AsyncStorage/Controller";
import Theme from '../Theme/Theme';
import content from "../component/urduContent";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Loader from "../../utilis/Loader";

const AddCustomer = ({ navigation }) => {
  const [modalSate, setModalState] = useState({ show: false, id: '' });
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const[serialNo, setSerialNo] = useState('')
  const [userPrice, setUserPrice] = useState('');
  const [quantity, setquantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  let [selectedItems, setSelectedItems] = useState([]);
  const [product, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [errorIndex, setErrorIndex] = useState('')
  const [indexError, setIndexError] = useState('')
  const [q, setQ] = useState(false)
  
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    var array = []
    for (const index in selectedItems) {
      let selected = selectedItems[index]
      for (const index in product) {
        if (selected == product[index].productId) {
          var data = {
            ProductId: selected,
            productName: product[index].productName,
            AdditionalRate: '',
            Quantity: ''
          }
          break
        }
      }
      array.push(data)
      setData(array)
    }
  };
  const addProductdetail = async (AdditionalRate, item, index, type) => {
    let title = item.productName
    if (title == item.productName) {
      if (type == 'Price') {
        item.AdditionalRate = AdditionalRate
      } else {
        item.Quantity = AdditionalRate
      }
    }
    let found = false;
    for (const index in data) {
      const user = data[index];
      if (user.productName == title) {
        found = true;
        break;
      }
    }
    if (!found) {
      data.push(item);
      return
    } else {
      const index = data.findIndex(item => item.productName == title);
      data.splice(index, 1, item);
      return
    }
  }
  useEffect(async () => {
    await getProduct();
  }, [])
  const getProduct = async () => {
    let resp = await ProductList()
    if (resp !== 'Error') {
      setProducts(resp.data);
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.SHORT)
    }
  }



  const saveCustomer = async () => {
    let validate = CustomerScreen_validation(userName, userAddress, userMobile,serialNo, data.length)
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      const ePindex = data.findIndex(item => item.AdditionalRate == "");
      const eQindex = data.findIndex(item => item.Quantity == "");
      const lPindex = data.findIndex(item => item.AdditionalRate < 10);
      if (ePindex >= 0) {
        setModalState({ ...modalSate, show: true, data })
        setErrorIndex(ePindex)
        setQ(false)
        setIndexError("براہ کرم قیمت درج کریں۔")
        return
      } else if (lPindex >= 0) {
        setModalState({ ...modalSate, show: true, data })
        setErrorIndex(lPindex)
        setQ(false)
        setIndexError("کم از کم قیمت 10 ہونی چاہیے۔")
        return
      }
      else if (eQindex >= 0) {
        setModalState({ ...modalSate, show: true, data })
        setErrorIndex(eQindex)
        setQ(true)
        setIndexError("برائے مہربانی مقدار درج کریں")
        return
      }
      else {
        setQ(null)
        setIndexError("")
        setModalState({ ...modalSate, show: false, id: null })
        setLoading(true)
        let { user } = await get_data("USER")
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
          .then(async () => {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  'title': 'Dairy App',
                  'message': 'Dairy App access to your location '
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                  async (position) => {
                    let body = {
                      CustomerSalesMan: user.id,
                      CustomerName: userName,
                      CustomerAddress: userAddress,
                      CustomerContactNo: userMobile,
                      SerialNo:serialNo,
                      CustomerEmail: "test@gmail.com",
                      Longitude: position.coords.longitude,
                      Latitude: position.coords.latitude,
                      CustomerProductsDetail: data
                    }
                    let resp = await CustomerReg(body)
                    if (resp !== 'Error') {
                      setLoading(true)
                      await save_data("Customer", resp.data)
                      ToastAndroid.show("کسٹمر کامیابی سے شامل ہو گیا", ToastAndroid.SHORT)
                      setLoading(false)
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'CustomerList' }]
                      })
                    } else {
                      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.LONG)
                      setLoading(false)
                    }
                  },
                  (error) => {
                    ToastAndroid.show(error.code, error.message, ToastAndroid.LONG)
                    setLoading(false)
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
              } else {
                ToastAndroid.show("Location permission denied", ToastAndroid.LONG)
                setLoading(false)
              }
            } catch (err) {
              setLoading(false)
            }
          }).catch(err => {
            alert("Error " + err.message + ", Code : " + err.code);
            ToastAndroid.show("Error " + err.message + ", Code : " + err.code, ToastAndroid.LONG)
            setLoading(false)
          });
        return
      }
    }
  }
  const OK = () => {
    const ePindex = data.findIndex(item => item.AdditionalRate == "");
    const eQindex = data.findIndex(item => item.Quantity == "");
    const lPindex = data.findIndex(item => item.AdditionalRate < 10);
    if (ePindex >= 0) {
      setModalState({ ...modalSate, show: true, data })
      setErrorIndex(ePindex)
      setQ(false)
      setIndexError("براہ کرم قیمت درج کریں۔")
      return
    } else if (lPindex >= 0) {
      setModalState({ ...modalSate, show: true, data })
      setErrorIndex(lPindex)
      setQ(false)
      setIndexError("کم از کم قیمت 10 ہونی چاہیے۔")
      return
    }
    else if (eQindex >= 0) {
      setModalState({ ...modalSate, show: true, data })
      setErrorIndex(eQindex)
      setQ(true)
      setIndexError("برائے مہربانی مقدار درج کریں")
      return
    }
    else {
      setQ(null)
      setIndexError("")
      setModalState({ ...modalSate, show: false, id: null })
      return
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <CircleBackground />
      <Loader animating={loading} />
      <ScrollView>
        <FormInput
          text_input_container={[Theme.textinput, { marginLeft: 0 }]}
          containerStyle={{ marginLeft: Theme.textinput.marginLeft }}
          style={{ flex: 1, color: 'black' }}
          onChangeText={(userName) => { setErrortext(''), setUserName(userName) }}
          underlineColorAndroid="#0000"
          placeholder={content.EnterName}
          selectionColor="#469238"
          placeholderTextColor="#469238"
          error={errortext === "Please Enter Your name" ? "براہ مہربانی اپنا نام درج کریں" : null || errortext === "Name must should contain 3 letters" ? "Name must should contain 3 letters" : null}
        />
        <FormInput
          text_input_container={[Theme.textinput, { marginLeft: 0 }]}
          containerStyle={{ marginLeft: Theme.textinput.marginLeft }}
          style={{ flex: 1, color: 'black' }}
          onChangeText={(userAddress) => { setErrortext(''), setUserAddress(userAddress) }}
          underlineColorAndroid="#0000"
          placeholder={content.EnterAddress}
          selectionColor="#469238"
          placeholderTextColor="#469238"
          error={errortext === "Please Enter Your Address" ? "براہ کرم اپنا پتہ درج کریں۔" : null}
        />
        <FormInput
          text_input_container={[Theme.textinput, { marginLeft: 0 }]}
          containerStyle={{ marginLeft: Theme.textinput.marginLeft }}
          style={{ flex: 1, color: 'black' }}
          onChangeText={(userMobile) => { setErrortext(''), setUserMobile(userMobile) }}
          underlineColorAndroid="#0000"
          placeholder={content.EnterMobileNo}
          keyboardType="number-pad"
          selectionColor="#469238"
          placeholderTextColor="#469238"
          error={errortext === "Please Enter Your Mobile" ? "براہ کرم اپنا موبائل درج کریں۔" : null || errortext === "Phone Number must should contain 11 digits" ? "فون نمبر 11 ہندسوں پر مشتمل ہونا چاہیے۔" : null}
        />
         <FormInput
          text_input_container={[Theme.textinput, { marginLeft: 0 }]}
          containerStyle={{ marginLeft: Theme.textinput.marginLeft }}
          style={{ flex: 1, color: 'black' }}
          onChangeText={(serialNo) => { setErrortext(''), setSerialNo(serialNo) }}
          underlineColorAndroid="#0000"
          placeholder={content.PleaseEnterSerialNo}
          keyboardType="number-pad"
          selectionColor="#469238"
          placeholderTextColor="#469238"
          error={errortext === "Please Enter Your Serial No" ? "براہ کرم سیریل نمبر درج کریں۔": null}
        />
        <MultiSelect
          styleMainWrapper={{ marginTop: 22, marginRight: -20, marginLeft: 50 }}
          styleListContainer={{ borderRadius: 12 }}
          styleSelectorContainer={{ borderRadius: 12 }}
          styleDropdownMenuSubsection={{ borderRadius: 40, width: 50, height: 50 }}
          hideTags
          items={product}
          uniqueKey="productId"
          onSelectedItemsChange={(e) => { setErrortext(''); onSelectedItemsChange(e) }}
          selectedItems={selectedItems}
          selectText={content.SelectProduct}
          textColor="#469238"
          searchInputPlaceholderText="Search Items..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#469238"
          selectedItemIconColor="#469238"
          itemTextColor="#000"
          displayKey="productName"
          searchInputStyle={{ color: '#000' }}
          submitButtonColor="#469238"
          submitButtonText="Submit"
          hideSubmitButton
        />
        {errortext === "Please Select Product" ? <Text style={{ color: 'red', marginVertical: 5, textAlign: 'center' }}>{content.SelectProduct}</Text> : null}
        {data.length!== 0 && <Btn  onPress={() => { setModalState({ ...modalSate, show: true, data }) }} text={content.EnterProductDetail} containerStyle={Theme.DetailbtnStyle} textStyle={Theme.btnTextstyle} />}
       
        <Modal backdropOpacity={0.6} isVisible={modalSate.show} onRequestClose={() => { setModalState({ ...modalSate, show: false }); }} >
          <View style={{ backgroundColor: "#f2f2f2", borderRadius: 20, padding: 35, }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={Theme.modalHeading}>{content.ProductDetail}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={Theme.ProductHeading}>{content.Products}</Text>
              </View>
              <View style={{ paddingStart: 75 }}>
                <Text style={Theme.ProductHeading}>{content.Price}</Text>
              </View>
              <View>
                <Text style={Theme.ProductHeading}>{content.Quantity}</Text>
              </View>
            </View>
            <FlatList data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, index }) => (
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: "60%" }}>
                      <Text>{item.productName}</Text>
                    </View>
                    <TextInput value={item.AdditionalRate} style={[Theme.productDetailInputStyle, { borderColor: index === errorIndex && q == false ? 'red' : null, borderWidth: index === errorIndex && q == false ? 1 : 0 }]} keyboardType="numeric" selectionColor="#3489eb" blurOnSubmit={false} onChangeText={(userPrice) => { setUserPrice({ errors: '' }), addProductdetail(userPrice, item, index, 'Price') }} />
                    <TextInput value={item.Quantity} style={[Theme.productDetailInputStyle, { borderColor: index == errorIndex && q == true ? 'red' : null, borderWidth: index === errorIndex && q == true ? 1 : 0 }]} keyboardType="numeric" selectionColor="#3489eb" blurOnSubmit={false} onChangeText={(userQuantity) => { setquantity({ errors: '' }), addProductdetail(userQuantity, item, index, 'Quantity') }} />
                  </View>
                  {index === errorIndex && indexError !== "" ?
                    <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{indexError}</Text>
                    : null
                  }
                </View>
              )
              }
            />
            <TouchableOpacity style={Theme.modalBtn} onPress={() => { OK() }} >
              <Text style={Theme.modalbtnTextStyle}>{content.OK}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
      <Btn onPress={() => saveCustomer()} text={content.OK} containerStyle={Theme.btnStyle} textStyle={Theme.btnTextstyle} />
    </SafeAreaView>
  );
};
export default AddCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  SectionStyle: {
    flexDirection: 'row',
    marginHorizontal: 25,
    margin: 10,
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },

  dropinputStyle: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 20,
    marginLeft: 55,
    borderWidth: 1,
    borderColor: '#dadae8',
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});