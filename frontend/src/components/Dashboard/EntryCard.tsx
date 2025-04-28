import { useState, useEffect } from "react";
import { Entry } from "../../types/entry";

interface EntryCardProps {
  entry: Entry;
}

// Array of encouraging messages for locked capsules
const lockedMessages = [
  "Your future self is going to love this!",
  "Good things come to those who wait ✨",
  "A memory preserved in time...",
  "This will be worth the wait!",
  "Your voice, traveling through time...",
  "A surprise waiting to be discovered!",
  "Future you says thanks for this gift!",
  "Your personal time machine at work...",
  "Patience is a virtue, and memories are treasures 💎",
  "Time capsule sealed with love 💌"
];

// Array of messages for unlocked capsules
const unlockedMessages = [
  "Your message has arrived from the past!",
  "A gift from your past self has unlocked ✨",
  "Memory unlocked! Press play to relive the moment",
  "Time travel complete! Listen to your past thoughts",
  "Your voice echo has returned to you",
  "The wait is over - your message is here!",
  "Your personal time capsule has opened 🎁",
  "A blast from the past, just for you",
  "Memory successfully delivered across time",
  "Your past self has a message for you ❤️"
];

const EntryCard = ({ entry }: EntryCardProps) => {
  const [randomMessage, setRandomMessage] = useState("");
  const isUnlockingSoon = !entry.isUnlocked &&
    new Date(entry.unlockAt).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const messageArray = entry.isUnlocked ? unlockedMessages : lockedMessages;
    const entryIdLastChar = entry._id.charAt(entry._id.length - 1);
    const messageIndex = parseInt(entryIdLastChar, 16) % messageArray.length;
    setRandomMessage(messageArray[messageIndex]);
  }, [entry.isUnlocked, entry._id]);

  // Function to calculate time remaining in a friendly format
  const getTimeRemaining = () => {
    const now = new Date();
    const unlockDate = new Date(entry.unlockAt);
    const diffMs = unlockDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} left`;
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
    } else {
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
    }
  };

  // Calculate progress percentage for the progressbar
  const calculateProgress = () => {
    if (entry.isUnlocked) return 100;

    const now = new Date().getTime();
    const createDate = new Date(entry.createdAt).getTime();
    const unlockDate = new Date(entry.unlockAt).getTime();
    const totalDuration = unlockDate - createDate;
    const elapsed = now - createDate;

    return Math.min(Math.floor((elapsed / totalDuration) * 100), 99);
  };

  // Random rotation for the decorative elements
  const randomRotation = entry._id.charCodeAt(0) % 6 - 3;

  return (
    <div className="bg-white/10 backdrop-blur-md dark:bg-gray-800/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border border-white/20 dark:border-purple-900/30 overflow-hidden relative">
      {/* Top decorative element */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500"></div>

      {/* Decorative corner elements */}
      <div className="absolute top-3 right-3 w-12 h-12 opacity-10 rounded-full bg-pink-300 blur-lg"></div>
      <div className="absolute bottom-3 left-3 w-16 h-16 opacity-10 rounded-full bg-indigo-300 blur-lg"></div>

      {/* Small decorative element */}
      <div
        className="absolute top-6 right-6 w-6 h-6 opacity-20 transform rotate-12"
        style={{ transform: `rotate(${randomRotation}deg)` }}
      >
        {entry.isUnlocked ? '✨' : '🔒'}
      </div>

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-white dark:text-white">{entry.title}</h3>
        <span className="text-2xl">{entry.mood}</span>
      </div>

      <div className="my-4">
        {entry.isUnlocked ? (
          <div className="bg-gray-900/30 p-3 rounded-xl relative">
            {entry.audioUrl && <audio controls src={entry.audioUrl} className="w-full" />}
            <div className="flex items-center justify-center mt-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mx-1 animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full mx-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full mx-1 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-sm text-white/80 mt-3 text-center italic">{randomMessage}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-900/20 rounded-xl relative overflow-hidden">
            {/* Background decoration for locked capsules */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-purple-300"
                  style={{
                    width: `${30 + i * 20}px`,
                    height: `${30 + i * 20}px`,
                    top: `${(i * 30) % 100}px`,
                    left: `${(i * 50) % 100}px`,
                    opacity: 0.3 - i * 0.1,
                    transform: `rotate(${i * 45}deg)`
                  }}
                ></div>
              ))}
            </div>

            <div className={`text-4xl mb-3 ${isUnlockingSoon ? "animate-bounce" : ""}`}>
              {isUnlockingSoon ? "🔓" : "🔒"}
            </div>
            <p className="text-white font-medium mb-1">
              {isUnlockingSoon ? "Almost Time!" : "Time Capsule Locked"}
            </p>
            <p className="text-sm text-white/70 mb-3">
              Unlocks on {new Date(entry.unlockAt).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>

            {/* Time remaining */}
            <div className="inline-block px-3 py-1 text-xs bg-gray-800/50 rounded-full text-white/80 mb-4">
              {getTimeRemaining()}
            </div>

            <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-1">
              <div
                className="bg-gradient-to-r from-green-300 to-green-500 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            <p className="text-xs text-white/70 mt-4 italic">
              {randomMessage}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-white/50 mt-4">
        <div>
          Created: {new Date(entry.createdAt).toLocaleDateString()}
        </div>
        {entry.isUnlocked ? (
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Unlocked
          </div>
        ) : (
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-1 animate-pulse"></span>
            Waiting
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryCard;