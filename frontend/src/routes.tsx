import { Route, Routes } from "react-router";
import EmployeesContainer from "./components/EmployeesContainer"

function Application() {
    <div className="Application">
        <Routes>
            <Route path="employees-components" element={ <EmployeesContainer /> } />
        </Routes>
    </div>
}