interface EmptyStateProps {
    onUpload: () => void;
}

const EmptyState = ({ onUpload }: EmptyStateProps) => (
    <div className="flex flex-col items-center justify-center p-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl text-center">
        <div className="text-6xl mb-6">🎙️</div>
        <h2 className="text-2xl font-bold text-white mb-4">Your Time Capsule Awaits</h2>
        <p className="text-white/80 mb-6 max-w-md">
            Record your first voice message to your future self. What would you like to remember about today?
        </p>
        <button
            onClick={onUpload}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-xl transition transform hover:scale-105 hover:shadow-lg shadow-md"
        >
            <span className="flex items-center">
                <span className="mr-2">✨</span>
                Create Your First Memory
            </span>
        </button>
    </div>
);

export default EmptyState;