import React, {useEffect, useState} from "react";
import { observer } from "mobx-react";
import {test} from "../../api/test";

const testComponent = observer(()=>{
    const [word, setWord] = useState("");
    useEffect(()=>{
        test("hi").then(res =>{
            setWord(res);
        })
    },[])
    return (
        <div className="map_div">
            {word}
        </div>
    )
})

export default testComponent;