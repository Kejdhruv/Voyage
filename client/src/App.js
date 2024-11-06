import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./Home.jsx";
import Stays from "./Stays.jsx";
import Food from "./Food.jsx";
import StaysPage from "./StaysPage.jsx";
import FoodPage from "./FoodPage.jsx";
import AdminUser from "./AdminUser.jsx";
import AdminPanel from "./AdminPanel.jsx";
import Facilities from "./Facilities.jsx";
import AdminOrder from "./AdminOrder.jsx";
import HotelForm from "./HotelForm.jsx";
import RestaurantForm from "./RestaurantForm.jsx";
import AdminROrder from "./AdminROrder.jsx";
import Guides from "./Guides.jsx";
import GuidesPage from "./GuidesPage.jsx";
import GuidePanel from "./GuidePanel.jsx";
import GuideOrders from "./GuideOrders.jsx";
import GuidesProfile from "./GuidesProfile.jsx";
import RegisterAdmin from "./RegsiterAdmin.jsx";
import UserLogin from "./UserLogin.jsx";
import UserRegister from "./UserRegister.jsx";
import UserPanel from "./UserPanel.jsx";
import UserOrders from "./UserOrders.jsx";
import UserProfile from "./UserProfile.jsx";
import Activities from "./Activities.jsx";
import ActivitiesPage from "./ActivitiesPage.jsx";
import ActivitiesOrder from "./ActivitiesOrder.jsx";
import ActivitiesForm from "./ActivitiesForm.jsx";
function App() {
  return (
  <Routes><Route path = '/' element = {<Home/>} />
  <Route path = '/Hotels' element = {<Stays/>} />
  <Route path = '/Activities' element = {<Activities/>} />
  <Route path='/Activities/:_id' element={<ActivitiesPage/>} />
  <Route path = '/Restaurants' element = {<Food/>} />
  <Route path='/Hotels/:_id' element={<StaysPage/>} />
  <Route path='/Appartments/:_id' element={<StaysPage />} />
  <Route path='/Restaurants/:_id' element={<FoodPage />} />
  <Route path='/AdminUser' element={<AdminUser />} />
  <Route path='/AdminPanel/:_id' element={<AdminPanel />} />
  <Route path='/Facilities/:_id' element={<Facilities />} />
  <Route path='/HotelOrders/:_id' element={<AdminOrder/>} />
  <Route path='/RestaurantOrders/:_id' element={<AdminROrder/>} />
  <Route path='/Hotel-form/:_id' element={<HotelForm/>} />
  <Route path='/Restaurant-form/:_id' element={<RestaurantForm/>} />
  <Route path='/Activities-form/:_id' element={<ActivitiesForm/>} />
  <Route path = '/Guides' element = {<Guides/>} />
  <Route path='/Guides/:_id' element={<GuidesPage/>} />
  <Route path='/GuidePanel/:_id' element={<GuidePanel/>} />
  <Route path='/GuideOrders/:_id' element={<GuideOrders/>} />
  <Route path='/GuidesProfile/:user' element={<GuidesProfile/>} />
  <Route path = '/Register' element = {<UserLogin/>} />
  <Route path = '/Register/User' element = {<UserRegister/>} />
  <Route path = '/RegisterAdmin' element = {<RegisterAdmin/>} />
  <Route path = '/UserPanel/:_id' element = {<UserPanel/>} />
  <Route path = '/UserOrders/:_id' element = {<UserOrders/>} />
  <Route path = '/UsersProfile/:_id' element = {<UserProfile/>} />
  <Route path='/ActivitiesOrders/:_id' element={<ActivitiesOrder/>} />
  </Routes>
  );
}

export default App;
