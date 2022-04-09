import { Text, StyleSheet, View, Image } from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Card(props) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[props.mainColor, props.secondColor]}
      style={styles.card}
    >
      <View style={styles.Primary}>
        <Image
          source={props.image}
          fadeDuration={0}
          style={{ width: 50, height: 50 }}
        />
        <Text style={styles.MainText}>{props.title}</Text>
      </View>
      <View style={styles.Secondary}>
        <Text style={styles.Number}>{props.count}</Text>
        <Text style={styles.SubText}>{props.totalTitle}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "86%",
    height: 100,
    borderRadius: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 20,
  },
  Primary: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Secondary: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Number: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    fontSize: 30,
  },
  MainText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  SubText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
  },
});
