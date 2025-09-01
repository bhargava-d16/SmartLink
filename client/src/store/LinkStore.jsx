import create from 'zustand'
import { axiosInstance } from '../libs/axios'

export const useLinkStore = create((set) => ({
  links: [],
  linkInput: '',
  setLinkInput: (input) => set({  linkInput: input }),

  url:async(data)=>{
     try{
      const res=axiosInstance.post("/create",data);
      console.log(res.data);
     }
     catch(error){
       console.log(error);
     }
  }
  
  
  
}))
