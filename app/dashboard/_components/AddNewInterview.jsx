"use client";
import { useState } from "react";
import React from "react";
import { chatSession } from "@/utils/GeminiAiModel.jsx";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [opendialog, setOpenDialog] = useState(false);
  const [jobposition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setloading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onsubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    console.log("Job Position:", jobposition);
    console.log("Job Description:", jobDesc);
    console.log("Years of Experience:", jobExperience);

    const InputPrompt = `Job position: ${jobposition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawText = await result.response.text();

      const jsonArrayMatch = rawText.match(/\[[\s\S]*?\]/);

      if (!jsonArrayMatch) {
        throw new Error("JSON array not found in the AI response.");
      }

      const cleanJsonArray = jsonArrayMatch[0];
      const parsed = JSON.parse(cleanJsonArray);

      console.log(parsed);
      setJsonResponse(parsed);

      if (parsed) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: parsed,
            jobPosition: jobposition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            // ? is important bec if u dont write it then if value is null then u will get the error not defined but if u use it then it will show wmpty space
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log("Inserted ID:", resp);
        if(resp){
          setOpenDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId);
        }
      } else {
        console.log("error");
      }
      
    } catch (error) {
      console.error("Failed to parse AI response:", error.message);
      alert(
        "Something went wrong while generating questions. Please try again."
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-gray-50 hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={opendialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about job you are interviewing
            </DialogTitle>
            <DialogDescription>
              Add details about job position, your skill and years of
              experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onsubmit}>
            <div>
              <div className="mt-5 my-3">
                <label>Job role/Job position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Job Description/Tech Stack</label>
                <Textarea
                  placeholder="Ex. React, NodeJs, MongoDb etc"
                  required
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Years of Experience</label>
                <Input
                  placeholder="Ex. 2"
                  type="number"
                  max="60"
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-end mt-4 cursor-pointer">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
