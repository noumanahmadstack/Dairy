import Color from "./Colors";
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from "react-native-elements";

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
const Theme = StyleSheet.create({
    datePickerViewDes: { marginTop: 10, borderColor: '#3489eb', borderRadius: 10, elevation: 1, borderWidth: 2, padding: 5, alignItems: 'center', backgroundColor: '#fff' },
    container: {
        flex: 1,
    },
    loginBackground: {
        flex: 1,
        width: width,
        height: height,
        opacity: 0.9,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    heading: {
        marginTop: "18%",
        fontSize: 22,
        paddingLeft: 21,
        color: '#469238',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    datetext: {
        fontSize: 16,
        // paddingLeft: 21,
        color: '#000',
        fontWeight: 'bold'

    },
    textinput: {
        // marginLeft: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        color: '#000',
        marginLeft: 55,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderColor: '#dadae8',
        fontWeight: 'bold',
        marginTop: 20
    },
    registerationContainer: {
        flex: 2, backgroundColor: '#f5f5f5'
    },
    btnStyle: {
        backgroundColor: '#469238',
        color: '#fff',
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        marginRight: 55,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    DetailbtnStyle: {
        backgroundColor: '#3289ab',
        color: '#fff',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        marginLeft: 55,
        marginBottom: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    btnTextstyle: {
        color: '#fff',
        paddingVertical: 12,
        fontSize: 18,
        fontWeight: 'bold'
    },
    titleList: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 20
    },
    listheading: {
        marginTop: 5, fontWeight: 'bold', color: '#000',
    },
    listdetail: {
        marginTop: 5, color: '#000',
    },
    lstview: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    modalHeading: {
        fontWeight: 'bold', fontSize: 24
    },
    modalTitle: {

        fontWeight: 'bold', color: "#3489eb", fontSize: 18, width: 60
    },
    modalTitleView: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between'
    },
    textinputViewList: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ProductHeading: {
        fontWeight: 'bold', fontSize: 18

    },
    imageNewUser: {
        height: 70,
        width: 70,
        borderRadius: 50,
        alignSelf: 'center'
    },
    flatlistView: {
        alignItems: 'center',
    }
    , modalView: {
        justifyContent: 'flex-start'
    }, modalBtn: {
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: '#3489eb'
    },

    modalbtnTextStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalBtnView: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    modalInputStyle: {
        backgroundColor: "#ffffff",
        width: 80,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#dadae8',
        fontWeight: 'bold'
    },
    productDetailInputStyle: {
        backgroundColor: "#ffffff",
        marginVertical: 5,
        width: 50,
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#dadae8',
        fontWeight: 'bold'
    }
});

export default Theme;