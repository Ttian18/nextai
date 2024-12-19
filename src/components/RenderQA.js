import React from "react";
import { Spin } from "antd";

const containerStyle = {
  display: "flex", //flexbox
  justifyContent: "space-between",
  flexDirection: "column",//上下顶头
  marginBottom: "20px",
};

const userContainer = {
  textAlign: "right",
};

const agentContainer = {
  textAlign: "left",
};

const userStyle = {
  maxWidth: "50%",
  textAlign: "left",
  backgroundColor: "#1677FF",
  color: "white",
  display: "inline-block",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "10px",
};

const agentStyle = {
  maxWidth: "50%",
  textAlign: "left",
  backgroundColor: "#F9F9FE",
  color: "black",
  display: "inline-block",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "10px",
};

const RenderQA = (props) => {
  const { conversation, isLoading } = props;

  return (
    <>
      {conversation?.map((each, index) => {
        return (
          <div key={index} style={containerStyle}>
            <div style={userContainer}>
              <div style={userStyle}>{each.question}</div>
            </div>
            <div style={agentContainer}>
              <div style={agentStyle}>{each.answer}</div>
            </div>
          </div>
        );
      })}
      {isLoading && <Spin size="large" style={{ margin: "10px" }} />}
    </>
  );
};

export default RenderQA;
