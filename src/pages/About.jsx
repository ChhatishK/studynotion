import React from 'react'

import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../components/cores/AboutPage/Quote';

import StatsComponent from '../components/cores/AboutPage/Stats';

import FoundingStory from '../assets/Images/FoundingStory.png';
import LearningGrid from '../components/cores/AboutPage/LearningGrid';

import ContactFormSection from '../components/cores/AboutPage/ContactFormSection';

import Footer from '../components/cores/Footer/Footer'

const About = () => {
  return (
    <div className='mx-auto'>
        {/* Section 1 */}
          {/* <div className='absolute left-0 right-0 h-[600px] bg-richblack-700'></div> */}
        <section className=''>
            <div className='relative h-[513px] bg-richblack-700'>
                <header className='flex flex-col text-4xl text-center pt-20 font-semibold'>
                    <span className=''>Driving Innovation in Online Education for a</span> 
                    <span className='text-gradient'>Brighter Future</span>
                </header>

                  <p className='mx-auto mt-2 text-base text-richblack-300 text-center w-[820px] font-semibold'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                <div className='absolute flex w-full justify-center gap-x-10 mx-auto -bottom-28'>
                  <img src={BannerImage1} alt="" />
                  <img src={BannerImage2} alt="" />
                  <img src={BannerImage3} alt="" />
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section>
          <div>
            <Quote></Quote>
          </div>
        </section>

        <div className='w-full h-[0.3px] my-20 bg-richblack-700'></div>

        {/* Section 3 */}
        <section>
          <div className='flex flex-col'>
            <div className='flex w-full mx-auto gap-20'>
              <div className='flex flex-col gap-9 w-[45%]'>
                <h1 className='red-gradient text-4xl'>Our Founding Story</h1>
                <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible flexible, and high-quality learning opportunities in a rapidly evolving digital</p>

                <p>As experienced educators ourselves, we witnessed firsthand the limitations and challlenges of partitional education systems. We believed that education should not be confined at the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>

              </div>
              <div className='w-[45%]'>
                <img src={FoundingStory} />
              </div>
            </div>

            {/* Vision and mission parent div */}
            <div className='flex'>
            {/* left box */}

            <div>
              <h1>Our Vision</h1>
              <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>

            {/* right box */}

            <div>
              <h1>Our Mission</h1>
              <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>

            </div>
          </div>
        </section>

        {/* Section 4 */}
        <StatsComponent />

        {/* Section 5 */}
        <section className='flex flex-col justify-center items-center mb-[150px]'>
          <LearningGrid />
          <ContactFormSection />
        </section>

        <section>
          <div>
            <h2>Review from other learners</h2>
            {/* <ReviewSlider /> */}
          </div>
        </section>

        <Footer />

    </div>
  )
}

export default About