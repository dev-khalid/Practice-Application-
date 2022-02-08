import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import app from './Firebase.js';
import { getMessaging, getToken } from 'firebase/messaging';
// import './client';
// Public Key
// BCw9DyYE6hfa2rWNxwjxJbN_CcMniLbmIbpFs3lZNkCHYxJ9-n7F3FJPUHLmGCqtj0RG9Yroajg1weEyT-O6Wg4

// Private Key:
// 7OVsOID2th1_sZBUk6PAMeTGfJLYlxoXkOxhpaO4c_M
import swDev from './client';
// swDev({ title: 'Khalid TEsting' });
const App = () => {
  const [something, setS] = useState('');
  useEffect(() => {
    const messaging = getMessaging(app);
    getToken(messaging, {
      vapidKey:
        'BAQYNZDxJORGqZHeXIHvnFa2_rr3LBsKyQOLDRaE0vruP8rCwpnNgx6xSxJkKOByqmcHj2HPlvjWT9MNnjDZ6TI',
    })
      .then((token) => {
        console.log('Token : ', token);
      })
      .catch((err) => {
        console.log('whats the error', err);
      });
    // messaging.onMessage((payload)=>{
    //   console.log(payload);

    // })
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    swDev({ title: something });
  };
  // setInterval(() => {
  //   swDev({ title: 'Eibar khela hobe' });
  // }, 2000);

  const [show, setShow] = useState(true);
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={something}
          onChange={(e) => setS(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default App;
