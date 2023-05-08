"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  DeviceLabels,
  LocalVideo,
  MeetingStatus,
  RemoteVideos,
  useAudioVideo,
  useLocalVideo,
  useMeetingEvent,
  useMeetingManager,
  useMeetingStatus,
} from "amazon-chime-sdk-component-library-react";
import { useState, useEffect } from "react";
import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import { styled } from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();
  const meetingEvent = useMeetingEvent();
  const audioVideo = useAudioVideo();
  const [meetingId, setMeetingId] = useState("");
  const [requestId, setRequestId] = useState("");
  const { toggleVideo } = useLocalVideo();

  useEffect(() => {
    if (meetingEvent) {
      if (meetingEvent.name === "meetingStartSucceeded") {
        setMeetingId(meetingEvent?.attributes?.meetingId || "");
        setTimeout(() => {
          handleEnd();
        }, 60000);
      }
    }
  }, [meetingEvent]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function tog() {
      if (meetingStatus === MeetingStatus.Succeeded) {
        await toggleVideo();
      }
    }
    tog();
  }, [meetingStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLeave = async () => {
    await meetingManager.leave();
  };

  const handleJoin = async () => {
    const endpoint = "/api/join";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: requestId }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();

    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      result.data.Meeting,
      result.data.Attendee
    );

    const meetingOptions = {
      deviceLabels: DeviceLabels.AudioAndVideo,
    };

    await meetingManager.join(meetingSessionConfiguration, meetingOptions);
    await meetingManager.start();

    setMeetingId(result.data.Meeting.MeetingId);
  };

  const handleEnd = async () => {
    const endpoint = "/api/end";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meetingId: meetingId }),
    };
    await fetch(endpoint, options);
    setMeetingId("");
  };
  return (
    <Main className={inter.className}>
      <div className="container mx-auto">
        <h1 className=" text-xl font-semibold">Hello AWS Chime</h1>

        <div className="RemoteVideos bg-neutral-200">
          <RemoteVideos />
          <div>{<LocalVideo className="LocalVideo" />}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="btn bg-emerald-700 px-4 rounded-md text-white"
            onClick={() => handleJoin()}
          >
            {" "}
            Join
          </button>
          <button
            className="btn bg-emerald-700 px-4 rounded-md text-white"
            onClick={() => handleLeave()}
          >
            Leave
          </button>
          <button
            className="btn bg-emerald-700 px-4 rounded-md text-white"
            onClick={() => handleEnd()}
          >
            End
          </button>
        </div>
      </div>
    </Main>
  );
}

const Main = styled.main``;
