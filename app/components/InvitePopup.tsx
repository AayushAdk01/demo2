// components/InvitePopup.js
import React from "react";

interface InvitePopupProps {
  onClose: () => void;
  inviteLink: string;
}

const InvitePopup: React.FC<InvitePopupProps> = ({ onClose, inviteLink }) => {
  console.log("Popup is rendering"); // Add this line to debug
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Invite Friends</h2>
        <p>Share this link with your friends to invite them:</p>
        <input
          type="text"
          value={inviteLink}
          readOnly
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InvitePopup;