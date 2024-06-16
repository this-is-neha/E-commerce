import { ReactNode, useContext, useState } from "react";

import {

  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from '@headlessui/react'


import {  HiChevronDown  } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import MobileMenu from "./mobile-menu.component";
import { HiBars3 } from "react-icons/hi2";
import AuthContext from "../../../context/auth.context";





export function classNames(...classes: any) {
  return classes.filter(Boolean).join('')
}



const HeaderComponent = (): ReactNode => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const auth=useContext(AuthContext)
  return <>
    <header className="bg-lime-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900">
              Categories
              <HiChevronDown className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">

                  <div className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50" >


                    <div className="flex-auto">
                      <NavLink to={'/'} className="block font-semibold text-gray-900">
                        Electronics
                        <span className="absolute inset-0" />
                      </NavLink>

                    </div>
                  </div>

                  <div className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50" >


                    <div className="flex-auto">
                      <NavLink to={'/'} className="block font-semibold text-gray-900">
                        Clothing
                        <span className="absolute inset-0" />
                      </NavLink>

                    </div>
                  </div>

                  <div className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50" >


                    <div className="flex-auto">
                      <NavLink to={'/'} className="block font-semibold text-gray-900">
                        SmartPhone
                        <span className="absolute inset-0" />
                      </NavLink>

                    </div>
                  </div>




                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {/* {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))} */}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          <NavLink to="/product-list" className="text-m font-semibold leading-6 text-gray-900">
            Features
          </NavLink >
         <NavLink to="/policy" className="text-m font-semibold leading-6 text-gray-900">
         Policy
          </NavLink>
       
          <NavLink to="about-us" className="text-m font-semibold leading-6 text-gray-900">
         About Us
          </NavLink>
        
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
         {
          auth.loggedInUser?<>
          
          <NavLink to={'/'+auth.loggedInUser.role} className="text-m font-semibold leading-6 text-gray-900">
            {auth.loggedInUser.name} <span aria-hidden="true">&rarr;</span>
          </NavLink>

          <NavLink to="/login" className="text-m font-semibold leading-6 text-gray-900">
            Logout <span aria-hidden="true">&rarr;</span>
          </NavLink>

          </>
          :<>

          <NavLink to="/register" className="text-m font-semibold leading-6 px-5 text-gray-900">
            Register <span aria-hidden="true">&rarr;</span>
          </NavLink>
          </>
          
         
}
        </div>
      </nav>
      <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}></MobileMenu>
      
    </header>
  </>
}
export default HeaderComponent