import React, { useEffect, useState } from 'react'
import { getPets } from "../../api/pet";
import ListPets from '../../components/AdminComponents/pets/listPets';


export default function Pets() {

    const [pets, setPets] = useState([])
    const [reloadPets, setReloadPets] = useState(false)

    useEffect(() => {
        getPets().then((response)=>{
            setPets(response.pets)
        });
        setReloadPets(false)
    }, [reloadPets])
    

    return (
        <div>
            
            <ListPets
            pets={pets}
            setReloadPets={setReloadPets}
            />
        </div>
    )
}
