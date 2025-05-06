import { useState } from 'react';
import Swal from 'sweetalert2';

const ProductForm = ({ setProducts }) => {
    const [name, setName] = useState('');
    const [features, setFeatures] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');

    const addProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            id: Date.now().toString(),
            name,
            data: {
                features,
                price,
                year
            },
        };

        try {
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            const updatedProducts = [...storedProducts, newProduct];
            setProducts(updatedProducts); // Actualiza el estado en ProductsView
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            Swal.fire({
                icon: 'success',
                title: 'Producto creado',
                text: 'El producto se ha creado correctamente',
            });

            setName('');
            setFeatures('');
            setPrice('');
            setYear('');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: error.message || 'Ocurrió un error al crear el producto',
            });
        }
    };

    return (
        <section>
            <h2>Crear un nuevo producto</h2>

            <form onSubmit={addProduct}>
                <fieldset className='fieldsetAddProduct'>
                    <legend>Información del producto</legend>
                    <div className='fieldAddProduct'>
                        <label htmlFor="name">Nombre del producto: </label>
                        <input
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Ej: Teclado'
                            required
                        />
                    </div>

                    <div className='fieldAddProduct'>
                        <label htmlFor="features">Características: </label>
                        <input
                            id='features'
                            type="text"
                            value={features}
                            onChange={(e) => setFeatures(e.target.value)}
                            placeholder='Ej: Mecánico, retroiluminado'
                            required
                        />
                    </div>

                    <div className='fieldAddProduct'>
                        <label htmlFor="price">Precio: </label>
                        <input
                            id='price'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder='Ej: 1000'
                            required
                        />
                    </div>

                    <div className='fieldAddProduct'>
                        <label htmlFor="year">Año: </label>
                        <input
                            id='year'
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            placeholder='Ej: 2025'
                            required
                        />
                    </div>

                    <button type='submit' style={{ marginTop: '1rem' }}>Crear producto</button>
                </fieldset>
            </form>
        </section>
    );
};

export default ProductForm;
