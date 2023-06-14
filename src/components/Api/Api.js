import React, {useContext, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MainPage from '../MainPage/MainPage';
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage';
import SearchPage from '../SearchPage/SearchPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import { Context } from '../..';

 function Api () {

    const {store} = useContext(Context)
    const navigate = useNavigate();
  
    useEffect (() => {
        if (localStorage.getItem('token') && !store.isAuth) {
            store.checkAuth();    
        }
        if (!store.isAuth) {
            navigate('/');
        }
        if (store.isAuth && !store.isLoading) {
            store.userInfo(); 
        }
    }, [])

    return (
        <>
            <div className='container1360'>
                <Header />
                <Routes>
                    <Route path='/'exact element={<MainPage/>} />
                    <Route path='/authorization' element={<AuthorizationPage/>} />
                    <Route path='/search' element={<SearchPage/>} />
                    <Route path='/search-results' element={<SearchResultsPage/>} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Api