import Home from "./Home";
import { Routes, Route } from "react-router-dom";
const IndexModule = () => {
    return (
        <Routes> 
            <Route path="/" element={<Home />} />
        </Routes>
    );
}
export default IndexModule;