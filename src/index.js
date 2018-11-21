import firebase from 'firebase/app';
import $ from 'jquery';
import 'bootstrap';
import showAddForm from './components/AddEditFriends/addEditFriends';

import apiKeys from '../db/apiKeys.json';

import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import initializeFriendsPage from './components/FriendsPage/friendsPage';

import './index.scss';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(initializeFriendsPage);
  loginButton();
  $('#show-friend-form').on('click', showAddForm);
};

initializeApp();
