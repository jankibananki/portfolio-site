
import type { ReactNode } from 'react';
import './RetroWindow.css';

type RetroWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function RetroWindow({
  title,
  children,
  className = '',
}: RetroWindowProps) {
  return (
    <div className={`retro-window ${className}`}>
      <div className="retro-window__header">
        <span className="retro-window__title">
          ✿ {title}
        </span>

        <div className="retro-window__controls" aria-hidden="true">
          <span>─</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>

      <div className="retro-window__content">
        {children}
      </div>
    </div>
  );
}
