import UnicornsView from "./UnicornsView";
import UnicornForm from "./UnicornForm";
import {Routes, Route } from "react-router-dom";



const UnicornsModule = () => {
    return (

            <Routes>
                {/* <Route path="/unicornios" element={<UnicornsContainer />} /> */}
                <Route path="/unicornios" element={<UnicornsView />} />
                <Route path="/unicornios/crear" element={<UnicornForm />} />
                <Route path="/unicornios/editar/:id" element={<UnicornForm />} />
            </Routes>

        
    )
}

export default UnicornsModule;