"use client";

import Image from "next/image";
import { Instagram, Play } from "lucide-react";

type InstagramPost =
  | {
      id: number;
      type: "image";
      src: string;
      link: string;
    }
  | {
      id: number;
      type: "video";
      src: string;
      thumbnail: string;
      link: string;
    };
    

const mockPosts: InstagramPost[] = [  {
    id: 1,
    type: "image",
    src: "/images/bangles.jpg",
    link: "https://www.instagram.com/rani_designer_hut/",
  },
  {
    id: 2,
    type: "video",
    src: "/videos/video-1.mp4", // add small reel video here
    thumbnail: "/images/bangles.jpg",
    link: "https://www.instagram.com/rani_designer_hut/",
  },
  {
    id: 3,
    type: "image",
    src: "/images/bracelet.jpg",
    link: "https://www.instagram.com/rani_designer_hut/",
  },
  {
    id: 4,
    type: "video",
    src: "/videos/video-2.mp4",
    thumbnail: "/images/insta4.jpg",
    link: "https://www.instagram.com/rani_designer_hut/",
  },
  {
    id: 5,
    type: "image",
    src: "/images/earrings.jpg",
    link: "https://www.instagram.com/rani_designer_hut/",
  },
  {
    id: 6,
    type: "video",
   src: "/videos/video-3.mp4",
    thumbnail: "/images/insta4.jpg",
    link: "https://www.instagram.com/rani_designer_hut/",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-24 bg-[#f8f5f0]">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="tracking-[6px] text-xs uppercase text-gray-500">
            Follow Our Journey
          </p>

          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-black">
            @rani_designer_hut
          </h2>

          <div className="w-24 h-[2px] bg-[#B9AA52] mx-auto mt-6"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {mockPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
className="relative group overflow-hidden aspect-square border border-transparent hover:border-[#B9AA52] transition duration-300"            >

              {/* IMAGE POST */}
              {post.type === "image" && (
                <Image
                  src={post.src}
                  alt="Instagram Post"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full group-hover:scale-110 transition duration-700"
                />
              )}

              {/* VIDEO POST */}
             {post.type === "video" && (
  <div
    className="relative"
    onMouseEnter={(e) => {
      const video = e.currentTarget.querySelector("video");
      video?.play();
    }}
    onMouseLeave={(e) => {
      const video = e.currentTarget.querySelector("video");
      video?.pause();
    }}
  >
    {/* Thumbnail Image (Visible by default) */}
    {/* <Image
      src={post.thumbnail}
      alt="Instagram Reel"
      width={500}
      height={500}
      className="object-cover w-full h-full absolute inset-0 group-hover:opacity-0 transition duration-300"
    /> */}

    {/* Video */}
    <video
      src={post.src}
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />

    {/* Play Icon (Visible until hover) */}
    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition duration-300">
      <div className="bg-black/60 p-3 rounded-full">
        <Play className="text-white w-6 h-6" />
      </div>
    </div>
  </div>
)}

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-4">

                {/* Animated Instagram Icon */}
                <Instagram className="text-white w-8 h-8 transform scale-75 group-hover:scale-110 transition duration-300" />

                <span className="text-white border border-[#B9AA52] px-6 py-2 tracking-wide">
                  View Post
                </span>

              </div>

            </a>
          ))}

        </div>

        {/* BUTTON */}
        <div className="text-center mt-16">
          <a
            href="https://www.instagram.com/rani_designer_hut/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-10 py-4 hover:bg-[#B9AA52] hover:text-black transition duration-300"
          >
            Visit Instagram
          </a>
        </div>

      </div>
    </section>
  );
}