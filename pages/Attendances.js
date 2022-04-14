import React, { component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Picker, ScrollView } from "react-native";
import axios from "axios";
import AttendanceCard from "../components/AttendanceCard";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import { IP } from "@env";

export default function Attendances(props) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState("");
  const [sections, setSections] = useState([]);
  const [section_id, setSection_id] = useState("");
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState({});

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axios.get(`http://192.168.0.117:8000/api/class`, props.headers);
        setClasses(res.data.data);
        setClass_id(res.data.data[0].id);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    if (class_id) {
      let classe = classes.find((c) => c.id === class_id);
      let classSections = classe.sections;
      setSections(classSections);
      setAttendances({});
      setSection_id(classSections[0].id);
    }
  }, [class_id]);

  useEffect(() => {
    let students = [];
    console.log(sections);

    sections.map((s) => {
      if (s.id === section_id) {
        students = s.students;
      }
    });
    setStudents(students);
    setAttendances({});
  }, [section_id]);

  useEffect(() => {
    console.log(attendances);
  }, [attendances]);

  const handleSave = () => {
    let Attendances = [];
    Object.keys(attendances).forEach((key) => {
      Attendances = [
        ...Attendances,
        {
          student_id: ~~key,
          date: today,
          status_id: attendances[key],
        },
      ];
    });
    Attendances.forEach(async (attendance) => {
      try {
        const res = await axios.post(
          `http://192.168.0.117:8000/api/attendance`,
          attendance,
          props.headers
        );

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
    setAttendances({});
    const getStudents = async () => {
      try {
        const res1 = await axios.get(`http://192.168.0.117:8000/api/class`, props.headers);
        setClasses(res1.data.data);
        const res2 = await axios.get(
          `http://192.168.0.117:8000/api/class/${class_id}`,
          props.headers
        );
        setSections(res2.data.data.sections);
        let students = [];
        res2.data.data.sections.map((s) => {
          if (s.id === section_id) {
            students = s.students;
          }
        });
        setStudents(students);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  };

  return (
    <ScrollView>
      <View style={styles.DateContainer}>
        <Text style={styles.Text}>Date: {today}</Text>
      </View>
      <View style={styles.PickerContainer}>
        <View style={styles.PickerView}>
          <Text style={styles.PickerLabel}>Class :</Text>
          <Picker
            value={class_id || ""}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) => setClass_id(itemValue)}
          >
            {classes.map((c, index) => (
              <Picker.Item label={c.name} value={c.id} key={index} />
            ))}
          </Picker>
        </View>
        <View style={styles.PickerView}>
          <Text style={styles.PickerLabel}>Section :</Text>

          <Picker
            value={section_id || ""}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) => setSection_id(itemValue)}
          >
            {sections.map((s, index) => (
              <Picker.Item label={s.name} value={s.id} key={index} />
            ))}
          </Picker>
        </View>
        <Text style={styles.StudentsNumber}>
          {/* Number of Students : {students.length} */}
        </Text>
      </View>
      <View style={styles.CardContainer}>
        {students.map((student, index) => (
          <AttendanceCard
            student={student}
            setAttendances={(e) => setAttendances({ ...attendances, ...e })}
            today={today}
            key={index}
            headers={props.headers}
          />
        ))}
      </View>
      <View style={styles.ButtonContainer}>
        <Button
          icon={<Icon name="save" size={25} color="white" />}
          title="Save"
          onPress={() => {
            handleSave();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  DateContainer: {
    backgroundColor: "rgb(255, 69, 58)",
    height: 50,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  PickerContainer: {
    marginVertical: 10,
    marginHorizontal: 25,
    color: "white",
    width: "60%",
  },
  Picker: {
    color: "white",
    // flex: 1,
    height: 50,
    width: 150,
  },
  CardContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
  },
  PickerView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  PickerLabel: {
    color: "white",
    fontSize: 17,
    marginRight: 50,
  },
  StudentsNumber: {
    color: "white",
    fontSize: 18,
    marginVertical: 10,
  },
  ButtonContainer: {
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#195bcb",
  },
});
