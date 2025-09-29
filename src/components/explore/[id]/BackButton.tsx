"use client"

import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export const BackButton = () => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back()
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent">
      <div className="flex h-12 items-center justify-between pr-2">
        <button 
        onClick={() => handleBack()}
        className="ml-4 p-2 mt-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
            <MoveLeft />
        </button>
      </div>
    </nav>
  );
};
