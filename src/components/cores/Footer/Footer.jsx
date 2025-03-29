import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import Logo from "../../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaTwitter,
    FaGoogle,
} from "react-icons/fa";
import FooterLink from "./FooterLink";

const Footer = () => {
    return (
        <div className="w-full bg-richblack-800 mt-3">
            <div className="mx-auto flex w-11/12 max-w-maxContent gap-7 pt-12 border-b-2 pb-9 border-richblack-700">
                {/* left side footer */}
                <div className="flex flex-wrap w-1/2 text-richblack-400 lg:justify-around">
                    {/* Company */}
                    <div className="text-md font-inter flex flex-col gap-1">
                        <Link to={`/`}>
                            <img src={Logo} alt="Logo of the website" />
                        </Link>
                        <p className="text-richblack-5 mt-2">Company</p>
                        <Link to={"/about"}>
                            <p className="hover:text-richblack-5">About</p>
                        </Link>
                        <Link to={"/careers"}>
                            <p className="hover:text-richblack-5">Careers</p>
                        </Link>
                        <Link to={"/affiliates"}>
                            <p className="hover:text-richblack-5">Affiliates</p>
                        </Link>

                        <div className="flex gap-3">
                            <Link to={`/instagram`} className="hover:text-richblack-5">
                                <FaInstagram size={20} />
                            </Link>
                            <Link to={`/facebook`} className="hover:text-richblack-5">
                                <FaFacebook size={20} />
                            </Link>
                            <Link to={`/google`} className="hover:text-richblack-5">
                                <FaGoogle size={20} />
                            </Link>
                            <Link to={`/twitter`} className="hover:text-richblack-5">
                                <FaTwitter size={20} />
                            </Link>
                            <Link to={`/youtube`} className="hover:text-richblack-5">
                                <FaYoutube size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Resources and Support */}

                    <div className="flex flex-col gap-8">
                        <div className="mt-1 flex flex-col gap-1">
                            <span className="text-richblack-5">Resources</span>
                            <Link to="/articles" className="hover:text-richblack-5">Articles</Link>
                            <Link to="/blogs" className="hover:text-richblack-5">Blog</Link>
                            <Link to="/chart-sheet" className="hover:text-richblack-5">Chart Sheet</Link>
                            <Link to="/code-challenges" className="hover:text-richblack-5">Code Challenges</Link>
                            <Link to="/docs" className="hover:text-richblack-5">Docs</Link>
                            <Link to="/projects" className="hover:text-richblack-5">Projects</Link>
                            <Link to="/videos" className="hover:text-richblack-5">Videos</Link>
                            <Link to="/workspaces" className="hover:text-richblack-5">Workspaces</Link>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-richblack-5">Support</span>
                            <Link to="/help-center" className="hover:text-richblack-5">Help Center</Link>
                        </div>
                    </div>

                    {/* Plans and Community */}
                    <div className="flex flex-col gap-8">
                        <div className="mt-1 flex flex-col gap-1">
                            <span className="text-richblack-5">Plans</span>
                            <Link to="/paid-memberships" className="hover:text-richblack-5">Pain Memberships</Link>
                            <Link to="/for-students" className="hover:text-richblack-5">For Students</Link>
                            <Link to="/business-solutions" className="hover:text-richblack-5">
                                Business Solutions
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-richblack-5">Community</span>
                            <Link to="/forums" className="hover:text-richblack-5">Forums</Link>
                            <Link to="/chapters" className="hover:text-richblack-5">Chapters</Link>
                            <Link to="/events" className="hover:text-richblack-5">Events</Link>
                        </div>
                    </div>
                </div>

                {/* right side footer */}
                <div className="w-1/2 flex flex-wrap text-richblack-400 lg:justify-around lg:border-l-2 border-richblack-700">
                    {FooterLink2.map((item, index) => {
                        return <FooterLink key={index} item={item} />;
                    })}
                </div>
            </div>

            <div className="w-full py-10 flex justify-center text-richblack-400">
                <div className="flex gap-4">
                    <Link to='/privacy-policy' className="hover:text-richblack-5 hover:underline">Privacy Policy</Link>
                    <Link to='/cookie-policy' className="hover:text-richblack-5 hover:underline">Cookie Policy</Link>
                    <Link to='/terms' className="hover:text-richblack-5 hover:underline">Terms</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
