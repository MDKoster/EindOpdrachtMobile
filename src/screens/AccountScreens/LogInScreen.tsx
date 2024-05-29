import React, { useState } from "react";
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
} from "../../navigation/types";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { useAppSelector } from "../../hooks/Selector";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/UserReducer";

const LogInScreen = () => {
  const authNavigator = useNavigation<AuthScreenProps<"Login">["navigation"]>();
  const settingsNavigator =
    useNavigation<SettingsScreenProps<"AccountMain">["navigation"]>();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleUserLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      if (auth.currentUser) {
        console.log(
          "User logged in successfully: " + auth.currentUser.displayName
        );
        dispatch(
          setUser({
            id: auth.currentUser.uid,
            userName: auth.currentUser.displayName,
            email: auth.currentUser.email,
          })
        );
        Alert.alert(
          `Welcome back, ${auth.currentUser.displayName}`,
          "You have successfully logged in!"
        );
        settingsNavigator.goBack();
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).")
        setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 0.9 }}
      >
        <View
          style={{
            minHeight: "86%",
            top: 25,
            margin: 20,
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            elevation: 5,
            shadowColor: darkModeSelected ? "white" : "black",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 0.2,
              fontSize: 24,
              fontWeight: "500",
              top: 40,
              marginBottom: 20,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Log into your account
          </Text>

          <Text
            style={{
              flex: 0.1,
              color: "red",
              top: 40,
            }}
          >
            {errorMessage}
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUserLogin(values.email, values.password);
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
                    Email
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { shadowColor: darkModeSelected ? "white" : "black" },
                    ]}
                    placeholder="Enter your email"
                    onFocus={() => setErrorMessage("")}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    value={values.email}
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
                    placeholder="Enter your password"
                    secureTextEntry
                    onFocus={() => setErrorMessage("")}
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
                  Not a member?{" "}
                  <Text
                    style={{ color: darkModeSelected ? "#BBAEFF" : "#0000CC" }}
                    onPress={() =>
                      authNavigator.navigate<keyof AuthStackParamsList>(
                        "Register"
                      )
                    }
                  >
                    Register here!
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
                      Log in
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

export default LogInScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.2,
    justifyContent: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    paddingVertical: 10,
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
    flex: 0.1,
    color: "black",
  },
  submitButton: {
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
