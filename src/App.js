import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Bikes from "./pages/bikes";
import Login from "./pages/login";
import Reservations from "./pages/reservations";
import Users from "./pages/users";
import NotFound from "./pages/notFound";
import SignUp from "./pages/signup";
import Toast from "./components/Toast";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/protectedRoute";

export const AuthContext = createContext();

function App() {
    const [user, setUser] = useState(null);
    const [cookies, setCookie] = useCookies(["user"])
    useEffect(() => {
        if (!user) {
            if (cookies.user) {
                setUser(cookies.user);
            }
        }
    }, [cookies.user, user]);


    return (
        <>
            <AuthContext.Provider value={{user, setUser}}>
                <Toast/>
                <Router>
                    {user && <NavBar/>}
                    <Routes>
                        {!user &&
                        <>
                            <Route path={'/login'} element={<Login/>}/>
                            <Route path={'/signup'} element={<SignUp/>}/>
                        </>}

                        {user && <>
                            <Route path={'/'} element={<Bikes/>}/>
                            <Route path={'/reservations'} element={<ProtectedRoute element={<Reservations/>} />}/>
                            <Route path={'/reservations/bike/:id'}  element={<ProtectedRoute element={<Reservations/>} />}/>
                            <Route path={'/reservations/user/:id'} element={<ProtectedRoute element={<Reservations/>} />}/>
                            <Route path={'/users'} element={<ProtectedRoute element={<Users/>} />}/>
                        </>}

                        <Route path={'/'} element={<Login/>}/>
                        <Route path={'/not-found'} element={<NotFound/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </>
    );
}

export default App;
