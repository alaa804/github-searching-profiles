import {
          CLEAR_USERS ,
          REMOVE_ALERT ,
          SEARCH_USERS ,
          GET_REPOS ,
          SET_ALERT,
          SET_LOADING,
          GET_USER
      } from '../types';

 export default (state , action) => {

   const { payload , type } = action

   switch(type) {
       case SET_LOADING :
           return {
               ...state,
               loading : true,
           }
        case SEARCH_USERS :
            return {
                ...state,
                users : payload,
                loading : false 
            } 
        case GET_USER :
            return {
                ...state ,
                user : payload,
                loading : false
            }  
        case GET_REPOS :
            return {
                ...state,
                repos : payload,
                loading : false
            }    
        case CLEAR_USERS : 
        return {
            ...state,
            users : [],
            loading : false
        }      
      default : 
      return state;
   }
 }     