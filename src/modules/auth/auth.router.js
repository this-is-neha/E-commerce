
const authRoute = require("express").Router();
const authCtrl=require("./auth.controller")

authRoute.post('/register',authCtrl.register)
authRoute.post('./login',authCtrl.login)

// authRoute.post('/register/', (req, res,next) => {
//     const data = {
//         name: "Neha Shah",
//         email: "nehushah12@gmail.com",
//         password: "asdfg",
//         role: null
//     };
//     if (!data) {
//         next({
//             code: 422,
//             data: {
//                 name: "Name is required",                
//                 email: "Email is required",
//                 passsword: "Password is required",
//                 role: "Role is required",

//             }
          
//         })
//         //     

//     }
//     else{
    

//     if (!data.name) {
//         next({
//             code: 422,
//             message:"Validation Failed",
//             data: {
//                 name: "Name is required",                  
              

//             }
//         })
//     }

//     if (!data.email) {
//         next({
//             code: 422,
//             message:"Validation Failed",
//             data: {
//                email: "Email is required",                  
              

//             }
//         })
//     }
//     if (!data.password) {
//         next({
//             code: 422,
//             message:"Validation Failed",
//             data: {
//                 passsword: "Password is required",                  
              

//             }
//         })
//     }
//     if (!data.role) {
//         next({
//             code: 422,
//             message:"Validation Failed",
//             data: {
//                role: "Role is required",                  
              

//             }
//         })
//     }

//     }
  
//     const registeredUser = {
//         _id: "123abc",
//         name: "Neha Shah",
//         email: "nehushah12@gmailcom",
//         passsword: "ergffg6578uhgt453re",
//         role: "admin"
//     };
//     if (registeredUser) {
//         res.json({
//             result:registeredUser,
//             message:"Successfull",
//             meta:null
//         })
//             }
//             else {
//                 next({
//                     code: 400,
//                     message:"Sorry!! cannot create a User",
                   
//                 })
//             }
    
// })
// authRoute.get('/:token/activate', (req, res, next) => {
//     res.json({
//         result: "Test token",
//         message: "Token tested",
//         meta: null
//     })
// })

// const logincheck = ((req, res, next) => {
//     let success = true;
//     let userDetail = {
//         _id: 123,
//         name: "Neha",
//         role: "admin"
//     }
//     if (success) {
//         req.authUser = userDetail
//         next()

//     }
//     else {
//         res.status(404).json({
//             result: null,
//             message: "Please login first",
//             meta: null
//         })
//     }
// })

// const permissioncheck = ((req, res, next) => {
//     const authUser = req.authUser || null;
//     if (!authUser) {
//         res.status(401).json({
//             result: null,
//             message: "Please login first",
//             meta: null
//         })

//     }
//     else {
//         if (authUser.role == "admin") {
//             next()
//         }
//         else {
//             res.status(403).json({
//                 result: null,
//                 message: "You dont have permission to access",
//                 meta: null
//             })
//         }
//     }



// })


// const adminAccessAction = (req, res, next) => {
//     res.json({
//         result: null,
//         message: "You got accessed",
//         meta: null
//     })
// }

// authRoute.get('/admin', logincheck, permissioncheck, adminAccessAction)
// authRoute.get("/:userId", logincheck, permissioncheck, (req, res, next) => {

// })
// authRoute.get("/me", logincheck, (req, res, next) => {
//     res.json({
//         result: req.authUser,
//         message: "Profile fetched",
//         meta: null
//     })
// })
module.exports = authRoute