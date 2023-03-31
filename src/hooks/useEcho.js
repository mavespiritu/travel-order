import Echo from 'laravel-echo';

const ECHO_SERVER = process.env.REACT_APP_ECHO_SERVER
const ECHO_SERVER_PORT = process.env.REACT_APP_ECHO_SERVER_PORT

const useEcho = () => {

  window.io = require('socket.io-client');

  const host =  (process.env.REACT_APP_ENV==='development')?`${ECHO_SERVER}:${ECHO_SERVER_PORT}`:`${ECHO_SERVER}`

  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host
    // auth: {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // }
  });

}

export default useEcho