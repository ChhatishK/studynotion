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
                            <p>About</p>
                        </Link>
                        <Link to={"/careers"}>
                            <p>Careers</p>
                        </Link>
                        <Link to={"/affiliates"}>
                            <p>Affiliates</p>
                        </Link>

                        <div className="flex gap-3">
                            <Link to={`/instagram`}>
                                <FaInstagram size={20} />
                            </Link>
                            <Link to={`/facebook`}>
                                <FaFacebook size={20} />
                            </Link>
                            <Link to={`/google`}>
                                <FaGoogle size={20} />
                            </Link>
                            <Link to={`/twitter`}>
                                <FaTwitter size={20} />
                            </Link>
                            <Link to={`/youtube`}>
                                <FaYoutube size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Resources and Support */}

                    <div className="flex flex-col gap-8">
                        <div className="mt-1 flex flex-col gap-1">
                            <span className="text-richblack-5">Resources</span>
                            <Link to="/articles">Articles</Link>
                            <Link to="/blogs">Blog</Link>
                            <Link to="/chart-sheet">Chart Sheet</Link>
                            <Link to="/code-challenges">Code Challenges</Link>
                            <Link to="/docs">Docs</Link>
                            <Link to="/projects">Projects</Link>
                            <Link to="/videos">Videos</Link>
                            <Link to="/workspaces">Workspaces</Link>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-richblack-5">Support</span>
                            <Link to="/help-center">Help Center</Link>
                        </div>
                    </div>

                    {/* Plans and Community */}
                    <div className="flex flex-col gap-8">
                        <div className="mt-1 flex flex-col gap-1">
                            <span className="text-richblack-5">Plans</span>
                            <Link to="/paid-memberships">Pain Memberships</Link>
                            <Link to="/for-students">For Students</Link>
                            <Link to="/business-solutions">
                                Business Solutions
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-richblack-5">Community</span>
                            <Link to="/forums">Forums</Link>
                            <Link to="/chapters">Chapters</Link>
                            <Link to="/events">Events</Link>
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
                    <Link to='/privacy-policy'>Privacy Policy</Link>
                    <Link to='/cookie-policy'>Cookie Policy</Link>
                    <Link to='/terms'>Terms</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
