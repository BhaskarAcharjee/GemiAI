import React, { useContext, useState, useEffect, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setProfileOpen(false); // Close profile popup if dropdown is toggled
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setDropdownOpen(false); // Close dropdown if profile is toggled
  };

  const handleCardClick = (text) => {
    setInput(text);
  };

  return (
    <div className="main">
      <div className="nav">
        <div className="nav-gemini">
          <p onClick={toggleDropdown}>GemiAI</p>
          <img
            className="dropdown-arrow"
            src={assets.dropdown_icon}
            alt="dropdown arrow"
            onClick={toggleDropdown}
          />
        </div>
        <img
          src={assets.dummy_icon}
          alt="Profile"
          onClick={toggleProfile}
          ref={profileRef}
        />
        {dropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <p>GemiAI</p>
            <p>GemiAI Advanced</p>
          </div>
        )}
        {profileOpen && (
          <div className="profile-menu" ref={profileRef}>
            <div className="nav-gemini">
              <p>Sign in</p>
              <img
                className="dropdown-arrow"
                src={assets.signin_icon}
                alt="dropdown arrow"
              />
            </div>
          </div>
        )}
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Briefly summarize this concept: urban planning"
                  )
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Improve the readability of the following code"
                  )
                }
              >
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.dummy_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its response. <u>Your privacy and Gemini Apps</u>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
