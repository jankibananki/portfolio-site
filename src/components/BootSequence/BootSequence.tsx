
import { useEffect, useState } from 'react';
import './BootSequence.css';

type BootSequenceProps = {
  onComplete: () => void;
};

const bootLines = [
  'PS C:\\Users\\visitor> npm install jana.exe',
  '',
  '> resolving dependencies...',
  '> fetching personality modules...',
  '',
  '+ creativity@latest',
  '+ curiosity@999.0.0',
  '+ cybersecurity@1.0.0',
  '+ caffeine@999.0.0',
  '+ five-dogs@5.0.0',
  '',
  '> building portfolio...',
  '> initializing projects...',
  '> loading interactive experiences...',
  '',
  '✓ added 5 personality modules',
  '✓ portfolio initialized successfully',
  '',
  'PS C:\\Users\\visitor> start jana.exe',
];

export default function BootSequence({
  onComplete,
}: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const timeout = window.setTimeout(onComplete, 900);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setVisibleLines((previous) => previous + 1);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [visibleLines, onComplete]);

  const progress = Math.round(
    (visibleLines / bootLines.length) * 100
  );

  return (
    <div className="boot-screen">
      <div className="boot-terminal">
        <div className="boot-header">
          <span>✦ jana.exe // initialization</span>

          <button
            className="boot-skip"
            onClick={onComplete}
            type="button"
          >
            SKIP [ESC]
          </button>
        </div>

        <div
          className="boot-output"
          role="log"
          aria-label="Portfolio initialization"
        >
          {bootLines.slice(0, visibleLines).map((line, index) => (
            <div
              className={
                line.startsWith('+')
                  ? 'boot-line boot-line--package'
                  : line.startsWith('✓')
                    ? 'boot-line boot-line--success'
                    : 'boot-line'
              }
              key={index}
            >
              {line || '\u00A0'}
            </div>
          ))}

          <span className="boot-cursor" aria-hidden="true">
            ▋
          </span>
        </div>

        <div className="boot-progress-section">
          <div className="boot-progress-info">
            <span>INSTALLING JANA.EXE</span>
            <span>{progress}%</span>
          </div>

          <div
            className="boot-progress-track"
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="boot-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="boot-footer">
            SYSTEM STATUS: {progress === 100 ? 'READY' : 'LOADING...'}
          </p>
        </div>
      </div>
    </div>
  );
}
