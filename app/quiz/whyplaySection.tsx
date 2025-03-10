import React from "react";
import Image from "next/image";

function WhyplaySection() {
  const content = [
    {
      image: "/WhyGraphics/LightBulb.svg",
      title: "Job Search Preparation",
      description:
        "Sharpen your job-hunting skills at your own pace with fun, interactive quizzes designed to boost your confidence and knowledge.",
    },
    {
      image: "/WhyGraphics/Trophy.svg",
      title: "Engaging Features",
      description:
        "From leaderboards to rewards for achievements, the Guhuza’s Brain Boost Game keeps you motivated and engaged as you level up your job search.",
    },
    {
      image: "/WhyGraphics/Aproved.svg",
      title: "Trusted Content",
      description:
        "Powered by expert-curated questions, our game covers essential job search topics, ensuring you're prepared for every step of the hiring process.",
    },
  ];

  return (
    <section className="bg-gray-50 mt-20 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center px-4 py-1 bg-blue-400 text-4xl w-fit m-auto rounded font-bold text-gray-900 mb-10 intersect:motion-preset-slide-up motion-delay-200 intersect-once">
          Why Play the Guhuza’s Brain Boost ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.map((reason, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-lg   transition intersect:motion-preset-slide-up-lg motion-delay-${
                index * 100
              }  intersect-once  `}
            >
              <Image
                src={reason.image}
                alt={reason.title + " image"}
                width={80}
                height={80}
                className="mb-4"
              />
              <h4 className="text-2xl font-bold text-gray-800 mb-2">
                {reason.title}
              </h4>
              <p className=" text-gray-600 text-justify">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyplaySection;
