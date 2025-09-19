import React, { useState, useEffect } from "react";


const profilesData = [
  {
    name: "Diouf O",
    role: "Senior iOS Developer",
    company: "Apple",
    companyPrefix: "Worked at",
    image: "https://talrn.com/uploads/Diouf_TALF3527_Talrn.webp",
    link: "https://talrn.com/profile/senior-ios-developer-diouf-o/talf3519",
  },
  {
    name: "Fawaz A",
    role: "Senior Software Engineer",
    company: "Share",
    companyPrefix: "Worked at",
    image: "https://talrn.com/uploads/Fawaz_TALF3835_Talrn.webp",
    link: "https://talrn.com/profile/senior-software-engineer-fawaz-a/talf3835",
  },
  {
    name: "Kumar J",
    role: "Senior iOS Developer",
    company: "McDonald’s",
    companyPrefix: "Worked on",
    image: "https://talrn.com/uploads/New_photo.png",
    link: "https://talrn.com/profile/sr-ios-developer-kumar-j/talf355",
  },
  {
    name: "Thummar B",
    role: "iOS Development",
    company: "Capgemini",
    companyPrefix: "Worked at",
    image: "https://talrn.com/uploads/Photograph-removebg-preview-2.png",
    link: "https://talrn.com/profile/ios-development-thummar-b/talf1111",
  },
  {
    name: "Garg R",
    role: "Senior iOS Developer",
    company: "PayTM",
    companyPrefix: "Worked on",
    image: "https://talrn.com/uploads/Garg_TALF3302_Talrn.webp",
    link: "https://talrn.com/profile/senior-ios-developer-garg-r/talf3302",
  },
  {
    name: "Pradhan R",
    role: "Lead iOS Developer",
    company: "Standard Chartered",
    companyPrefix: "Worked on",
    image: "https://talrn.com/uploads/Pradhan_TALF2186_Talrn.webp",
    link: "https://talrn.com/profile/lead-ios-developer-pradhan-r/talf2186",
  },
];

export default function ProfileCards() {
  const [profiles, setProfiles] = useState(profilesData);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
    }, 2500); // cycle every 2.5s
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    setAnimating(false);
    setProfiles((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const ProfileCard = ({ name, role, company, companyPrefix, image, link }) => (
      <div className="item">
        <a target="_blank" rel="noopener noreferrer" href={link}>
          <div className="relative bg-white shadow-lg rounded-3xl text-start w-[210.47px] h-[322px]">
            <img
              className="relative top-0 left-0 rounded-t-lg w-full h-[226.23px] object-cover"
              alt={name}
              src={image}
              onError={(e) =>
                (e.currentTarget.src = "https://talrn.com/assets/img/noimage.jpg")
              }
            />
            <div className="relative font-bold text-[15px] text-black mx-[10px]">
              {name}
            </div>
            <div className="relative mx-[10px] mb-[10px] text-[85%] font-semibold leading-[18px] break-words">
              {role}
            </div>
            <div className="relative text-[15px] text-[#60697b] mx-[10px] mb-[10px] font-normal font-[Poppins]">
              {companyPrefix} <b>{company}</b>
            </div>
          </div>
        </a>
      </div>
    );
  

  return (
    <div className="relative  w-1/2 h-[380px] pt-[30px] pl-[25px]">
      <div  
        className={`flex gap-4 ${
          animating ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: animating ? "translateX(-50px)" : "translateX(0)",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {profiles.map((profile, idx) => (
          <div key={`${profile.name}-${idx}`} className={idx === 0 && animating ? "animate-bob-up" : ""}>
            <ProfileCard {...profile} />
          </div>
        ))}
      </div>
    </div>
  );
}
