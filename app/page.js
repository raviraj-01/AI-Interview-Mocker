"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "./dashboard/_components/Header";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <Header />
      <main className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 text-center">
          AI Mock Interview Platform
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 text-center max-w-2xl">
          Prepare for your dream job with AI-powered mock interviews, instant
          feedback, and personalized questions tailored to your skills and
          experience.
        </p>
        <Button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => router.push("/dashboard")}
        >
          Get Started
        </Button>
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 text-3xl mb-2">🎤</span>
            <h3 className="font-bold text-lg mb-2">Mock Interviews</h3>
            <p className="text-gray-500 text-center">
              Practice with realistic interview questions and scenarios.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 text-3xl mb-2">🤖</span>
            <h3 className="font-bold text-lg mb-2">AI Feedback</h3>
            <p className="text-gray-500 text-center">
              Get instant, actionable feedback to improve your answers.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 text-3xl mb-2">📈</span>
            <h3 className="font-bold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-500 text-center">
              Monitor your improvement and readiness for real interviews.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
