import React from 'react';


const services = {
	request: (URL,data_) => {
		return fetch(URL,{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: data_,
    })
	},

};
export default services;
