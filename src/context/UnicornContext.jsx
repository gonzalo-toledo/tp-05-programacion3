import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creacion del context:
export const UnicornContext = createContext() // al context lo voy a importar en UnicornsContainer.jsx


// el provider es el que va a envolver a los componentes que van a usar el context(toda la funcionalidad)
// al provider lo voy a importar en App.jsx
//children es lo que se va a renderizar dentro del provider, es una palabra reservada
export const UnicornProvider = ({ children }) => {
    const[unicorns, setUnicorns]= useState([]);
    const [editingUnicorn, setEditingUnicorn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_URL = 'https://crudcrud.com/api/fe5139d0c5bf4997ad2c282d6968b10f/unicorns';

    const getUnicorns = async () => {   
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setUnicorns(response.data);
            console.log("response getUnicorns", response.data); //axios me devuelve los datos en .data
        }catch (error) {
            setError(error.message);
            console.error("axios GET error:", error);
        } finally {
            setLoading(false);
        }   
    }
    
    useEffect(() => {
        getUnicorns()
    }
    , [])

    //crear un unicornio
    const createUnicorn = async (value) => {
        try {
            setLoading(true);
            const response = await axios.post(API_URL, value); 
            console.log("response createUnicorn", response.data);
            await getUnicorns(); // Actualiza la lista de unicornios después de crear uno nuevo
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Axios POST error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // editar un unicornio
    const editUnicorn = async (values) => {
        if(!editingUnicorn) return; // Si no hay un unicornio en edición, no hacemos nada
        try {
            setLoading(true);
            await axios.put(`${API_URL}/${editingUnicorn._id}`, values);
            setEditingUnicorn(null); // Resetear el unicornio en edición
            await getUnicorns(); // Actualiza la lista de unicornios después de editar uno
        } catch (error) { 
            setError(error.message);
            console.error("Axios PUT error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // eliminar un unicornio
    const deleteUnicorn = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            await getUnicorns(); // Actualiza la lista de unicornios luego de eliminar uno
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Axios DELETE error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return (
        <UnicornContext.Provider 
            value={{
                unicorns, 
                getUnicorns, 
                createUnicorn, 
                loading, 
                setLoading, 
                editUnicorn, 
                error, 
                setError, 
                editingUnicorn, 
                setEditingUnicorn, 
                deleteUnicorn
            }}
        >
            {children}
        </UnicornContext.Provider>
    );
}