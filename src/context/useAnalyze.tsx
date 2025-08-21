import { createContext, use, useState } from 'react';

const AnalyzeContext = createContext(null);

export function AnalyzeProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState(null);
  const [changeFlex, setChangeFlex] = useState(false);
  const [fromNavbar, setFromNavbar] = useState(false);
  const [ideaGenTab, setIdeaGenTab] = useState('top-stocks');

  return (
    <AnalyzeContext
      value={{
        isExpanded,
        setIsExpanded,
        data,
        setData,
        changeFlex,
        setChangeFlex,
        fromNavbar,
        setFromNavbar,
        ideaGenTab,
        setIdeaGenTab,
      }}
    >
      {children}
    </AnalyzeContext>
  );
}

export function useAnalyze() {
  const context = use(AnalyzeContext);
  if (!context) throw new Error('useAnalyze must be used within AnalyzeProvider');
  return context;
}
