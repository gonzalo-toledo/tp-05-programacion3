import React, { Fragment } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UnicornContext } from "../context/UnicornContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { exportToPdf } from "../utils/ExportToPdf";
import confetti from 'canvas-confetti';




const UnicornsView = () => {
    const {unicorns, loading,setEditingUnicorn, deleteUnicorn} = React.useContext(UnicornContext);
    const navigate = useNavigate();
    
    const handleEdit = (unicorn) => {
        setEditingUnicorn(unicorn);
        navigate(`/unicornios/editar/${unicorn._id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then (handlePlaysoundCock(),)
            .then(async (result) => {
            if (result.isConfirmed) {
                await deleteUnicorn(id);
                Swal.fire(
                    '¡Eliminado!',
                    'El unicornio fue eliminado exitosamente.',
                    'success'
                );
                handlePlaysoundDelete();
                bloodExplosion();
            }
        });
    };

    const bodyActions = (rowData) => {
        return (
            <div className="p-d-flex p-gap-2">
                <Button     
                    label="Editar"
                    onClick={() => handleEdit(rowData)}
                    

                />
                <Button 
                    label="Eliminar"
                    onClick={() => {
                        handleDelete(rowData._id);
                    }}
                />
            </div>
        );
    };

    //Efecto de sonido
    const handlePlaysoundCock = () => {
        const audio = new Audio('/pistol-gun-cock-89523.mp3');
        audio.play();
    }
    const handlePlaysoundDelete = () => {
        setTimeout(() => {
            const audio = new Audio('/pistol-shot-233473.mp3');
            audio.play();
        }, 100);
    }

    // Efecto confetti
    const bloodExplosion = () => {
        setTimeout(() => {
            confetti({
                particleCount: 1000,
                angle: 90,
                spread: 300,
                origin: { y: 0.6 },
                colors: ['#8B0000', '#B22222', '#FF0000'],
                scalar: 1.2,
                decay: 0.9,
                gravity: 1.2,
                shapes: ['circle'],
            })    
        }, 200);
    }



    return (
        <Fragment>
            <h1>Listado de unicornios</h1>
            {/* Tabla de datos */}
            <DataTable 
                header="Unicorns" 
                value={unicorns} 
                paginator 
                rows={10}
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                className="custom-datatable"
                emptyMessage="No se encontraron unicornios"
            >
                <Column field="name" header="Nombre" sortable filter />
                <Column field="color" header="Color" sortable filter />
                <Column field="age" header="Edad" sortable />
                <Column field="power" header="Poder" sortable />
                <Column 
                    body={bodyActions} 
                    header="Acciones"
                    exportable={false}
                    style={{ minWidth: '8rem' }}
                />
            </DataTable>
            <div>
                <Button
                    label="PDF"
                    icon="pi pi-file-pdf"
                    onClick={() => {
                        const columns = ["name", "color", "age", "power"];
                        exportToPdf(unicorns, "Listado de unicornios", columns);
                    }}                
                />
            </div>
        </Fragment>
    );
};

export default UnicornsView;