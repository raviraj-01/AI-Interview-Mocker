"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const user = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  //calling GetInterviewList whenever the user info is available
  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
    // Only set loading to true on first mount, not every user change
    // eslint-disable-next-line
  }, [user]);

  const GetInterviewList = async () => {
    // Only set loading to true if interviewList is empty (first load)
    if (interviewList.length === 0) setLoading(true);
    const result = await db
      .select()
      .from(MockInterview) //schema name
      .where(
        eq(
          MockInterview.createdBy,
          user?.user?.primaryEmailAddress?.emailAddress
        )
      ) //it is used to filter results where the createdBy field of MockInterview is equal to the current user’s email address
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoaderCircle className="animate-spin w-10 h-10 mr-2" />
        <span>Loading interviews...</span>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="font-medium text-xl mt-10">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
