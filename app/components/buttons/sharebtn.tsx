import React from "react";

const ShareButton: React.FC = () => {
  const handleShare = async () => {
    const url = window.location.href; // Get the current URL
    const title = "Check this out!";
    const text = "I found something interesting, take a look!";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log("Link shared successfully");
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying link to clipboard:", error);
        alert("Could not copy the link.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Share Link
    </button>
  );
};

export default ShareButton;
