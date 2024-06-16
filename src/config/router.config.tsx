import { lazy, useState, useEffect, useContext } from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing/landing.page";
import LoginPage from "../pages/auth/login/index";
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import HomeLayout from "../pages/layouts";
import RegisterPage from "../pages/auth/Register";
import PermissionConfig from "./permission.config";
import { Suspense } from "react";
const AdminDashboard= lazy(()=> import ("../pages/dashboard/admin.dashboard.page"))
import axiosInstance from "./axios.config"
import AuthContext from "../context/auth.context";
import { LoadingComponent } from "../components/common";
import {AdminBanner,AdminBannerCreate,AdminBannerEdit} from "../pages/banner";


const AdminLayout = lazy(() => import("../pages/layouts/admin"))
const RoutingConfig = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true)
    const auth=useContext(AuthContext)
    console.log(auth)
    const getLoggedInUser = async () => {
        try {
            const token = localStorage.getItem("accessToken") || null
            const response:any = await axiosInstance.get(
                '/auth/me',
                {
                    headers: {
                        "Authorization": "Bearer" + token
                    }
                }
            )
            console.log("auth",auth)
            auth.setLoggedInUser(response.result)

        }
        catch (exception) {

        }

        finally{
setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken") || null
        if (token) {
            getLoggedInUser()
        }
        else {
            setLoading(false)
        }

    })
    return (<>
        {
           loading ? <>
           <LoadingComponent/>
               </> : <>


                
                <AuthContext.Provider value={{loggedInuser: loggedInUser}}>
                    <ToastContainer
                        theme="colored" />
                    <Routes>
                        <Route path="/" element={<HomeLayout />}>

                            <Route index element={<LandingPage />}></Route>
                            <Route path="login" element={<LoginPage />}></Route>
                            <Route path="register" element={<RegisterPage />}></Route>

                            <Route path="*" element={<>Error page</>}></Route>

                        </Route>


                        <Route path="/admin" element={<PermissionConfig
                            allowAccess={"admin"} ><AdminLayout />
                        </PermissionConfig>}>
                            <Route index element={<Suspense fallback={<LoadingComponent/>}><AdminDashboard/>
                            </Suspense>}></Route>

                               <Route path="banner" element={<Suspense fallback={<LoadingComponent/>}> <AdminBanner/></Suspense>}></Route>
                               <Route path="banner/create" element={<Suspense fallback={<LoadingComponent/>}><AdminBannerCreate/></Suspense>}></Route>
                               <Route path="banner/:id" element={<Suspense fallback={<LoadingComponent/>}><AdminBannerEdit/></Suspense>}></Route>
                       
                            <Route path="*" element={<>Error Page</>}></Route>
                        </Route>
                    </Routes>
                </AuthContext.Provider>
            </>
        }
    </>
    )


}

export default RoutingConfig