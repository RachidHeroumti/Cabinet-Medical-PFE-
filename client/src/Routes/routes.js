//const host='http://localhost:5002/api'
//const host ='http://44.201.248.88:5000/pfe/api'
const host ='https://cabinet-api.vercel.app/api'
export const registerRoute=`${host}/register` ;
export const loginRoute=`${host}/login`;

export const getPatientsRoute=`${host}/users/get-patients`;
export const getDoctorsRoute=`${host}/users/get-doctors`;
export const getUserBycinRoute=`${host}/users/get-userbycin`;

export const getDepartmetRoute=`${host}/dep/get-deps`;


export const addRDVRoute=`${host}/rdv/Add-rdv`;
//export const getRDVsRoute=`${host}/rdv/Add-rdv`;
export const getPatientRDVRoute=`${host}/rdv/get-Myrdvs`;
export const getdocRDVRoute=`${host}/rdv/get-rdvsDoc`;
export const deletRDVRoute=`${host}/rdv/delete-rdv`

export const getPatTestsRoute=`${host}/test/get-PatTests`;


//notes
export const addNoteRoute=`${host}/note/Add-note`;

//test
export const addTesteRoute=`${host}/test/Add-test`;
export const getTesteRoute=`${host}/test/get-testes`;

//messages
export const addMessageRoute=`${host}/message/Add-message`;
export const getMessageRoute=`${host}/message/get-msgswithadmin`;


