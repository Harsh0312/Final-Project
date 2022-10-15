import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Medicine } from "../../app/models/medicine";
import MedicineCard from "./MedicineCard";
import MedicineList from "./MedicineList";



export default function Catalog(){
    const[medicines,setMedicines]=useState<Medicine[]>([]);
  useEffect(()=>{
    agent.Catalog.list().then(medicines=>setMedicines(medicines))
  },[])
    return(
       
        <>
        <MedicineList medicines={medicines}></MedicineList>
        </>
    )
}