import React from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AuthScreenProps,
  AuthStackParamsList,
  SettingsScreenProps,
  SettingsStackParamsList,
} from "../../navigation/types";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/UserReducer";

const RegisterScreen = () => {
  const authNavigator =
    useNavigation<AuthScreenProps<"Register">["navigation"]>();
  const settingsNavigator =
    useNavigation<SettingsScreenProps<"AccountMain">["navigation"]>();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const { register } = useAuth();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 0.9 }}
      >
        <View
          style={[
            styles.formContainer,
            {
              backgroundColor: darkModeSelected
                ? darkModeBackgroundColor
                : lightModeBackgroundColor,
              shadowColor: darkModeSelected ? "white" : "black",
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: darkModeSelected ? "white" : "black" },
            ]}
          >
            Register
          </Text>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                await register(values.email, values.password, values.name);
                const newUser = {
                  displayName: values.name,
                };

                const docRef = doc(db, "users", auth.currentUser.uid);
                await setDoc(docRef, newUser);

                dispatch(
                  setUser({
                    id: auth.currentUser.uid,
                    userName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                  })
                );

                Alert.alert(
                  "Registration complete!",
                  "Thank you for registering! We hope you enjoy shopping at Gizmo.",
                  [
                    {
                      text: "Continue",
                      onPress: () =>
                        settingsNavigator.replace<
                          keyof SettingsStackParamsList
                        >("AccountMain"),
                    },
                  ]
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      { color: darkModeSelected ? "white" : "black" },
                    ]}
                  >
                    Name
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { shadowColor: darkModeSelected ? "white" : "black" },
                    ]}
                    placeholder="Enter your name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      { color: darkModeSelected ? "white" : "black" },
                    ]}
                  >
                    Email
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { shadowColor: darkModeSelected ? "white" : "black" },
                    ]}
                    placeholder="Enter a valid email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      { color: darkModeSelected ? "white" : "black" },
                    ]}
                  >
                    Password
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { shadowColor: darkModeSelected ? "white" : "black" },
                    ]}
                    placeholder="Choose a password"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                <Text
                  style={[
                    styles.footerText,
                    { color: darkModeSelected ? "white" : "black" },
                  ]}
                >
                  Already a member?{" "}
                  <Text
                    style={{ color: darkModeSelected ? "#BBAEFF" : "#0000CC" }}
                    onPress={() =>
                      authNavigator.navigate<keyof AuthStackParamsList>("Login")
                    }
                  >
                    Log in here!
                  </Text>
                </Text>

                <TouchableOpacity onPress={handleSubmit as () => {}}>
                  <View
                    style={[
                      styles.submitButton,
                      {
                        backgroundColor: darkModeSelected
                          ? "#7359FD"
                          : "#6B9ADD",
                        borderColor: darkModeSelected ? "#E6E1FF" : "#A2C1EB",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.submitButtonText,
                        { color: darkModeSelected ? "white" : "black" },
                      ]}
                    >
                      Register
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    minHeight: "86%",
    top: 25,
    margin: 20,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    flex: 0.15,
    fontSize: 24,
    fontWeight: "500",
    top: 40,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 0.2,
    justifyContent: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    paddingVertical: 5,
  },
  input: {
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 5,
    backgroundColor: "#fefefe",
    borderWidth: 1,
    borderColor: "grey",
    width: 300,
    height: 50,
    borderRadius: 10,
    elevation: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  footerText: {
    color: "black",
  },
  submitButton: {
    marginTop: 10,
    width: 200,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "400",
    paddingVertical: 10,
    textAlign: "center",
  },
});
