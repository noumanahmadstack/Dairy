import Loader1 from '../component/loader';
import React, { useEffect, useState, createRef, useRef } from 'react';
import { SafeAreaView, View, FlatList, Modal, StyleSheet, KeyboardAvoidingView, ScrollView, ActivityIndicator, Text, TextInput, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { Feather } from "@expo/vector-icons";
export default function ActionModal() {
    const [modalSate, setModalState] = useState({ show: false, id: '' });
    const [count, setCount] = useState('0');
    const [cowCount, setcowCount] = useState('0');
    const [mixCount, setmixCount] = useState('0');
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalSate.show}
            onRequestClose={() => {
                setModalState({ ...modalSate, show: false });
            }} >
            <KeyboardAvoidingView behavior="position"
                enabled>
                <View style={styles.modalView}>


                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Delivery</Text>

                    </View>

                    <View style={{ marginTop: '15%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ fontWeight: 'bold', color: "#3489eb", fontSize: 18, width: 60 }}>Buffalo</Text>
                            </View>

                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    const co = parseInt(count) - 1;
                                    setCount(co.toString())
                                }}>

                                    <Feather name="minus-square" color="#3489eb" size={30} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType="numeric"
                                    selectionColor="#3489eb"
                                    value={count}
                                    onChangeText={setCount}

                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity onPress={() => {
                                    const co = parseInt(count) + 1;
                                    setCount(co.toString())
                                }}  >
                                    <Feather name="plus-square" color="#3489eb" size={30} />
                                </TouchableOpacity>


                            </View>


                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ fontWeight: 'bold', color: "#3489eb", fontSize: 18, width: 60 }}>Cow</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    const co = parseInt(cowCount) - 1;
                                    setcowCount(co.toString())
                                }}>
                                    <Feather name="minus-square" color="#3489eb" size={30} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType="numeric"
                                    selectionColor="#3489eb"
                                    // placeholderTextColor="#469238"
                                    value={cowCount}
                                    onChangeText={setcowCount}
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity onPress={() => {
                                    const co = parseInt(cowCount) + 1;
                                    setcowCount(co.toString())
                                }} >
                                    <Feather name="plus-square" color="#3489eb" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'flex-start' }}>

                                <Text style={{ fontWeight: 'bold', color: "#3489eb", fontSize: 18, width: 60 }}>Mix</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    const co = parseInt(mixCount) - 1;
                                    setmixCount(co.toString())
                                }} >
                                    <Feather name="minus-square" color="#3489eb" size={30} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType="numeric"
                                    selectionColor="#3489eb"
                                    // placeholderTextColor="#469238"
                                    value={mixCount}
                                    onChangeText={setmixCount}
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity onPress={() => {
                                    const co = parseInt(mixCount) + 1;
                                    setmixCount(co.toString())

                                }}
                                >
                                    <Feather name="plus-square" color="#3489eb" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalState({ ...modalSate, show: false, id: null })}
                                onPressIn={() => {
                                    const dataCopy = [...data]
                                    const ind = data.findIndex((mov) => mov.id === modalSate.id);
                                    dataCopy[ind].isSave = true;
                                    setData(dataCopy)
                                }


                                }
                            >
                                <Text style={styles.textStyle}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalState({ ...modalSate, show: false, id: null })}
                                onPressIn={() => {
                                    const dataCopy = [...data]
                                    const ind = data.findIndex((mov) => mov.id === modalSate.id);
                                    dataCopy[ind].isSave = true;
                                    setData(dataCopy)
                                }


                                }
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                style={styles.button}
                                onPress={() => setModalState({ ...modalSate, show: false, id: null })}
                                onPressIn={() => {
                                    //  const dataCopy  = [...data]
                                    const ind = data.findIndex((mov) => mov.id === modalSate.id);
                                    // dataCopy[ind].isSave = true;
                                    // setData(dataCopy)
                                }


                                }
                            >
                                <Text style={styles.textStyle}>Next</Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 32,
    },
    button: {
        marginTop: "10%",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: '#3489eb'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        // alignSelf:'center',
        //marginHorizontal: '4%' ,


    },
    inputStyle: {
        backgroundColor: "#ffffff",
        width: 120,
        color: '#000',

        // marginLeft:20,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 4,

        borderColor: '#dadae8',
        fontWeight: 'bold'
    },
    // inputStyle: {

    // borderBottomWidth:2,
    //      flex: 1,
    //   color: '#000',


    //   marginLeft:45
    // },
    modalView: {
        marginTop: 180,
        //margin: 20,
        marginHorizontal: "4%",
        height: '62%',
        width: '90%',
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

