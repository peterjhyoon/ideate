// import logo from './logo.svg';
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import Projects from "./pages/projects/Projects";
import ViewProject from "./pages/projects/ViewProject";
import ViewUser from "./pages/users/ViewUser";
import NotFound from "./pages/NotFound";
import ProjectsLayout from "./components/projects/ProjectsLayout";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Home Route */}
                    <Route index element={<Home />} />

                    {/* Login and SignUp Routes */}
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />

                    {/* Project Routes */}
                    <Route path="projects" element={<ProjectsLayout />}>
                        <Route index element={<Projects />} />
                        <Route path=":id" element={<ViewProject />} />
                        {/* <Route path="new" element={ } /> */}
                    </Route>

                    {/* User Routes */}
                    <Route path="user/:id">
                        <Route index element={<ViewUser />} />
                    </Route>

                    {/* 404 Not Found route */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
