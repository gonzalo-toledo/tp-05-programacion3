import React, { Fragment } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Button } from "primereact/button";
import { UnicornContext } from "../context/UnicornContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import confettji from 'canvas-confetti';


const UnicornForm = () => {
    const { createUnicorn, editUnicorn, editingUnicorn, setEditingUnicorn } = React.useContext(UnicornContext);
    const navigate = useNavigate();

    //primero definir initialValues 
    const initialValues = {
        name: editingUnicorn?.name || '', // el ? es para que no rompa si editingUnicorn es null. El || es para que si es null, ponga un string vacio
        color: editingUnicorn?.color || '',
        age: editingUnicorn?.age || '',
        power: editingUnicorn?.power || '',
    }

    // definir el esquema de validacion
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'El nombre es muy corto')
            .max(50, 'El nombre es muy largo') 
            .required('El nombre es requerido'),
        color: Yup.string()
            .required('El color es requerido'),
        age: Yup.number()
            .min(1, 'La edad debe ser mayor a 0')
            .required('La edad es requerida'),
        power: Yup.string()
            .required('El poder es requerido')
    });
    
    const handleSubmit = async (values) => {
        try {    
            if (editingUnicorn) {
                await editUnicorn(values);
                Swal.fire({
                    icon: 'success',
                    title: '¡Unicornio editado!',
                    text: 'El unicornio fue editado correctamente',
                });
                setEditingUnicorn(null); // Resetear el unicornio en edición
            } else {
                await createUnicorn(values);
                Swal.fire({
                    icon: 'success',
                    title: '¡Unicornio creado!',
                    text: 'El unicornio fue creado correctamente',
                });
                handleConfetti();
                handlePlaysoundCreate();
            }
            navigate('/unicornios'); // Redirigir a la lista de unicornios después de crear o editar
        } catch (error) {
            console.error("Error al crear o editar el unicornio:", error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al crear o editar el unicornio',
            });
        }
    }; 

    //Efectos de sonido y confetti
    const handleConfetti = () => {
        confettji({
            particleCount: 500,
            startVelocity: 40,
            spread: 360,
        });
    }
    const handlePlaysoundCreate = () => {
        const audio = new Audio('/sonido de caballo efecto de sonido.mp3');
        audio.play();
    }
    
    return (
        <Fragment>
            <h1>{editingUnicorn ? 'Editar unicornio' : 'Crear un nuevo unicornio' }</h1>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            /* a onSubmit se le pasa la funcion para crear el unicornio */
            onSubmit={handleSubmit}
            /* enableReinitialize permite que el formulario se actualice cuando cambian los valores iniciales */
            enableReinitialize 

            >
                <Form className="form-container"> 
                    <div className="form-group" >
                        <label htmlFor="name" >Nombre</label>
                        <Field name="name" type="text" id="name"/>
                        <ErrorMessage className="error-message"  name="name" component="div" />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="color">Color</label>
                        <Field name="color" type="text" id="color"/>
                        <ErrorMessage className="error-message"  name="color" component='div' />                    </div>
                    <div className="form-group" >
                        <label htmlFor="age">Edad</label>
                        <Field name="age" type="number" id="age"/>
                        <ErrorMessage className="error-message"  name="age" component='div' />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="power">Poder</label>
                        <Field name="power" type="text" id="power"/>
                        <ErrorMessage className="error-message"  name="power" component='div' />
                    </div>

                    {/* Boton de envio al ser tipo submit va usar la funcion onSubmit*/}
                    <Button 
                        label={editingUnicorn ? "Guardar cambios" : "Crear unicornio"} 
                        type="submit"
                    >
                    </Button>  

                </Form>

            </Formik>

        </Fragment>
    );
};

export default UnicornForm;