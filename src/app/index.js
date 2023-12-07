import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useSelector from "../store/use-selector";
import Basket from "./basket";
import Main from "./main";
import { Product } from "./product";
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes >
      {activeModal === 'basket' && <Basket />}
    </Router>
  );
}

export default App;
