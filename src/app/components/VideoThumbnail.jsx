import React from "react";

const VideoThumbnail = ({ videoLink }) => {
  if (!videoLink) {
    return <div className="text-center text-gray-500">No video available</div>;
  }

  // Function to extract YouTube video ID
  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoLink);

  if (!videoId) {
    return <div className="text-center text-red-500">Invalid video link</div>;
  }

  const embedLink = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="relative w-full">
      <iframe
        className="rounded-lg shadow-lg w-full"
        src={embedLink}
        title="Embedded YouTube Video"
        style={{ aspectRatio: "16 / 9", height: "auto", width: "100%" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoThumbnail;
