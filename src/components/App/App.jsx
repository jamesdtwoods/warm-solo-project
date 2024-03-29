import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  Link
} from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ClothingForm from '../Clothes/ClothingForm';
import ClothingList from '../Clothes/ClothingList';
import ClothingItemDetails from '../Clothes/ClothingItemDetails';
import ClothingFormEdit from '../Clothes/ClothingFormEdit';
import ActivityForm from '../Activities/ActivityForm';
import ActivityList from '../Activities/ActivityList';
import ActivityListByWeather from '../Activities/ActivityListByWeather';
import ActivityDetails from '../Activities/ActivityDetails';
import ActivityFormEdit from '../Activities/ActivityFormEdit';
import Weather from '../Weather/Weather';
import WeatherHeader from '../WeatherHeader/WeatherHeader';
import Pagination_app from '../Pagination/Pagination_app';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);
  


  return (
    <Router>
      <div>
        {/* <Header /> */}
        {/* <Nav /> */}
        <Navbar />
        <WeatherHeader />

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows Clothes Form else shows LoginPage
            exact path="/newClothes"
          >
            <ClothingForm />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Clothes else shows LoginPage
            exact path="/viewClothes"
          >
            <ClothingList />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Clothing item else shows LoginPage
            exact path="/viewClothingItem/:id"
          >
            <ClothingItemDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Edit Clothes Form else shows LoginPage
            exact path="/editClothes/:id/"
          >
            <ClothingFormEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Activity Form else shows LoginPage
            exact path="/newActivity"
          >
            <ActivityForm />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Activities else shows LoginPage
            exact path="/viewActivities"
          >
            <ActivityList />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Activities else shows LoginPage
            exact path="/viewActivitiesByWeather"
          >
            <ActivityListByWeather />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Clothing item else shows LoginPage
            exact path="/viewActivity/:id"
          >
            <ActivityDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Edit Clothes Form else shows LoginPage
            exact path="/editActivity/:id/"
          >
            <ActivityFormEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Edit Clothes Form else shows LoginPage
            exact path="/weather/"
          >
            <Weather />
          </ProtectedRoute>




          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact path="/pagination"
          >
            <Pagination_app />
          </ProtectedRoute>

          

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
