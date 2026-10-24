import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Badge from "../components/Badge";
import { PRODUCTS } from "../data/products";
import { getColumns, getDeviceClass } from "../utils/breakpoints";
import { colors, spacing } from "../theme";

export default function GalleryScreen() {
  // Paso 1
  const { width } = useWindowDimensions();

  // Paso 2
  const columns = getColumns(width);
  const itemWidth = width / columns;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Badge>{columns} columnas</Badge>
        <Badge tone="info">{getDeviceClass(width)}</Badge>
        <Text style={styles.hint}>{width.toFixed(0)} dp</Text>
      </View>
      {}
      <FlatList
        key={columns}
        data={PRODUCTS}
        keyExtractor={(p) => p.id}
        numColumns={columns}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, height: itemWidth, padding: 2 }}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.caption} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
