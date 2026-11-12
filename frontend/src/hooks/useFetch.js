import axios from "axios";
import  {useState} from "react";
import {toast} from "react-toastify";
import {useOnlineStatus} from './useOnlineStatus.js'

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export function useFetch(){
    //Crear el loading
    const [loading, setLoading] = useState(false);
    //Crear el auto 
    const fetchDataBackend = async (url,data =null,method ="GET",headers={}) =>{
        
        const loadingToast = toast.loading("Procesando solicitud...");
        
        setLoading(true);
        try{
            const response = await axios({
                method,
                url,
                headers:{
                    "Content-Type":"application/json",
                    ...headers,
                },
                data
            })
            toast.dismiss(loadingToast);
            toast.success(response?.data?.msg)
            return response?.data

        }catch(error){
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.msg || "Ocurrio un error al procesar la solicitud");
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }
    
    return {fetchDataBackend, loading}


}