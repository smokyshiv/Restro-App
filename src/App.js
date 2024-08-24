import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from './context/CartContext';
import './App.css';

const App = () => {
  const [cartList, setCartList] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');

  const addCartItem = dish => {
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId);

    if (!isAlreadyExists) {
      setCartList(prev => [...prev, dish]);
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? { ...item, quantity: item.quantity + dish.quantity }
            : item,
        ),
      );
    }
  };

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId));
  };

  const removeAllCartItems = () => setCartList([]);

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        restaurantName,
        setRestaurantName,
      }}
    >

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>

    </CartContext.Provider>
  );
};

export default App;
