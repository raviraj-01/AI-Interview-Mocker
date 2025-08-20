"use client";

import { db } from "@/utils/db";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const { interviewid } = React.use(params); // Unwrap params
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, [interviewid]);

  // Function to fetch interview details by mockId or interviewid
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewid));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h1 className="font-bold text-2xl">Let's Get Started....</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-4 ">
          <div className="flex flex-col gap-4 rounfded-lg p-5 border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData && interviewData.jobPosition
                ? interviewData.jobPosition
                : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData && interviewData.jobDesc
                ? interviewData.jobDesc
                : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>
              {interviewData && interviewData.jobExperience
                ? interviewData.jobExperience
                : "Loading..."}
            </h2>
          </div>
          <div className="p-5 rounded-lg border border-yellow-200 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600"><Lightbulb/><strong>Information</strong></h2>
            <h2 className="mt-2 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ width: 300, height: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="w-full my-7 h-70 p-20 rounded-lg border" />
              <Button variant="ghost" className="w-full border cursor-pointer" onClick={() => setWebCamEnabled(true)}>
                Enable Webcam and microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={'/dashboard/interview/'+interviewid+'/start'}>
        <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
    
  );
}

export default Interview;
