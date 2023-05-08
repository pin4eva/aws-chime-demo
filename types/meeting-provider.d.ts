// declare module "MeetingProvider" {
//   export interface Props {
//     children: Element;
//     onDeviceReplacement?: (
//       nextDevice: string,
//       currentDevice: AudioInputDevice
//     ) => Promise<AudioInputDevice>;
//     /** Pass a `MeetingManager` instance if you want to share this instance
//      * across multiple different `MeetingProvider`s. This approach has limitations.
//      * Check `meetingManager` prop documentation for more information.
//      */
//     meetingManager?: MeetingManager;
//   }
// };

import React from "react";

export declare module "amazon-chime-sdk-component-library-react" {
  export interface IProps extends Props {
    children: any;
  }
}
