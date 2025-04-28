import { Entry } from "../../types/entry";
import EntryCard from "./EntryCard";

const Timeline = ({ entries }: { entries: Entry[] }) => {
  const today = new Date();

  const todaysEntries = entries.filter((entry) => {
    const unlockDate = new Date(entry.unlockAt);
    return unlockDate.toDateString() === today.toDateString();
  });

  const upcomingEntries = entries.filter((entry) => {
    const unlockDate = new Date(entry.unlockAt);
    return unlockDate > today;
  });

  const pastEntries = entries.filter((entry) => {
    const unlockDate = new Date(entry.unlockAt);
    return unlockDate < today;
  });

  return (
    <div className="flex flex-col gap-16">
      
      {/* Today's Entries */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Today’s Entries</h2>
        {todaysEntries.length === 0 ? (
          <p className="text-center text-gray-300">No entries unlocking today 🌟</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todaysEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Entries */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Entries</h2>
        {upcomingEntries.length === 0 ? (
          <p className="text-center text-gray-300">No upcoming entries 📅</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
          </div>
        )}
      </div>

      {/* Past Entries */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Past Entries</h2>
        {pastEntries.length === 0 ? (
          <p className="text-center text-gray-300">No past echoes yet 🔮</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Timeline;
