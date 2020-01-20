import React from 'react';
import router from './routes.js';

const services = {
	clients: type => {
		return "Hello world";
		fetch('https://63b5bceb.ngrok.io/app-accounting/clients_/list/',{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: type,
        })
        .then(res => res.json())
        .then(res => {
          if(this._isMounted){
            this.setState({
              isLoaded: true,
              ready_:true,
              data_:res,
            });
          }
          //alert(this._isMounted);       
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
        .catch(function(error) {
          Alert.alert(
            error.message
          )
         // ADD THIS THROW error
          throw error;
        });
	}
};
export default services;