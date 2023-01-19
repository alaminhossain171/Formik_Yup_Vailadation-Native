import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInputField from './src/components/TextInputField'
import CustomButton from './src/components/CustomButton'
import * as yup from 'yup';
import { Formik } from 'formik';

let LoginSchema = yup.object().shape({


  email: yup.string().email('Please Enter Vaild Email').required('Email Required'),
  password: yup.string().min(8, ({ min }) => `Password must be at least ${min} Character`).required('Password Required ').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),

});


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1,justifyContent:'center' }}>
      <StatusBar backgroundColor={'coral'} />
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Formik Hook and YUP</Text>
      <Formik
        validateOnMount={true}
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => alert(`your email ${values.email} and your phone ${values.password}`)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
          <View>
            <TextInputField
              label={'Email'}
              placeholder='Enter your email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              Error={(errors.email && touched.email) ? errors.email : null}
            />

            <TextInputField
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              Error={(errors.password && touched.password) ? errors.password : null}
              label={'Password'} placeholder='Enter your password' secureTextEntry={true} />
            <CustomButton disibled={!isValid} title={'submit'} handleNavigation={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})