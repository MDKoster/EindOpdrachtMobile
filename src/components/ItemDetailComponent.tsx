import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ShopScreenProps } from "../navigation/types";
import { FlatList } from "react-native-gesture-handler";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import PaginationComponent from "./PaginationComponent";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const flatListRef = useRef<FlatList>(null);

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
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
      </View>
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
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.textStyle}>{itemResult?.name}</Text>
        <Text style={styles.textStyle}>${itemResult?.price / 100}</Text>
        <Text style={styles.textStyle}>{itemResult?.description}</Text>
        <Text style={styles.textStyle}>{itemResult?.material}</Text>
        <Text style={styles.textStyle}>{itemResult?.style}</Text>
        <Text style={styles.textStyle}>{itemResult?.color}</Text>
        <Text style={styles.textStyle}>{itemResult?.quantity}</Text>
        <FlatList
          horizontal={true}
          data={itemResult?.sizes}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                margin: 5,
              }}
              key={index}
            >
              {item}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemDetailComponent;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
});
