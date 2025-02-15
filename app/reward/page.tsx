"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const username = "Sudip";
const reward = {
  title: "Resume Checkup",
  description:
    "Upload your resume below which will be checked by industry expert with the suggestion for improvement",
  upload: true,
};

function Reward() {
  const [email, setEmail] = useState("");
  const [file, setFileName] = useState("No file selected");

  return (
    <div className="container">
      <h1 className="title mt-20">Reward</h1>
      <p className="mt-6">
        Hi {username}, Congratulation in winning the reward. Reward for
        completing this level is <span>{reward.title}</span>
      </p>
      <p>{reward.description}</p>
      <form className="mt-10 mb-20">
        <div>
          {reward.upload && (
            <div className=" ">
              <input
                type="File"
                id="actual-upload-btn"
                onChange={(e) => {
                  e.target.files &&
                    e.target.files[0] &&
                    setFileName("uploded " + e.target.files[0].name);
                }}
                hidden
              />
              <label
                htmlFor="actual-upload-btn"
                className="cursor-pointer border-2  border-gray-800 gap-3 mb-2 rounded px-4 py-4 flex w-fit border-dashed"
              >
                <Image
                  src="ProfileGraphics/uploadicon.svg"
                  alt="upload icon"
                  width={20}
                  height={20}
                />
                Upload Resume
              </label>
              <span>{file}</span>
            </div>
          )}
        </div>
        <input
          placeholder="Enter your email for us to contact you"
          type="text"
          className="border-2 rounded px-2 mt-6 py-3 w-96"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <button className="quizPbtn mt-8">Submit</button>
      </form>
    </div>
  );
}

export default Reward;
