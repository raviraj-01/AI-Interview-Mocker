"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import { Button } from "@/components/ui/button";
//import RecordAnswerSection from "./_components/RecordAnswerSection";
//You need to dynamically import the hook or the component so it only loads in the browser.
import dynamic from "next/dynamic";
import Link from "next/link";

const RecordAnswerSection = dynamic(
  () => import("./_components/RecordAnswerSection"),
  { ssr: false }
);

function StartInterview({ params }) {
  const { interviewid } = React.use(params);

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, [interviewid]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewid));  // general syntax = .where(eq(field, value))

    const rawJson = result[0]?.jsonMockResp;
    try {
      let cleaned = rawJson.trim();
      if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
        cleaned = cleaned.slice(1, -1);
      }
      const arr = JSON.parse(`[${cleaned}]`);
      const questions = arr
        .map((str) => {
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      setMockInterviewQuestion(questions);
    } catch (e) {
      setMockInterviewQuestion([]);
    }
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection 
        mockInterviewQuestion = {mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
        mockInterviewQuestion = {mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-5">
        {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} className="cursor-pointer">Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} className="cursor-pointer">Next Question</Button>}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && 
        <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
        <Button className="cursor-pointer">End Interview</Button> 
        </Link>}
      </div>
    </div>
  );
}

export default StartInterview;