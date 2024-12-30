import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import { useSpeechRecognition } from "react-speech-recognition";
import Speech from "speak-tts";


const { Search } = Input;


const DOMAIN = process.env.REACT_APP_DOMAIN;


const searchContainer = {
  display: "flex",
  justifyContent: "center",
};


const ChatComponent = (props) => {
  const { handleResp, isLoading, setIsLoading } = props;
  // Define a state variable to keep track of the search value
  const [searchValue, setSearchValue] = useState("");
  const [isChatModeOn, setIsChatModeOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speech, setSpeech] = useState();


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();


  useEffect(() => {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: "en-US",
        rate: 1,
        pitch: 1,
        voice: "Google US English",
        splitSentences: true,
      })
      .then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
        setSpeech(speech);
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });
  }, []);


  const onSearch = async (question) => {
    // Clear the search input
    setSearchValue("");
    setIsLoading(true);


    try {
      const response = await axios.get(`${DOMAIN}/chat`, {
        params: {
          question,
        },
      });
      handleResp(question, response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
      handleResp(question, error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleChange = (e) => {
    // Update searchValue state when the user types in the input box
    setSearchValue(e.target.value);
  };


  const chatModeclickHandler = () => {
    setIsChatModeOn(!isChatModeOn);
  };


  const recordingClickHandler = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
    }
  };


  return (
    <div style={searchContainer}>
      {!isChatModeOn && (
        <Search
          placeholder="input search text"
          enterButton="Ask"
          size="large"
          onSearch={onSearch}
          loading={isLoading}
          value={searchValue} // Control the value
          onChange={handleChange} // Update the value when changed
        />
      )}
      <Button danger={isChatModeOn} onClick={chatModeclickHandler}>
        Chat Mode: {isChatModeOn ? "On" : "Off"}
      </Button>
      {isChatModeOn && (
        <Button danger={isRecording} onClick={recordingClickHandler}>
          {isRecording ? "Recording..." : "Click to record"}
        </Button>
      )}
    </div>
  );
};


export default ChatComponent;