import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function MenuBar() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Unicornios',
            icon: 'pi pi-star',
            items: [
                {
                    label: 'Crear unicornio',
                    command: () => navigate('/unicornios/crear')
                },
                {
                    label: 'Lista de unicornios',
                    command: () => navigate('/unicornios')
                }
            ]
        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            command: () => navigate('/productos'),
        },
    ];

    const start = (
        <div className="flex align-items-center gap-2">

            <span className="font-bold text-2xl">UnicornStore</span>
        </div>
    );

    return (
        <div>
            <Menubar model={items} start={start} className="custom-menubar" />
        </div>
    );
}
