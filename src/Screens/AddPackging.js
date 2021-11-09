import Loader1 from '../component/loader';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StatusBar, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';;
import Theme from '../Theme/Theme';
import { ProductList, save_Packging } from '../../utilis/Api/Api_controller';
import content from "../component/urduContent";
import { Btn } from "../../utilis/Btn";
import { get_data } from "../../utilis/AsyncStorage/Controller";


const AddPackging = ({ }) => {
  const [isLoading, setLoading] = useState(true);
  const [productDelivery, setProductDelivery] = useState([])
  const [errorIndex, setErrorIndex] = useState('')
  const [count, setCount] = useState(null);
  const [product, setProducts] = useState([]);
  const [user, setUser] = useState('')
  const [btn, setBtn] = useState(false)
  useEffect(async () => {
    let { user } = await get_data("USER")
    setUser(user)
    await getProduct();
  }, [])
  const getProduct = async () => {
    let resp = await ProductList()
    if (resp !== 'Error') {
      setProducts(resp.data);
      setLoading(false)
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.SHORT)
    }
  }

  const addProductdetail = (count, item, type) => {
    let title = item.productName
    let body = {
      ProductName: item.productName,
      PackingDate: new Date().toISOString().split("T")[0],
      Qty: Number(count),
      Size: type,
      DeliveryManId: user.id
    }
    let found = false;
    for (const index in productDelivery) {
      const user = productDelivery[index];
      if (user.ProductName == title && user.Size == type) {
        productDelivery.splice(index, 1, body);
        found = true;
        break;
      }
    }
    if (!found) {
      productDelivery.push(body)
      setBtn(true)
      return
    }

  }

  const submitPackging = async () => {
    let resp = await save_Packging(productDelivery)
    if (resp !== 'Error') {
      setLoading(true)
      ToastAndroid.show("ترسیل کامیابی کے ساتھ شامل کی گئی", ToastAndroid.SHORT)
      setProductDelivery([]);
      setBtn(false)
      setLoading(false)
    } else {
      ToastAndroid.show("کچھ غلط ہے", ToastAndroid.LONG)
      setProductDelivery([]);
      setBtn(false)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={[Theme.container, { backgroundColor: '#6cd2ff' }]}>
      <StatusBar backgroundColor="#000" />
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
        <Text style={Theme.datetext}>{content.Products}</Text>
        <Text style={[Theme.datetext, { marginLeft: 35 }]}>1 {content.Liter}</Text>
        <Text style={Theme.datetext}>1.5{content.Liter}</Text>
        <Text style={Theme.datetext}>2 {content.Liter}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? <Loader1 /> :
          <ScrollView>
            {product.map((item, index) => (
              <TouchableOpacity disabled={true} style={{ backgroundColor: '#F5F5F5', borderRadius: 25, marginVertical: 5, marginHorizontal: 10, padding: 20, flexDirection: 'row', flex: 1 }}>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>{item.productName}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                  <TextInput value={count} style={[Theme.productDetailInputStyle, { borderColor: index === errorIndex ? 'red' : null, borderWidth: index === errorIndex ? 1 : 0, marginVertical: 5, }]} keyboardType="numeric" selectionColor="#3489EB" blurOnSubmit={false} onChangeText={(count) => { addProductdetail(count, item, '1') }} />
                  <TextInput value={count} style={[Theme.productDetailInputStyle, { borderColor: index === errorIndex ? 'red' : null, borderWidth: index === errorIndex ? 1 : 0, marginVertical: 5 }]} keyboardType="numeric" selectionColor="#3489EB" blurOnSubmit={false} onChangeText={(count) => { addProductdetail(count, item, '1.5') }} />
                  <TextInput value={count} style={[Theme.productDetailInputStyle, { borderColor: index === errorIndex ? 'red' : null, borderWidth: index === errorIndex ? 1 : 0, marginVertical: 5 }]} keyboardType="numeric" selectionColor="#3489EB" blurOnSubmit={false} onChangeText={(count) => { addProductdetail(count, item, '2') }} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
      </View>
        <Btn disabled = {!btn} onPress={() => submitPackging()} text={content.OK} containerStyle={ !btn ?{backgroundColor:"grey",borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        marginRight: 55,
        marginBottom: 20,}:Theme.btnStyle} textStyle={Theme.btnTextstyle} />
    </SafeAreaView>
  );
}


export default AddPackging;