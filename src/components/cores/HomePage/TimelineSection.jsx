import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";
const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully commited to success company.",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        description: "Fully commited to success company.",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        description: "Fully commited to success company.",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        description: "Fully commited to success company.",
    },
];

const TimelineSection = () => {
    return (
        <div className="w-full flex lg:flex-row flex-col lg:items-center lg:justify-between gap-10">
            <div className="lg:w-[45%] flex flex-col gap-8">
                {timeline.map((timeline, index) => {
                    return (
                        <div key={index} className="flex flex-row gap-6">
                            <div className="w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center">
                                <img src={timeline.Logo} alt="" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[18px] font-semibold">
                                    {timeline.heading}
                                </h2>
                                <p className="text-base">
                                    {timeline.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="relative shadow-lg shadow-blue-200">
                <img
                    src={timelineImage}
                    alt="timeline image"
                    className="shadow-white object-cover h-fit"
                />

                <div className="absolute text-white bg-caribbeangreen-700 flex lg:flex-row flex-col gap-10 lg:gap-0 py-7 left-[50%] translate-x-[-50%] lg:translate-y-[-50%] translate-y-[-120%]">
                    <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-caribbeangreen-300 text-sm">
                            Years of Experience
                        </p>
                    </div>

                    <div className="flex gap-5 items-center px-7">
                        <p className="text-3xl font-bold">250</p>
                        <p className="text-caribbeangreen-300 text-sm">
                            Years of Experience
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;
