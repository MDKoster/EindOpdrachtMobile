import {
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
import { useRoute } from "@react-navigation/native";
import { ShopScreenProps } from "../navigation/types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
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
import { scrollTo } from "react-native-reanimated";

type DBitem = {
  name: string;
  price: number;
  images: string[];
  category: string;
  color: string;
  description: string;
  material: string;
  quantity: number;
  sizes: string[];
  style: string;
};

const ItemDetailComponent = () => {
  const {
    params: { item },
  } = useRoute<ShopScreenProps<"ItemDetail">["route"]>();
  const [itemResult, setItemResult] = useState<DBitem>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [aboutSelected, setAboutSelected] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const [imageFlex, setImageFlex] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    itemResult === null &&
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
  }, []);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

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

  const scrollViewRef = useRef<ScrollView>(null);
  const infoSectionRef = useRef<View>(null);

  const scrollToInfoSection = () => {
    infoSectionRef.current.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      },
      () => console.log("Error measuring layout")
    );
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
          onPress={() => setIsFavorite(!isFavorite)}
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
        <Text style={styles.priceStyle}>${itemResult?.price / 100}</Text>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: "100%",
            elevation: 1,
            backgroundColor: "white",
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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
        <Text
          style={[
            styles.textStyle,
            { color: darkModeSelected ? "white" : "black" },
          ]}
        >
          In stock: {itemResult?.quantity}
        </Text>
        <TouchableOpacity>
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
                Description
              </Text>
              <Text
                style={{
                  color: darkModeSelected ? "white" : "black",
                }}
              >
                {itemResult?.description}
              </Text>
            </View>
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
                Color
              </Text>
              <Text
                style={{
                  color: darkModeSelected ? "white" : "black",
                }}
              >
                {itemResult?.color}
              </Text>
            </View>
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
                Material
              </Text>
              <Text
                style={{
                  color: darkModeSelected ? "white" : "black",
                }}
              >
                {itemResult?.material}
              </Text>
            </View>
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
                {itemResult?.style}
              </Text>
            </View>
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
