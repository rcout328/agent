"use client";

export default function AgentChatInterface() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://varun324242-agent.hf.space"
        className="w-full h-full"
        title="AI Agent Interface"
        style={{ 
          border: 'none',
          background: 'transparent'
        }}
      />
    </div>
  );
} 