import { useEffect, useState } from "react";
import { fetchEntries } from "../../api/entries";
import { Entry } from "../../types/entry";
import UploadModal from "./UploadModal";
import Timeline from "./Timeline";
import EmptyState from "./EmptyState";
import { toast } from "react-hot-toast";
import DarkModeToggle from "../Common/DarkModeToggle";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = "Welcome back to";
    if (hour < 12) newGreeting = "Good morning! Welcome to";
    else if (hour < 18) newGreeting = "Good afternoon! Welcome to";
    else newGreeting = "Good evening! Welcome to";
    setGreeting(newGreeting);

    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await fetchEntries();
      setEntries(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch your time capsules");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    loadEntries();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-600 dark:from-gray-900 dark:via-purple-950 dark:to-black px-4 sm:px-8 py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main content container with z-index to appear above decorative elements */}
      <div className="relative z-10">
        <div className="absolute top-6 right-6">
          <DarkModeToggle />

        
        </div>
        <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-4 py-2 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition backdrop-blur-md"
          >
            <span className="text-lg animate-bounce">👋</span>
            <span className="text-sm">Logout</span>
          </button>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 pt-8">
            <div className="flex items-center justify-center mb-3">
              <div className="text-4xl">🎵</div>
              <div className="mx-2 text-white/40">•</div>
              <div className="text-4xl">🔮</div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
              {greeting} <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">EchoVerse</span>
            </h1>
            <p className="text-white/70 max-w-lg mx-auto mb-6">
              Your personal audio time capsule. Record your thoughts today, hear them when the time is right.
            </p>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 font-bold rounded-xl transition transform hover:scale-105 shadow-lg hover:shadow-xl text-lg group flex items-center mx-auto"
            >
              <span className="mr-2 group-hover:rotate-12 transition-transform">🎙️</span>
              Create New Time Capsule
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : entries.length === 0 ? (
            <EmptyState onUpload={() => setUploadModalOpen(true)} />

          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-white">Your Time Capsules</h2>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
                  {entries.length} {entries.length === 1 ? 'capsule' : 'capsules'} waiting
                </div>
              </div>
              <Timeline entries={entries} />
            </>
          )}
        </div>
      </div>

      {uploadModalOpen && (
        <UploadModal
          onClose={() => setUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;