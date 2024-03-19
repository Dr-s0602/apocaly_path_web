import React from "react";
import { observer } from "mobx-react";
import Map from "../../components/gameLayouts/gameMap";

const testComponent = observer(()=>{
    return (
        <div className="map_div">
            <Map/>
        </div>
    )
})

export default testComponent;