import ProductForm from "./ProductForm";
import ProductsView from "./ProductsView";
import  {Routes, Route} from 'react-router-dom';

const ProductsModule = () => {
    return (
        
            <Routes>
                <Route path="/productos" element={<ProductsView />} />
            </Routes>
    
    )
}

export default ProductsModule