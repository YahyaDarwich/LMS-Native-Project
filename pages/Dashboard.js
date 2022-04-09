import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Card from "../components/Card";
import { headers } from "../utils/token";

export default function Dashboard({ navigation }) {
  const [countClass, setCountClass] = useState(undefined);
  const [countStudent, setCountStudent] = useState(undefined);
  const [countCourse, setCountCourse] = useState(undefined);
  const [countAdmin, setCountAdmin] = useState(undefined);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/class`, headers).then((res) => {
      setCountClass(res.data.count);
    });
    axios.get(`http://localhost:8000/api/student`, headers).then((res) => {
      setCountStudent(res.data.count);
    });
    axios.get(`http://localhost:8000/api/admin`, headers).then((res) => {
      setCountAdmin(res.data.count);
    });
    axios.get(`http://localhost:8000/api/course`, headers).then((res) => {
      setCountCourse(res.data.count);
    });
  }, []);

  return (
    <>
      <ScrollView>
        <View>
          <Text style={styles.Text}>Hello, {"\n"}Yahya Darwich 👋</Text>
        </View>

        {/* MainActions */}
        <View style={styles.MainActions}>
          <TouchableOpacity onPress={() => navigation.navigate("Attendances")}>
            <View style={styles.Display}>
              <Image
                source={require(`../assets/attendance.png`)}
                fadeDuration={0}
                style={{ width: 80, height: 80 }}
              />
              <Text
                style={{ color: "#fefdff", fontWeight: "bold", fontSize: 15 }}
              >
                Attendances
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Reports")}>
            <View style={styles.Display}>
              <Image
                source={require(`../assets/reports.png`)}
                fadeDuration={0}
                style={{ width: 80, height: 80 }}
              />
              <Text
                style={{ color: "#fefdff", fontWeight: "bold", fontSize: 15 }}
              >
                Reports
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Cards */}
        <Card
          mainColor="#CE9FFC"
          secondColor="#7367F0"
          title="Admins"
          count={countAdmin}
          totalTitle="Total Admins"
          image={require("../assets/admins.png")}
        />
        <Card
          mainColor="#13f1fc"
          secondColor="#0470dc"
          title="Students"
          count={countStudent}
          totalTitle="Total Students"
          image={require("../assets/student.png")}
        />
        <Card
          mainColor="#b1ea4d"
          secondColor="#459522"
          title="Classes"
          count={countClass}
          totalTitle="Total Classes"
          image={require("../assets/class.png")}
        />
        <Card
          mainColor="#F36265"
          secondColor="#961276"
          title="Courses"
          count={countCourse}
          totalTitle="Total Courses"
          image={require("../assets/book.png")}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  MainActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "rgba(28, 29, 36, 0.5)",
    borderRadius: 20,
    width: "95%",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  Display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    color: "#fefdff",
    fontWeight: "bold",
    fontSize: 32,
    paddingLeft: "7%",
    paddingTop: 20,
    paddingBottom: 5,
  },
});
