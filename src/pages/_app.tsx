import "@/styles/globals.css";
import {
  MeetingProvider,
  lightTheme,
} from "amazon-chime-sdk-component-library-react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import React from "react";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      {/* @ts-ignore */}
      <MeetingProvider>
        <Component {...pageProps} />
      </MeetingProvider>
    </ThemeProvider>
  );
};

export default App;
