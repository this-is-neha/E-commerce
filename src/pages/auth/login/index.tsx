import { useContext, useEffect } from "react";
import { NavLink, useNavigate,  } from "react-router-dom"
// import { useState } from "react";
import{ useForm} from "react-hook-form" 
import { TextInputField } from "../../../components/common/form";
import  axiosInstance  from "axios";
import {toast} from "react-toastify"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../../context/auth.context";
// import { setCookie } from "../../../utilities/helpers";


const LoginPage=()=>{
const auth =useContext(AuthContext)

const navigate=useNavigate();
const loginDto=Yup.object({
  email:Yup.string().email().required("Email is compulsory"),
  password:Yup.string().required()
})
console.log('LoginAuth',auth)
  const {control,handleSubmit,formState:{errors}}=useForm({
   
   resolver:yupResolver(loginDto),
    defaultValues:{
      email:"",
      password:""
    }
  });

  const  submitForm=async (data:any)=>{
    try{
const response:any= await axiosInstance.post('/auth/login',data)

localStorage.setItem("accesstoken",response.result.token.accesstoken)
localStorage.setItem("refreshtoken",response.result.token.refreshtoken)

auth.loggedInUser=response.result.detail;

toast.success("Welcome to "+response.result.detail.role+"Panel!")
navigate("/"+response.result.detail.role)
}
catch(exception:any){
  console.log(exception)
  toast.error(exception.message)
}

  }

  useEffect(()=>{
    if (auth.loggedInUser){
    toast.info("You are already logged in")
    navigate("/"+auth.loggedInUser.role)
    }
  },[auth])
  
    

 
    return (<>


<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-10 w-auto mt-10"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-14 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)} >
        
              <label htmlFor="email" className="block text-m font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <TextInputField
                control={control}
                type="email"
                name="email"
                errMsg={errors?.email?.message?"Invalid Email":""}
                required={true}
                />
            </div>

            <div>
              <div className="flex items-center justify-between  ">
                <label htmlFor="password" className="block text-m font-medium leading-6 text-gray-900">
                Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
              
                 <TextInputField
                 control={control}
                 type="password"
                 name="password"
                 errMsg={errors?.password?.message?"Password Email":""}
                 required={true}
                 />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full mt-14 text-xl justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-m font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Register your account
            </NavLink>
          </p>
        </div>
      </div>


 

    </>)
}
export default LoginPage