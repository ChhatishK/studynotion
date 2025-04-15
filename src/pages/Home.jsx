import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/cores/HomePage/HighlightText";
import CTAButton from "../components/cores/HomePage/Button";

import Banner from "../assets/Images/banner.mp4";

import CodeBlocks from "../components/cores/HomePage/CodeBlocks";

import Footer from "../components/cores/Footer/Footer";
import TimelineSection from "../components/cores/HomePage/timelineSection";
import LearningLanguageSection from "../components/cores/HomePage/LearningLanguageSection";

import InstructorSection from "../components/cores/HomePage/InstructorSection";

import ExploreMore from "../components/cores/HomePage/ExploreMore";

import ReviewSlider from "../components/cores/HomePage/ReviewSlider";

const Home = () => {
    return (
        <div className="w-full">
            {/*Section 1  */}

            <div className="mx-auto flex flex-col w-11/12 max-w-maxContent items-start lg:items-center text-white justify-between ">
                <Link to={"/signup"} className="mt-24">
                    <div className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit p-1">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 shadow-sm shadow-white">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className="lg:text-center md:text-center text-3xl lg:text-4xl font-semibold lg:m-6 mt-6">
                    Empower Your Future with
                    <HighlightText text={" Coding Skills"} />
                </div>

                {/* Subheading */}
                <div className="mt-4 w-[90%] lg:text-center text-richblack-300 text-lg">
                    With our online coding courses, you can learn at your own
                    pace, from anywhere in the world, and get access to a wealth
                    of resources, including hands-on projects, quizzes, and
                    personalized feedback from instructors.
                </div>

                <div className="flex flex-row w-full justify-center lg:gap-7 gap-3 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>
                        Book a Demo
                    </CTAButton>
                </div>

                {/* video file */}
                <div className="mx-3 my-12 shadow-lg shadow-blue-200">
                    <video muted loop autoPlay src={Banner} className="z-10"></video>
                </div>

                {/* Code section 1 */}

                <div className="w-full">
                    <CodeBlocks
                        position={"lg:flex-row flex-col"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your
                                <HighlightText text={" Coding potential "} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            text: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            text: "Learn More",
                            linkto: "/signup",
                            active: false,
                        }}
                        codeblocks={`<!DOCTYPE html>\n<html>\n<head>\n\t<title>Example</title>\n\t<link rel='stylesheet' href='styles.css' />\n<head>\n<body>\n\t<h1>\n\t\t<a href='/'>Header</a>\n\t</h1>\n</body>\n</html>`}
                        codeColor={"text-yellow-200"}
                        backgroupGradient={`bg-custom-gradient-yellow`}
                    />
                </div>

                {/* Code section 2 */}

                <div className="w-full">
                    <CodeBlocks
                        position={"lg:flex-row-reverse flex-col"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start
                                <HighlightText text={" coding in seconds "} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            text: "Continue Lession",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            text: "Learn More",
                            linkto: "/signup",
                            active: false,
                        }}
                        codeblocks={`<!DOCTYPE html>\n<html>\n<head>\n\t<title>Example</title>\n\t<link rel='stylesheet' href='styles.css' />\n<head>\n<body>\n\t<h1>\n\t\t<a href='/'>Header</a>\n\t</h1>\n</body>\n</html>`}
                        codeColor={"text-blue-200"}
                        backgroupGradient={`bg-custom-gradient-blue`}
                    />
                </div>

                {/* Explore more */}

                <ExploreMore />
            </div>



            {/*Section 2  */}

            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage-bg lg:h-[310px] h-[100px]">
                    <div className="w-11/12 max-w-maxContent flex items-center justify-center h-full gap-5 mx-auto">
                        <CTAButton active={true} linkto={"/catalog"}>
                            <div className="flex items-center gap-3">
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/learn-more"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>

                <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-10">
                    <div className="flex lg:flex-row flex-col gap-5 justify-between lg:mt-[95px] mt-[20px]">
                        <div className="text-4xl font-semibold lg:w-[45%]">
                            Get the Skills you need for a 
                            <HighlightText text={" Job that is in demand"} />
                        </div>

                        <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                            <div className="text-[160x]">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={'/signup'}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection />

                    <LearningLanguageSection />

                </div>

                

            </div>

            {/*Section 3  */}

            <div className="w-11/12 mx-auto max-w-maxContent flex items flex-col justify-between items-center bg-richblack-900">
                <InstructorSection />

                <h2 className="text-center text-4xl font-semibold mt-24 mb-24">Review form Other Learners</h2>

                {/* Review Slider */}
                <div className="w-full flex justify-center">
                    <ReviewSlider />
                </div>
                
            </div>

            {/*Footer  */}
            <Footer />
        </div>
    );
};

export default Home;
