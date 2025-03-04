import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import Typewriter from "../../../libraries/Typewriter";

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblocks,
    backgroupGradient,
    codeColor,
}) => {
    return (
        <div className={`flex ${position} lg:my-20 my-10 lg:justify-between gap-10 relative`}>
            {/* Section 1 */}
            <div className="lg:w-[45%] flex flex-col lg:gap-8 gap-3">
                {heading}
                <div className="text-richblack-300 font-bold">{subheading}</div>
                <div className="flex flex-row justify-center lg:justify-start lg:gap-7 gap-3 mt-5">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn2.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className="relative lg:w-[45%] flex ;g:max-w-[50%] text-[16px] bg-gradient-to-r from-[#080c14] via-[#0d1521] to-[#141a23] opacity-24 p-5 bg-transparent z-10">
                {/* HW - BG Gradient */}
                <div className={`absolute top-[-60px] left-[-50px] w-[372px] h-[257px] opacity-20 ${backgroupGradient} rounded-full blur-3xl`}></div>

                <div className="w-[10%] flex flex-col text-center text-richblack-600 font-inter font-bold border-r-2">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
                <div
                    className={`w-[90%] whitespace-pre-wrap break-words flex flex-col gap-2 font-bold text-richblack-400 ${codeColor} pr-2 ml-2 z-50`}
                >
                    <Typewriter
                        text={codeblocks}
                        delay={100}
                        infinite={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
