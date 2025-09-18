import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const LoginCarousel = () => {
  const { t } = useTranslation();

  const slides = [
    {
      titleKey: "loginCarousel.slide0.title",
      bodyKey: "loginCarousel.slide0.body",
    },
    {
      titleKey: "loginCarousel.slide1.title",
      bodyKey: "loginCarousel.slide1.body",
    },
    {
      titleKey: "loginCarousel.slide2.title",
      bodyKey: "loginCarousel.slide2.body",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  //Functions for changing the text indices
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  //Timer that decides when the text automatically changes
  useEffect(() => {
    const intervalId = setInterval(handleNext, 8000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [handleNext]);

  return (
    //Containters for the texts
    <div className="flex flex-row h-screen relative">
      <div className="flex flex-row">
        <div className="flex items-center p-1 sm:px-4">
          {/*Button for changing the text to the previous index*/}
          <button onClick={handlePrevious}>
            <ChevronLeftIcon className="w-9 h-9 p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white" />
          </button>
        </div>

        {/*Inclusion of the text itself*/}
        <div className="flex items-center">
          <div className="py-10 parent-container relative">
            <div
              key={`slide-${currentIndex}`}
              className="p-4 px-8 sm:px-0 self-stretch text-center text-sky-50 text-[32px] font-bold font-['Montserrat']"
            >
              {t(slides[currentIndex].titleKey)}
              <div className="self-stretch text-center text-sky-50 text-lg font-bold font-['Montserrat']">
                {t(slides[currentIndex].bodyKey)}
              </div>
            </div>
            <div className="child-container right-0 left-0 justify-center absolute bottom-0">
              {/*Dots indicating the text index*/}
              <div className="flex right-0 left-0 items-center justify-center space-x-2">
                {slides.map((s, i) => (
                  <div
                    key={`dot-${s.titleKey}`}
                    className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${currentIndex === i ? "p-2" : "bg-opacity-50"}
            `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*Button for changing the text to the next index*/}
        <div className="flex items-center p-1 sm:px-4">
          <button onClick={handleNext}>
            <ChevronRightIcon className="items-center w-9 h-9 p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCarousel;
