import React, { Component } from 'react';
import AccountStore from '../stores/accountStore'


function Authenticate(hash) {
  let token = AccountStore.getToken();
  if (token == null)
    location.hash = hash ? "#/" + hash : "#/";
}

export default Authenticate;
