import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DBitem, ShopScreenProps } from "../navigation/types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import PaginationComponent from "./PaginationComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToShoppingCart } from "../../store/UserReducer";

const ItemDetailComponent = () => {
  const {
    params: { item },
  } = useRoute<ShopScreenProps<"ItemDetail">["route"]>();
  const navigator = useNavigation();
  const [itemResult, setItemResult] = useState<DBitem>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [aboutSelected, setAboutSelected] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [imageFlex, setImageFlex] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [orderAmount, setOrderAmount] = useState(1);
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const favorites = useAppSelector((state) => state.user.favorites);
  const dispatch = useDispatch();

  //fetch item data from firestore
  useEffect(() => {
    (async () => {
      try {
        const qr = await getDoc(doc(db, "items", item.id));
        const itemData = qr.data() as DBitem;

        // Preload images
        if (itemData && itemData.images) {
          const imagePromises = itemData.images.map((image) =>
            Image.prefetch(image)
          );
          await Promise.all(imagePromises);
        }

        setItemResult(itemData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [item]);

  //check if item is in favorites
  useEffect(() => {
    favorites?.find((favItem) => favItem.id === item.id) != undefined
      ? setIsFavorite(true)
      : setIsFavorite(false);
  }, []);

  //pagination for images
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  //animation for image resize. State is imageFlex, on change it animates the image (instead of just changing the size suddenly)
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: imageFlex,
      duration: 150,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [imageFlex]);

  //animation for product information section. On open, it scrolls to the section
  const scrollViewRef = useRef<ScrollView>(null);
  const infoSectionRef = useRef<View>(null);

  const scrollToInfoSection = () => {
    infoSectionRef.current.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      }
    );
  };

  const handleFavoritePress = async () => {
    if (isFavorite) {
      removeFavourite();
      setIsFavorite(false);
    } else {
      const addSuccessful = await addFavourite();
      setIsFavorite(addSuccessful);
    }
  };

  const addFavourite = async () => {
    const favoriteItem = {
      name: itemResult.name,
      price: itemResult.price,
      image: itemResult.images[0],
    };

    if (auth.currentUser == null) {
      alert("Please log in to add to favorites");
      return false;
    }

    try {
      const docRef = doc(
        db,
        `users/${auth.currentUser.uid}/favorites`,
        item.id
      );
      await setDoc(docRef, favoriteItem);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const removeFavourite = async () => {
    if (auth.currentUser == null) {
      return;
    }

    try {
      const docRef = doc(db, `users/${currentUser.id}/favorites`, item.id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementOrderAmount = () => {
    if (orderAmount < itemResult?.quantity) setOrderAmount(orderAmount + 1);
  };

  const decrementOrderAmount = () => {
    if (orderAmount > 1) {
      setOrderAmount(orderAmount - 1);
    }
  };

  const handleAddToCart = async () => {
    if (selectedValue == "") {
      alert("Please select a size");
      return;
    }

    if (orderAmount > itemResult?.quantity) {
      alert("Not enough stock. Please select a lower quantity");
      return;
    }

    if (auth.currentUser == null) {
      Alert.alert(
        "Please log in to add to cart",
        "",
        [
          { text: "Close" },
          {
            text: "Log in",
            onPress: () => {
              navigator.navigate("Account", { screen: "LogIn" });
            },
          },
        ],
        { cancelable: true }
      );
      return;
    }

    const cartItem = {
      id: item.id,
      name: itemResult.name,
      price: itemResult.price,
      image: itemResult.images[0],
      size: selectedValue,
      quantity: orderAmount,
      stock: itemResult.quantity,
    };

    dispatch(addToShoppingCart(cartItem));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected ? darkModeBackgroundColor : "#fafafa",
      }}
    >
      <Animated.View
        style={{
          flex: animatedValue,
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={30}
          color={isFavorite ? "red" : "white"}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 5,
          }}
          onPress={handleFavoritePress}
        />
        <SimpleLineIcons
          name={imageFlex === 1 ? "size-fullscreen" : "size-actual"}
          size={24}
          color="white"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 5,
          }}
          onPress={() => setImageFlex(imageFlex === 1 ? 4 : 1)}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <FlatList
            ref={flatListRef}
            data={itemResult?.images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Image
                style={{
                  width: Dimensions.get("window").width,
                }}
                src={item}
                key={index}
              />
            )}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
        </View>
      </Animated.View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <PaginationComponent
          currentIndex={currentIndex}
          data={itemResult?.images}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={imageFlex === 4 ? () => setImageFlex(1) : () => {}}
      >
        <Text
          style={[
            styles.title,
            { color: darkModeSelected ? "white" : "black" },
          ]}
        >
          {itemResult?.name}
        </Text>
        <Text
          style={[
            styles.textStyle,
            { color: darkModeSelected ? "white" : "black" },
          ]}
        >
          <Text>Unit price:</Text>
          {itemResult ? " $" + itemResult?.price / 100 : ""}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.textStyle,
                { color: darkModeSelected ? "white" : "black" },
              ]}
            >
              {orderAmount} unit(s):
            </Text>
            <Text style={styles.priceStyle}>
              {itemResult
                ? "$" + ((itemResult?.price / 100) * orderAmount).toFixed(2)
                : ""}
            </Text>
          </View>
          <Text
            style={[
              styles.textStyle,
              { color: darkModeSelected ? "white" : "black" },
            ]}
          >
            In stock: {itemResult?.quantity}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 5,
          }}
        >
          <Picker
            selectedValue={selectedValue}
            style={{
              flex: 1,
              height: 50,
              width: 180,
              elevation: 1,
              backgroundColor: "white",
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item
              label="Choose a size"
              value="Choose a size"
              enabled={false}
            />
            {itemResult?.sizes.map((size, index) => (
              <Picker.Item label={size} value={size} key={index} />
            ))}
          </Picker>
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 55,
              backgroundColor: "white",
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 10,
              }}
            >
              Amount
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <AntDesign
                name="minus"
                size={28}
                color="black"
                onPress={decrementOrderAmount}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                }}
              >
                {orderAmount}
              </Text>
              <AntDesign
                name="plus"
                size={28}
                color="black"
                onPress={incrementOrderAmount}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
          <View
            style={{
              flex: 1,
              height: 50,
              margin: 5,
              elevation: 1,
              overflow: "hidden",
              alignItems: "center",
              backgroundColor: "#00b815",
            }}
          >
            <Text
              style={{
                textAlignVertical: "center",
                height: 50,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Add to cart
            </Text>
          </View>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            setAboutSelected(!aboutSelected);
            scrollToInfoSection();
          }}
        >
          <View
            ref={infoSectionRef}
            style={{
              margin: 5,
              elevation: 1,
              backgroundColor: darkModeSelected
                ? darkModeBackgroundColor
                : lightModeBackgroundColor,
              shadowColor: darkModeSelected ? "white" : "black",
            }}
          >
            <View
              style={{
                height: 60,

                flex: 0.28,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 10,
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: darkModeSelected ? "white" : "black",
                }}
              >
                Product information
              </Text>
              <Entypo
                name="chevron-small-right"
                size={35}
                color={darkModeSelected ? "white" : "black"}
                style={{
                  transform: [{ rotate: aboutSelected ? "90deg" : "0deg" }],
                }}
              />
            </View>
            <TextComponent
              text={itemResult?.description}
              aboutSelected={aboutSelected}
            />
            <TextComponent
              text={itemResult?.color}
              aboutSelected={aboutSelected}
            />
            <TextComponent
              text={itemResult?.material}
              aboutSelected={aboutSelected}
            />
            <TextComponent
              text={itemResult?.style}
              aboutSelected={aboutSelected}
            />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDetailComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    margin: 5,
    marginVertical: 20,
  },
  priceStyle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    marginVertical: 20,
    color: "red",
  },
  productHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

const TextComponent = ({
  text,
  aboutSelected,
}: {
  text: string;
  aboutSelected: boolean;
}) => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginVertical: 10,
        display: aboutSelected ? "flex" : "none",
      }}
    >
      <Text
        style={[
          styles.productHeader,
          {
            color: darkModeSelected ? "white" : "black",
          },
        ]}
      >
        Style
      </Text>
      <Text
        style={{
          color: darkModeSelected ? "white" : "black",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
