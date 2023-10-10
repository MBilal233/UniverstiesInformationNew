import "./App.css";
import axios from "axios";



  const FetchData =  (country) => {

    return axios.get('http://universities.hipolabs.com/search?country='+country);
    
  }

  

export default {
  FetchData
}