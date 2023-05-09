import React, { useState } from 'react';
import {
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux';

import {
    Header,
    IconButton,
    TextButton,
    FormInput,
    FormDateInput,
    FormPicker
} from "../../components"
import { COLORS, SIZES, icons, constants } from "../../constants"
import { updateProfile } from '../../stores/auth/authActions';

const MyAccountEdit = ({ navigation }) => {
    const dispatch =useDispatch()
    const {current} = useSelector(state => state.authReducer);
    const [fullName, setFullName] = useState(current.userName)
    const [phoneNo, setPhoneNo] = useState(current.phone)
    const [dob, setDob] = useState(current.birthDay)
    const [gender, setGender] = useState(current.gender)
    const [email, setEmail] = useState(current.email||"")
   

const handleEditProfile =()=>{
let user = {
   id : current.id,
   userName:fullName,
   phone:phoneNo,

   gender:gender,
   email:email
}
dispatch(updateProfile({data:user})).then(()=>navigation.goBack())
}

    function renderHeader() {
        return (
            <Header
                title="MON COMPTE"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40
                }}
                leftComponent={
                    <IconButton
                        icon={icons.back}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.gray2,
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2
                        }}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightComponent={
                    <View
                        style={{
                            width: 40
                        }}
                    />
                }
            />
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Name */}
                <FormInput
                    label="Nom"
                    value={fullName}
                    onChange={(value) => {
                        setFullName(value)
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLORS.white
                    }}
                />

                {/* Phone Number */}
                <FormInput
                    label="Numéro de téléphone"
                    value={phoneNo}
                    onChange={(value) => {
                        setPhoneNo(value)
                    }}
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLORS.white
                    }}
                />

                {/* ID Card */}
                {/* <FormInput
                    label="ID de l'utilisateur"
                    value={idCard}
                    onChange={(value) => {
                        setIdCard(value)
                    }}
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLORS.white
                    }}
                /> */}

                {/* D.O.B */}
              

                {/* Gender */}
                <FormPicker
                    label="Genre"
                    placeholder="Select gender"
                    modalTitle="Select Gender"
                    value={gender}
                    setValue={setGender}
                    options={constants.gender}
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLORS.white
                    }}
                />

                {/* Email */}
                <FormInput
                    label="Email"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    value={email}
                    onChange={(value) => {
                        setEmail(value)
                    }}
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLORS.white
                    }}
                />

                {/* Address */}
           
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeader()}

            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 40
                }}
            >
                {renderForm()}
            </KeyboardAwareScrollView>

            <TextButton
                buttonContainerStyle={{
                    height: 60,
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                label="Sauvegarder"
                onPress={ handleEditProfile}
            />
        </View>
    )
}

export default MyAccountEdit;