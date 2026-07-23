import React, { useEffect, useRef, useState } from "react";

const ReelCard = ({ productImg, videoSrc, caption, position, onClick }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // Desktop / pointer devices: video plays only while the cursor is
  // over the card, and stays muted unless the speaker icon is clicked.
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      /* autoplay can be blocked before user interaction - safe to ignore */
    });
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    if (position === "0") {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [position]);

  const isYoutube =
    videoSrc &&
    (videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be"));

  const getYoutubeEmbed = (url) => {
    let id = "";

    if (url.includes("/shorts/")) {
      id = url.split("/shorts/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      id = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      id = url.split("youtu.be/")[1].split("?")[0];
    }

    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
  };

  return (
    <div className="reel-card" data-pos={position} onClick={onClick}>
      <div className="reel-card-img">
        {isYoutube ? (
          <iframe
            className="reel-card-video"
            src={getYoutubeEmbed(videoSrc)}
            title={caption}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            className="reel-card-video"
            src={videoSrc}
            poster={productImg}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}

        <span className="reel-brand-tag">Fly Birds</span>

      </div>

      <div className="reel-card-footer">
        <p>{caption}</p>
        <span className="reel-add-icon">
          <i className="fa fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default ReelCard;
