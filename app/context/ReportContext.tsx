'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Report {
  id: string;
  issue_type: string;
  description: string;
  status: string;
  upvote_count: number;
  lat: number;
  lng: number;
  created_at: string;
}

interface ReportContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
  reports: Report[];
  setReports: (reports: Report[]) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [reports, setReports] = useState<Report[]>([]);

  const triggerRefresh = () => {
    console.log('🔄 Context: triggerRefresh called, current value:', refreshTrigger);
    setRefreshTrigger(prev => {
      const newVal = prev + 1;
      console.log('🔄 Context: new refreshTrigger value:', newVal);
      return newVal;
    });
  };

  return (
    <ReportContext.Provider value={{ refreshTrigger, triggerRefresh, reports, setReports }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
}
