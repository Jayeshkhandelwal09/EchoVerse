import { useState, useRef, useEffect } from "react";
import { createEntry } from "../../api/entries";
import { toast } from "react-hot-toast";

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

interface EntryFormData {
  title: string;
  mood: string;
  unlockAt: string;
  audio: File | null;
}

const UploadModal = ({ onClose, onUploadSuccess }: UploadModalProps) => {
  const [formData, setFormData] = useState<EntryFormData>({
    title: "",
    mood: "",
    unlockAt: "",
    audio: null,
  });
  const [loading, setLoading] = useState(false);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingPermission, setRecordingPermission] = useState<boolean | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    checkMicrophonePermission();
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingPermission(true);
    } catch (err) {
      console.error("Microphone permission denied:", err);
      setRecordingPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], "recording.webm", { 
          type: "audio/webm",
          lastModified: Date.now() 
        });
        
        setFormData(prev => ({ ...prev, audio: audioFile }));
        
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioPreview(audioUrl);
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      let seconds = 0;
      timerRef.current = window.setInterval(() => {
        seconds++;
        setRecordingTime(seconds);
      }, 1000);
      
    } catch (err) {
      console.error("Error starting recording:", err);
      toast.error("Could not access microphone");
      setRecordingPermission(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files?.[0] || null;
      setFormData((prev) => ({ ...prev, audio: file }));
      
      if (file) {
        const url = URL.createObjectURL(file);
        setAudioPreview(url);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.mood || !formData.unlockAt || !formData.audio) {
      toast.error("Please fill all fields properly.");
      return;
    }

    try {
      setLoading(true);
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("mood", formData.mood);
      submitFormData.append("unlockAt", formData.unlockAt);
      submitFormData.append("audio", formData.audio);

      await createEntry(submitFormData);
      toast.success("Message sent to your future self!");
      onUploadSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const moodOptions = ["😊 Happy", "😌 Calm", "🤔 Thoughtful", "🥳 Excited", "😢 Sad", "😴 Tired", "❤️ Loving", "😎 Cool"];

  const today = new Date();
  const minDate = today 
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/90 p-1 rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Message to Future You</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/80 text-sm mb-1 block">How would you title this moment?</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., My Big Promotion Day"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring focus:ring-purple-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-1 block">How are you feeling right now?</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {moodOptions.map(mood => {
                  const moodEmoji = mood.split(' ')[0];
                  return (
                    <button 
                      key={mood}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mood: moodEmoji }))}
                      className={`p-2 text-center rounded-lg transition ${formData.mood === moodEmoji ? 'bg-purple-600 text-white' : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'}`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-1 block">When should this message unlock?</label>
              <input
                type="datetime-local"
                name="unlockAt"
                value={formData.unlockAt}
                min={formatDateForInput(minDate)}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring focus:ring-purple-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-1 block">Your voice message</label>
              
              {/* Voice recorder UI */}
              <div className="mb-4 rounded-xl overflow-hidden">
                {recordingPermission === false ? (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-center">
                    <p className="text-white text-sm">Microphone access is required for recording.</p>
                    <button
                      type="button"
                      onClick={checkMicrophonePermission}
                      className="mt-2 px-4 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30"
                    >
                      Allow Access
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-800/40 border border-gray-700 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white text-sm">
                        {isRecording ? (
                          <div className="flex items-center">
                            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                            Recording: {formatTime(recordingTime)}
                          </div>
                        ) : (
                          "Record a voice message"
                        )}
                      </div>
                      
                      {isRecording ? (
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                        >
                          <span className="w-3 h-3 inline-block rounded bg-white mr-2"></span>
                          Stop
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={startRecording}
                          disabled={!recordingPermission}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="mr-2">🎙️</span>
                          Record
                        </button>
                      )}
                    </div>
                    
                    {isRecording && (
                      <div className="mt-2">
                        <div className="flex justify-between space-x-1 h-8 items-end">
                          {/* Audio visualization bars (animation only) */}
                          {[...Array(20)].map((_, i) => (
                            <div 
                              key={i}
                              className="bg-purple-500/80 rounded-sm w-1"
                              style={{ 
                                height: `${20 + Math.random() * 60}%`,
                                animationDuration: `${0.2 + Math.random() * 0.3}s`,
                                animationDelay: `${i * 0.05}s`,
                                animation: 'bounce 0.5s ease infinite alternate'
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Option to upload file directly */}
              <div className="flex items-center justify-between mb-2">
                <div className="h-px bg-gray-700 flex-grow"></div>
                <span className="px-3 text-xs text-gray-400">OR</span>
                <div className="h-px bg-gray-700 flex-grow"></div>
              </div>
              
              <input
                type="file"
                name="audio"
                accept="audio/*"
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring focus:ring-purple-500/20 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
              
              {audioPreview && (
                <div className="mt-3 p-3 bg-gray-800/30 rounded-xl">
                  <audio controls src={audioPreview} className="w-full" />
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition flex items-center justify-center"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
                ) : "Send to Future"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;