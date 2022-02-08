import { getMessaging } from 'firebase/messaging';
import { useToken } from 'react-firebase-hooks/messaging';
import app from '../Firebase'
const MessagingToken = () => {
  const [token, loading, error] = useToken(getMessaging(app));
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading token...</span>}
        {token && <span>Token:{token}</span>}
      </p>
    </div>
  );
};

export default MessagingToken; 