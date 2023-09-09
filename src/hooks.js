import { useState } from "react";
import axios from "axios";

function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);

  const flipCard = () => {
    setIsFacingUp((isUp) => !isUp);
  };

  return [isFacingUp, flipCard];
}


// function useAxios(url) {
//     const [data, setData] = useState([]);
  
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url);
//         setData((prevData) => [...prevData, { ...response.data }]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     return [data, fetchData];
//   }

function useAxios(baseUrl, dataFormatter) {
    const [data, setData] = useState([]);
  
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        const formattedData = dataFormatter(response.data); 
        setData((prevData) => [...prevData, formattedData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const addData = async (restOfUrl) => {
      const url = baseUrl + restOfUrl;
      await fetchData(url);
    };
  
    const clearData = () => {
      setData([]);
    };
  
    return [data, addData, clearData];
  }
  export { useFlip, useAxios }; 