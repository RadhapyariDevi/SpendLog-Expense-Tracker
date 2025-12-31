"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Hero() {
  const { isSignedIn } = useUser();
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          
          {isSignedIn ? (
            <h2 className="mb-3 text-3xl text-secondary sm:text-5xl">
              Welcome to SpendLog 🎉
            </h2>
          ) : (
            ""
          )}

          <h1 className="mt-5 text-4xl font-bold text-gray-900 sm:text-5xl">
            Track expenses, Know where your
            <strong className="text-secondary"> money </strong>
            goes
          </h1>
          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Keep all your daily expenses in one place and manage them easily.
          </p>
          <div className="mt-4 flex gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-secondary bg-secondary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary hover:text-white"
              href={isSignedIn ? "/dashboard" : "/sign-in"}
            >
              {isSignedIn ? "Go to Dashboard" : "Get Started"}
            </a>
          </div>
        </div>
        <img
          src="/landing.png"
          alt="Landing illustration"
          className="mx-auto hidden max-w-2xl md:block"
        />
      </div>
    </section>
  );
}

export default Hero;
