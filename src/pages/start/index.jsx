import React, {useEffect, useState} from "react";
import { observer } from "mobx-react";

const testComponent = observer(()=>{
    return (
        <div className="map_div">
        </div>
    )
})

export default testComponent;