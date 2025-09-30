"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Link from "next/link";

const images = [
	"https://res.cloudinary.com/dgulr1hgd/image/upload/v1758711344/COVID19-ViewFromIndia-InsurTechKeepIinsurersHealthy-Anoop-bg-w_akwzeo.jpg",

	"https://res.cloudinary.com/dk0smdu0d/image/upload/v1756832508/hospital-background-website-ai-generative_895799-9228_rcyaox.jpg",
	"https://res.cloudinary.com/dk0smdu0d/image/upload/v1756832584/360_F_487692869_V8MZ1hLvhXQZKT50EV8Sh13AkdibGJb3_i7yw5p.jpg",
	"https://res.cloudinary.com/dgulr1hgd/image/upload/v1758711343/health-insurance-bg_jv8kmk.webp",
];

const Carousel = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: false,
		arrows: false,
	};

	return (
		<div className="w-screen h-[calc(100vh/2)] lg:h-screen relative overflow-hidden">
			<Slider {...settings}>
				{images.map((src, index) => (
					<div key={index} className="relative  h-[calc(100vh/2)] lg:h-full">
						<Image
							src={src}
							alt={`Slide ${index + 1}`}
							height={1080}
							width={1920}
							className=" h-full lg:h-screen w-screen object-cover rounded-md shadow-md invert-10"
							priority={index === 0}
						/>
					</div>
				))}
			</Slider>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
				viewport={{ once: true }}
				className="absolute top-1/3 lg:top-2/5 left-0 md:left-12 lg:left-24 ml-6 sm:ml-12 p-4 sm:p-8 max-w-xl w-full">
				<h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-2">
					UNITY LIFE <span className="text-white">HEALTH CARE (ULHC)</span>
				</h1>

				<p className="font-medium text-sm sm:text-base md:text-lg text-white mb-4 max-w-md">
					With ULHC, you’re not just a cardholder — you’re part of a healthcare
					movement. We provide affordable healthcare solutions with genuine
					savings and trusted medical support for individuals and families.
				</p>

				<Link
					href="/about"
					className="inline-block bg-[#045e5a] hover:bg-[#045e5a]/80 text-white font-semibold text-sm sm:text-base px-5 py-2 rounded-md shadow-md transition duration-300">
					Read More
				</Link>
			</motion.div>

			<style jsx global>{`
				.slick-dots li button:before {
					color: orange !important;
					font-size: 6px;
					opacity: 1 !important;
				}
				.slick-dots li.slick-active button:before {
					color: #ff6600 !important;
				}
			`}</style>
		</div>
	);
};

export default Carousel;
