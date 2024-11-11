// 'use client';
// import { useEffect, useState } from 'react';
// import {
//   DeviceSettings,
//   VideoPreview,
//   useCall,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';

// import Alert from './Alert';
// import { Button } from './ui/button';

// const MeetingSetup = ({
//   setIsSetupComplete,
// }: {
//   setIsSetupComplete: (value: boolean) => void;
// }) => {
//   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
//   const callStartsAt = useCallStartsAt();
//   const callEndedAt = useCallEndedAt();
//   const callTimeNotArrived =
//     callStartsAt && new Date(callStartsAt) > new Date();
//   const callHasEnded = !!callEndedAt;

//   const call = useCall();

//   if (!call) {
//     throw new Error(
//       'useStreamCall must be used within a StreamCall component.',
//     );
//   }
//   // useState is a hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value.
//   const [isMicCamToggled, setIsMicCamToggled] = useState(false);
//   useEffect(() => {
//     if (isMicCamToggled) {
//       call.camera.disable();
//       call.microphone.disable();
//     } else {
//       call.camera.enable();
//       call.microphone.enable();
//     }
//   }, [isMicCamToggled, call.camera, call.microphone]);

//   if (callTimeNotArrived)
//     return (
//       <Alert
//         title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
//       />
//     );

//   if (callHasEnded)
//     return (
//       <Alert
//         title="The call has been ended by the host"
//         iconUrl="/icons/call-ended.svg"
//       />
//     );

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-center text-2xl font-bold">Setup</h1>
//       <VideoPreview />
//       <div className="flex h-16 items-center justify-center gap-3">
//         <label className="flex items-center justify-center gap-2 font-medium">
//           <input
//             type="checkbox"
//             checked={isMicCamToggled}
//             onChange={(e) => setIsMicCamToggled(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//       </div>
//       <Button
//         className="rounded-md bg-green-500 px-4 py-2.5"
//         onClick={() => {
//           call.join();

//           setIsSetupComplete(true);
//         }}
//       >
//         Join meeting
//       </Button>
//     </div>
//   );
// };

// export default MeetingSetup;
'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // Separate state for camera and microphone
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);

  useEffect(() => {
    if (isCameraOn) {
      call.camera.enable();
    } else {
      call.camera.disable();
    }
  }, [isCameraOn, call.camera]);

  useEffect(() => {
    if (isMicrophoneOn) {
      call.microphone.enable();
    } else {
      call.microphone.disable();
    }
  }, [isMicrophoneOn, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex flex-col gap-4">
        {/* Toggle for Camera */}
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCameraOn}
              onChange={(e) => setIsCameraOn(e.target.checked)}
            />
            <div
              className={`w-12 h-6 rounded-full transition-colors ${
                isCameraOn ? 'bg-green-500' : 'bg-gray-500'
              }`}
            ></div>
            <span
              className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isCameraOn ? 'translate-x-6' : ''
              }`}
            ></span>
          </label>
          <span className="font-medium">
            Camera is {isCameraOn ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Toggle for Microphone */}
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isMicrophoneOn}
              onChange={(e) => setIsMicrophoneOn(e.target.checked)}
            />
            <div
              className={`w-12 h-6 rounded-full transition-colors ${
                isMicrophoneOn ? 'bg-green-500' : 'bg-gray-500'
              }`}
            ></div>
            <span
              className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isMicrophoneOn ? 'translate-x-6' : ''
              }`}
            ></span>
          </label>
          <span className="font-medium">
            Microphone is {isMicrophoneOn ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      <DeviceSettings />
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5 mt-4"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
