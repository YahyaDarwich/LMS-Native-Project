import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RadioButton } from 'react-native-paper';
import {IP} from "@env"

const AttendanceCard = ({ student, setAttendances, today, headers }) => {
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState(null);
    const [attendance, setAttendance] = useState()

    useEffect(() => {
        axios.get(`http://${IP}/api/status`, headers).then((res) => {
            if (res.status === 200) {
                setStatuses(res.data.data);
            }
        });
    }, []);

    useEffect(() => {
        setStatus(null)
        console.log("student Attendance")
        console.log(student.attendance)
        let attendancess = student.attendance;
        let attendance = attendancess.find(
            (attendance) => attendance.date === today
        );
        setAttendance(attendance);
        console.log(attendance)
    }, [student])

    return (
        <View style={styles.card}>
            <Text style={styles.Details}><Text style={styles.primary}>Student ID:</Text> #{student.id}</Text>
            <Text><Text style={styles.primary}>Student Name:</Text> {student.first_name + " " + student.last_name}</Text>
            <View style={styles.RadioGroup}>

                {statuses.map((s) => (
                    <>
                        {attendance ? (<RadioButton
                            value={s.id}
                            status={attendance.status.id === s.id ? 'checked' : 'unchecked'}
                            disabled={true}
                        />) : (<RadioButton
                            value={s.id}
                            status={status === s.id ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setStatus(s.id);
                                setAttendances({ [student.id]: s.id })

                            }}
                        />)}
                        <Text>{s.name}</Text>
                    </>
                ))}
            </View>
        </View>


    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#DEDEDE',
        width: "100%",
        // height: 100,
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
    },

    primary: {
        color: "#00B4A8",
        fontWeight: 'bold',
        fontSize: 16,
    },

    RadioGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    }
})

export default AttendanceCard