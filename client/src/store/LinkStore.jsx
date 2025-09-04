import {create} from 'zustand'
import { axiosInstance } from '../libs/axios'
import toast from 'react-hot-toast';

const useLinkStore = create((set) => ({
  links: [],
  linkInput: '',
  setLinkInput: (input) => set({  linkInput: input }),
  shortUrl:'',
  setshortUrl:(input)=>set({shortUrl:input}),


  shortenUrl:async(url)=>{
     try{
      const res=await axiosInstance.post("/create",url);
      set({shortUrl:res.data.shortUrl})
      return res.data
     }
     catch(error){
       console.log(error);
       toast.error(error.message)
          return { success: false, message: error.response?.data?.message };
     }
  },

  getUrl:async(id)=>{
     try{
        const res = await axiosInstance.get(`/get/${id}`);
        console.log(res.data.fullUrl);
        window.open(res.data.fullUrl, "_blank");
     }
     catch(error){
       console.log(error);
       toast.error(error.message)
          return { success: false, message: error.response?.data?.message };
     }
  },
  
  
  
}))

export default useLinkStore
