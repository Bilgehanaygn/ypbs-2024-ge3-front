"use client";
import { useEffect, useState } from "react";
import { Datagrid } from "./datagrid";
import DataGridDemo from "./datagrid_demo";
import axios from "axios";

export default function Page() {
    const [nameSurname, setNameSurname] = useState("");
    const [unvan, setUnvan] = useState("");
    const [gorev, setGorev] = useState("");
    const [birim, setBirim] = useState("");
    const [proje, setProje] = useState("");
    const [katki, setKatki] = useState("");
    const [takim, setTakim] = useState("");
    const [users, setUsers] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("api/users/get-users-with-filters"+
                    "?nameSurname="+nameSurname +
                    "&unvan="+unvan +
                    "&gorev="+gorev +
                    "&birim="+birim +
                    "&proje="+proje 
                )
                setUsers(data.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        
    }, [clicked]); 
    return (
        <>
        <DataGridDemo users={users}></DataGridDemo>
        </>
    )
}