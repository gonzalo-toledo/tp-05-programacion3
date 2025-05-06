import { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import productList from './ProductData';
import ProductForm from './ProductForm';

const ProductsView = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            localStorage.setItem('products', JSON.stringify(productList));
            setProducts(productList);
        }
    }, []);

    const editProduct = async (id) => {
        const productToEdit = products.find((product) => product.id === id);

        const { value: formValues } = await Swal.fire({
            title: 'Editar producto',
            html: `
                <div class="swal-form-row">
                    <label for="swal-input1">Nombre:</label>
                    <input id="swal-input1" class="swal2-input swal-fixed" value="${productToEdit.name}">
                </div>
                <div class="swal-form-row">
                    <label for="swal-input2">Caract.:</label>
                    <input id="swal-input2" class="swal2-input swal-fixed" value="${productToEdit.data.features}">
                </div>
                <div class="swal-form-row">
                    <label for="swal-input3">Precio:</label>
                    <input id="swal-input3" class="swal2-input swal-fixed" value="${productToEdit.data.price}">
                </div>
                <div class="swal-form-row">
                    <label for="swal-input4">Año:</label>
                    <input id="swal-input4" class="swal2-input swal-fixed" value="${productToEdit.data.year}">
                </div>
            `,
            customClass: {
                htmlContainer: 'swal-form-container'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const features = document.getElementById('swal-input2').value;
                const price = document.getElementById('swal-input3').value;
                const year = document.getElementById('swal-input4').value;

                return {
                    name,
                    data: {
                        features,
                        price,
                        year
                    },
                }
            }
        });

        if (!formValues) return;

        try {
            const updatedProducts = products.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        name: formValues.name,
                        data: {
                            ...product.data,
                            features: formValues.data.features,
                            price: formValues.data.price,
                            year: formValues.data.year,
                        }
                    };
                }
                return product;
            });

            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            Swal.fire({
                icon: 'success',
                title: 'Producto editado',
                text: 'El producto se ha editado correctamente',
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: error.message || 'Ocurrió un error al editar el producto',
            });
        }
    };

    const deleteProduct = async (id) => {
        const confirmResult = await Swal.fire({
            title: 'Eliminar producto',
            text: '¿Estás seguro de que deseas eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            Swal.fire({
                icon: 'success',
                title: 'Producto eliminado',
                text: 'El producto se ha eliminado correctamente',
            });

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: error.message || 'Ocurrió un error al eliminar el producto',
            });
        }
    };

    return (
        <Fragment>
            <header>
                <h1>PRODUCTOS</h1>
            </header>

            <section>
                <ProductForm setProducts={setProducts} />
            </section>
            <h2>Lista de productos</h2>
            <section className='products-list'>
                

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Características</th>
                            <th>Precio</th>
                            <th>Año</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.data.features}</td>
                                <td>${product.data.price}</td>
                                <td>{product.data.year}</td>
                                <td>
                                    <button onClick={() => editProduct(product.id)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Fragment>
    );
};

export default ProductsView;
