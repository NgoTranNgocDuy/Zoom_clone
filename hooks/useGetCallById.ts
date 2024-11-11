import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

// Hook is basically a function that returns a value. It is a way to reuse stateful logic across your application.
export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();
  // useEffect is a hook that runs after the first render and after every update. It is a way to perform side effects in your function components.
  useEffect(() => {
    if (!client) return;
    // async function is a function that returns a promise that is either resolved or rejected. It allows you to use the await keyword inside the function. This kind of function is used to perform asynchronous operations for example fetching data from an API or reading a file or writing to a database as these operations take time to complete then it uses promise here because promise will handle the response of the asynchronous operation by either resolving the value or rejecting the error.
    const loadCall = async () => {
      // try catch is a way to handle errors in JavaScript. It allows you to run code that might throw an error and catch that error if it happens. 
      try {
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false); 
      } catch (error) {
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
