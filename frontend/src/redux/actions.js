// actions.js
// export const FETCH_CASES = 'FETCH_CASES';
// export const SET_CASES = 'SET_CASES';

// export const fetchCases = () => {
//     return dispatch => {
//         // Fetch cases from the API or server
//         const cases = [
//             // Mock data or fetched data
//             { barcode: '12345', auditType: 'Type A', status: 'Completed', submittedDate: '2023-07-01' },
//             // Add more cases
//         ];
//         dispatch({ type: SET_CASES, payload: cases });
//     };
// };

// export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
// export const FETCH_CASES_ERROR = 'FETCH_CASES_ERROR';

// export const fetchCases = () => {
//     return (dispatch) => {
//         try {
//             // Simulate fetching data from an API or server
//             const cases = [
//                 { barcode: '12345', auditType: 'Type A', status: 'Completed', submittedDate: '2023-07-01' },
//                 { barcode: '67890', auditType: 'Type B', status: 'In Progress', submittedDate: '2023-06-25' },
//                 { barcode: '54321', auditType: 'Type C', status: 'Pending', submittedDate: '2023-06-30' },
//                 // Add more mock data as needed
//             ];
//             dispatch({ type: FETCH_CASES_SUCCESS, payload: cases });
//         } catch (error) {
//             dispatch({ type: FETCH_CASES_ERROR, error: 'Failed to fetch cases' });
//         }
//     };
// };

// export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
// export const FETCH_CASES_ERROR = 'FETCH_CASES_ERROR';

// export const fetchCases = () => {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 try {
//                     const cases = [
//                         { barcode: '12345', auditType: 'Type A', status: 'Completed', submittedDate: '2023-07-01' },
//                         { barcode: '67890', auditType: 'Type B', status: 'In Progress', submittedDate: '2023-06-25' },
//                         { barcode: '54321', auditType: 'Type C', status: 'Pending', submittedDate: '2023-06-30' },
//                         // Add more mock data as needed
//                     ];
//                     dispatch({ type: FETCH_CASES_SUCCESS, payload: cases });
//                     resolve(cases);
//                 } catch (error) {
//                     dispatch({ type: FETCH_CASES_ERROR, error: 'Failed to fetch cases' });
//                     reject('Failed to fetch cases');
//                 }
//             }, 1000); // Simulate a 1-second delay for the "API call"
//         });
//     };
// };

// src/redux/actions.js
// src/redux/actions.js

// src/redux/actions.js
import axiosInstance from '../api/axiosInstance';
import { FETCH_CASES_SUCCESS, FETCH_CASES_FAILURE } from './actionTypes';

export const fetchCases = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/cases'); // Update the endpoint as needed
        dispatch({
            type: FETCH_CASES_SUCCESS,
            payload: response.data, // Ensure this is an array
        });
    } catch (error) {
        dispatch({
            type: FETCH_CASES_FAILURE,
            payload: error.message,
        });
    }
};

