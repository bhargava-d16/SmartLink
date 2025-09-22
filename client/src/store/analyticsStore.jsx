import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAnalytics = create((set, get) => ({
     analytics:[],
     setanalytics:(info)=>set({analytics:info}),
     links:[],
     setlinks:(link)=>set({links:link}),

     getAnalytics: async()=>{
         try{
            const res=await axiosInstance.get("/analytics");
            if(res.data){
                console.log(res.data)
                set({analytics:res.data})
            }
            return { success: true, user: res.data };
         }
         catch(error){
            console.log(error);
            toast.error("Failed to load analytics");
         }
     },

     getAllLinks:async()=>{
        try{
            const res=await axiosInstance.get("/links");
            if(res.data){
                const alllinks=res.data
                console.log("All Links:", alllinks);
                set({links:alllinks})
                return alllinks
            }
        }
        catch(error){
            console.log(error);
        }
     },
}));
