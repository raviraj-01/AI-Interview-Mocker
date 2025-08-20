import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {

  const router = useRouter();

  const onStart=()=>{
    router.push('/dashboard/interview/'+interview?.mockId)
  }

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
  }

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="font-bold text-blue-400">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-500">
        Created At: {interview.createdAt}
      </h2>

      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" variant="outline" className="flex-1 cursor-pointer"
        onClick={onFeedbackPress}
        >
          Feedback
        </Button>

        <Button size="sm" className="flex-1 cursor-pointer"
        onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
