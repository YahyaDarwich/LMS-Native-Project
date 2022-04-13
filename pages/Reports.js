import { View, Text, StyleSheet, ScrollView, Picker } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "react-native-chart-kit";
import PureChart from "react-native-pure-chart";
import { Dimensions } from "react-native";
import {IP} from "@env"

export default function Reports(props) {
  const [allData, setAllData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState();
  const [show, setShow] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [class_name, setClass_name] = useState("");
  const [sections, setSections] = useState([]);
  const [section_id, setSection_id] = useState();
  const [section_name, setSection_name] = useState("");
  const [students, setStudents] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    // const getValueFor = async () => {
    //   let token = await SecureStore.getItemAsync("TOKEN");
    //   const headers = { headers: { Authorization: `Bearer ${token}` } };
    //   setHeaders(headers);
    // };
    // getValueFor();
    axios
      .get(`http://${IP}/api/class`, props.headers)
      .then((res) => {
        if (res.status === 200) {
          setClasses(res.data.data);
          setClass_id(res.data.data[0].id);
          setClass_name(res.data.data[0].name);
        }
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    if (class_id) {
      axios
        .get(`http://${IP}/api/class/${class_id}`, props.headers)
        .then((res) => {
          if (res.status === 200) {
            setSections(res.data.data.sections);
            setSection_id(res.data.data.sections[0].id);
            setClass_name(res.data.data.name);
            setSection_name(res.data.data.sections[0].name);
          }
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [class_id]);

  useEffect(() => {
    axios
      .get(`http://${IP}/api/section/${section_id}`, props.headers)
      .then((res) => {
        console.log(res.data.data.students);
        setSection_name(res.data.data.name);
        let studentsarray = res.data.data.students;
        let rows = [];
        studentsarray.map((student) => {
          let p = 0;
          let l = 0;
          let a = 0;
          student.attendance.map((attendance) => {
            if (attendance.status_id === 1) p++;
            if (attendance.status_id === 2) l++;
            if (attendance.status_id === 3) a++;
          });
          let t = p + l + a;
          rows = [
            ...rows,
            {
              id: student.id,
              name: student.first_name + " " + student.last_name,
              image: student.image,
              attendance: {
                present: ~~((p / t) * 100).toFixed(2),
                late: ~~((l / t) * 100).toFixed(2),
                absent: ~~((a / t) * 100).toFixed(2),
              },
            },
          ];
        });
        setStudents(rows);

        //sections percentage
        let p = 0,
          l = 0,
          a = 0;
        studentsarray.forEach((element) => {
          element.attendance.map((attendance) => {
            if (attendance.status_id === 1) p++;
            if (attendance.status_id === 2) l++;
            if (attendance.status_id === 3) a++;
          });
        });
        let t = p + l + a;
        setSectionData([
          {
            value: parseInt(((p / t) * 100).toFixed(2)),
            name: "present",
            color: "green",
            legendFontColor: "#a968cf",
            legendFontSize: 17,
            fontWeight: "bold",
          },
          {
            value: parseInt(((l / t) * 100).toFixed(2)),
            name: "late",
            color: "yellow",
            legendFontColor: "#a968cf",
            legendFontSize: 17,
            fontWeight: "bold",
          },
          {
            value: parseInt(((a / t) * 100).toFixed(2)),
            name: "absent",
            color: "red",
            legendFontColor: "#a968cf",
            legendFontSize: 17,
            fontWeight: "bold",
          },
        ]);

        let datesarray = [];
        studentsarray[0].attendance.slice(-10).forEach((attendance) => {
          datesarray.push(attendance["date"]);
        });
        let obj = [];
        console.log(studentsarray);
        datesarray.forEach((date, key) => {
          let attendance = [];
          studentsarray.forEach((student) => {
            attendance = [
              ...attendance,
              student.attendance.slice(-10)[key].status_id,
            ];
          });
          obj = [...obj, { ["date"]: date, attendance }];
        });
        console.log(obj);
        let weekpresent = [];
        let weeklate = [];
        let weekabscent = [];
        obj.forEach((row) => {
          let p = 0,
            l = 0,
            a = 0;
          row["attendance"].map((status) => {
            if (status === 1) p++;
            if (status === 2) l++;
            if (status === 3) a++;
          });
          let total = p + l + a;
          weekpresent = [
            ...weekpresent,
            {
              ["x"]: row["date"],
              y: ~~((p / total) * 100).toFixed(2),
            },
          ];
          weeklate = [
            ...weeklate,
            {
              ["x"]: row["date"],
              y: ~~((l / total) * 100).toFixed(2),
            },
          ];
          weekabscent = [
            ...weekabscent,
            {
              ["x"]: row["date"],
              y: ~~((a / total) * 100).toFixed(2),
            },
          ];
        });
        setWeekData([
          {
            seriesName: "present",
            data: weekpresent,
            color: "green",
          },
          {
            seriesName: "late",
            data: weeklate,
            color: "yellow",
          },
          {
            seriesName: "abscent",
            data: weekabscent,
            color: "red",
          },
        ]);
        setShowSection(true);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, [section_id]);

  useEffect(() => {
    axios
      .get(`http://${IP}/api/status`, props.headers)
      .then((res) => {
        const present = res.data.data[0].attendance.length;
        const late = res.data.data[1].attendance.length;
        const absent = res.data.data[2].attendance.length;
        const total = present + late + absent;
        setAllData([
          {
            name: res.data.data[0].name,
            value: parseInt(((present / total) * 100).toFixed(2)),
            color: "green",
            legendFontColor: "#a968cf",
            legendFontSize: 17,
            fontWeight: "bold",
          },
          {
            name: res.data.data[1].name,
            value: parseInt(((late / total) * 100).toFixed(2)),
            color: "yellow",
            legendFontColor: "#a968cf",
            legendFontSize: 17,
            fontWeight: "bold",
          },
          {
            name: res.data.data[2].name,
            value: parseInt(((absent / total) * 100).toFixed(2)),
            color: "red",
            legendFontColor: "#a968cf",
            legendFontSize: 17,
            fontWeight: "bold",
          },
        ]);
        setShow(true);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView>
      <View style={styles.View}>
        <Text style={styles.MainTitle}>
          Percentage of Attendance for All Students 🧑‍🎓
        </Text>
        {show ? (
          <PieChart
            data={allData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={"value"}
            backgroundColor={"transparent"}
          />
        ) : null}
      </View>

      <View style={styles.ActionsBtn}>
        <View style={styles.InputContainer}>
          <Text style={styles.InputText}>Choose a class: </Text>
          <Picker
            selectedValue={classes}
            style={styles.Input}
            onValueChange={(itemValue) => setClass_id(itemValue)}
            value={class_id || ""}
            name="std__class_id"
          >
            <Picker.Item value="none" label="Choose Class" />
            {classes.map((classe) => (
              <Picker.Item
                key={classe.id}
                value={classe.id}
                label={classe.name}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.InputText}>Choose a section: </Text>
          <Picker
            selectedValue={sections}
            style={styles.Input}
            onValueChange={(itemValue) => setSection_id(itemValue)}
            value={section_id || ""}
            name="section_id"
          >
            {sections.map((section) => (
              <Picker.Item
                key={section.id}
                value={section.id}
                label={section.name}
              />
            ))}
          </Picker>
        </View>
      </View>
      {showSection ? (
        <>
          <View style={styles.View}>
            <Text style={styles.MainTitle}>
              Last Two Week Attendance Percentage 📊
            </Text>
            <PureChart data={weekData} type="bar" />
          </View>
          <View style={styles.View}>
            <Text style={styles.SubTitle}>
              All Time Percentage of Attendance for Class:${class_name}, Section
              : ${section_name}
            </Text>
            <PieChart
              data={sectionData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={"value"}
              backgroundColor={"transparent"}
            />
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  View: {
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  MainTitle: {
    fontWeight: "bold",
    marginLeft: "5%",
    marginRight: "auto",
    marginBottom: 15,
    fontSize: 22,
    color: "#fefdff",
  },
  SubTitle: {
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    fontSize: 17,
    color: "#fefdff",
  },
  ActionsBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
    height: 100,
    backgroundColor: "rgba(28, 29, 36, 0.5)",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
  Input: {
    height: 35,
    width: 200,
    color: "#fff",
    fontSize: 16,
  },
  InputText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  InputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "5%",
  },
});
