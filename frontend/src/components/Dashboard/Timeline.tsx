import { Entry } from "../../types/entry";
import EntryCard from "./EntryCard";

interface TimelineProps {
  entries: Entry[];
}

const Timeline = ({ entries }: TimelineProps) => {
  if (entries.length === 0) return null;
  
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.isUnlocked && !b.isUnlocked) return -1;
    if (!a.isUnlocked && b.isUnlocked) return 1;
    return new Date(a.unlockAt).getTime() - new Date(b.unlockAt).getTime();
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedEntries.map((entry, index) => (
        <div 
          key={entry._id} 
          className="opacity-0 animate-fadeIn" 
          style={{ 
            animationDelay: `${index * 0.1}s`, 
            animationFillMode: 'forwards',
            animation: 'fadeIn 0.5s forwards' 
          }}
        >
          <EntryCard entry={entry} />
        </div>
      ))}
    </div>
  );
};


export default Timeline;