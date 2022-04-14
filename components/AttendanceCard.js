import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { IP } from "@env";

const AttendanceCard = ({ student, setAttendances, today, headers }) => {
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState(null);
  const [attendance, setAttendance] = useState();

  useEffect(() => {
    axios.get(`http://192.168.0.117:8000/api/status`, headers).then((res) => {
      if (res.status === 200) {
        setStatuses(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    setStatus(null);
    console.log("student Attendance");
    console.log(student.attendance);
    let attendancess = student.attendance;
    let attendance = attendancess.find(
      (attendance) => attendance.date === today
    );
    setAttendance(attendance);
    console.log(attendance);
  }, [student]);

  return (
    <View style={styles.card}>
      <View style={styles.View}>
        <Text style={styles.primary}>Student ID:</Text>
        <Text style={styles.Details}>#{student.id}</Text>
      </View>
      <View style={styles.View}>
        <Text style={styles.primary}>Student Name:</Text>
        <Text style={styles.Details}>
          {student.first_name + " " + student.last_name}
        </Text>
      </View>
      <View style={styles.RadioGroup}>
        {statuses.map((s) => (
          <>
            {attendance ? (
              <RadioButton
                value={s.id}
                status={attendance.status.id === s.id ? "checked" : "unchecked"}
                disabled={true}
              />
            ) : (
              <RadioButton
                value={s.id}
                status={status === s.id ? "checked" : "unchecked"}
                color={"#00B386"}
                onPress={() => {
                  setStatus(s.id);
                  setAttendances({ [student.id]: s.id });
                }}
              />
            )}
            <Text>{s.name}</Text>
          </>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#a7dee1",
    width: "100%",

    borderRadius: 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 8,
    padding: 20,
  },
  Details: {
    marginBottom: 10,
    color: "#000",
    marginLeft: 10,
  },
  View: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  primary: {
    color: "#00B4A8",
    fontWeight: "bold",
    fontSize: 16,
  },
  RadioGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

export default AttendanceCard;
