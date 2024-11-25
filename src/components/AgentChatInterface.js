"use client";

export default function AgentChatInterface() {
  return (
    <div style={{ 
      width: '100%',
      height: '100vh',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '0',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <iframe
        src="https://varun324242-agens.hf.space"
        style={{ 
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: '0 auto',
          minHeight: '100%',
          minWidth: '100%',
          '@media (max-width: 768px)': {
            height: 'calc(100vh - 56px)' // Adjust for mobile header
          },
          '@media (min-width: 769px) and (max-width: 1024px)': {
            height: 'calc(100vh - 64px)' // Adjust for tablet header
          },
          '@media (min-width: 1025px)': {
            maxWidth: '1440px' // Max width on large screens
          }
        }}
        title="AI Agent Interface"
      />
    </div>
  );
}
