import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

const useLinkStore = create((set) => ({
  links: [],
  linkInput: "",
  setLinkInput: (input) => set({ linkInput: input }),
  shortUrl: "",
  setshortUrl: (input) => set({ shortUrl: input }),

  shortenUrl: async (urls) => {
    try {
      console.log("Sending links:", urls);
      const res = await axiosInstance.post("/create", urls);
      set({ shortUrl: res.data.shortUrl });
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return { success: false, message: error.response?.data?.message };
    }
  },

  getUrl: async (id) => {
    try {
      const res = await axiosInstance.get(`/get/${id}`);
      console.log(res.data.fullUrl);

      
      const urls = res.data.fullUrl.flat();

    
      urls.forEach((url, index) => {
      
        setTimeout(() => {
          window.open(url, "_blank");
        }, index * 100); 
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return { success: false, message: error.response?.data?.message };
    }
  },
}));

export default useLinkStore;
