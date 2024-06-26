import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiTestTubes } from "react-icons/gi";



const Sidebar = () => {
  return (
    <>
        <button type="button" class="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="flex-shrink-0 size-8" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        </button>

        <div id="docs-sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-[280px]
         bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto
         lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full
         [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
            <div class="px-6">
                <a class="flex-none text-xl font-semibold dark:text-white" href="/patient" aria-label="Brand">Patient</a>
            </div>
        <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul class="space-y-1.5">
            
            <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100
             dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/appointmentform">
                <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Doctor Appoinment 
            </a></li>
            <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700
             rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400
              dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/patientregistation">
                
                <VscAccount />Patient Registation
            </a></li>
            <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700
             rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400
              dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/payment">
            <FaMoneyBillTrendUp />Payment 
            </a></li>
            
            
            <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg
             hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400
              dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/test">
            <GiTestTubes />Test  
            </a></li>
            </ul>
        </nav>
        </div>
    </>
  )
}

export default Sidebar