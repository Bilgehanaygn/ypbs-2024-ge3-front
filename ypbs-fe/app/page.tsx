"use client";

import Image from "next/image";
import './styles.css';
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {

    // const router = useRouter();
    // const jsessionid = Cookies.get("JSESSIONID"); //cookie'yi görmüyo büyük ihtimalle internetten bi araştırdana sanırsam cookie ismini yanlış giriyom
    //
    // useEffect(() => {
    //     console.log(jsessionid);
    //     if(!jsessionid){
    //         router.push("/login");
    //     }
    // }, []);
    //
    // if (!jsessionid){
    //     return null;
    // }//Abi noramlde burda yapıyodum ana sayfada fakat sürekli login ve ana sayfa arasında dönüp duruyo nedenini çözemeden uyuay kaldım dün

    return (
        <div className="anaSayfaDiv">
            Ana Sayfa
        </div>
    );
}
