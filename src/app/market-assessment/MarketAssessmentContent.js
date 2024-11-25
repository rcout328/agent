"use client";

import { useState, useEffect, useRef } from 'react';
import { useStoredInput } from '@/hooks/useStoredInput';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MarketAssessmentContent() {
  const [userInput, setUserInput] = useStoredInput();
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const chartsRef = useRef(null);

  // Handle mounting and window resize
  useEffect(() => {
    setMounted(true);
    
    // Only access window after component is mounted
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Set initial width
      setWindowWidth(window.innerWidth);

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Function to get responsive font size
  const getFontSize = (base, medium, large) => {
    if (!mounted) return medium; // Default size during SSR
    if (windowWidth < 640) return base;
    if (windowWidth < 1024) return medium;
    return large;
  };

  // Base chart options
  const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9ca3af',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        color: '#9ca3af',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  // Get chart options with dynamic font sizes
  const getChartOptions = (title) => ({
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: {
        ...baseChartOptions.plugins.title,
        text: title,
        font: {
          size: getFontSize(12, 14, 16),
          weight: 'bold'
        }
      },
      legend: {
        ...baseChartOptions.plugins.legend,
        labels: {
          ...baseChartOptions.plugins.legend.labels,
          font: {
            size: getFontSize(10, 12, 14)
          }
        }
      }
    }
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#131314] text-white p-3 sm:p-4 lg:p-6">
      {/* Rest of your JSX */}
      {marketData && (
        <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-[#1D1D1F] p-3 sm:p-4 lg:p-6 rounded-2xl border border-purple-500/10">
            <div className="h-[250px] sm:h-[300px] lg:h-[400px]">
              <Line 
                options={getChartOptions('Market Growth Over Time')}
                data={marketData.growthData}
              />
            </div>
          </div>
          
          <div className="bg-[#1D1D1F] p-3 sm:p-4 lg:p-6 rounded-2xl border border-purple-500/10">
            <div className="h-[250px] sm:h-[300px] lg:h-[400px]">
              <Bar 
                options={getChartOptions('Market Share Distribution')}
                data={marketData.shareData}
              />
            </div>
          </div>
        </div>
      )}
      {/* Rest of your component */}
    </div>
  );
} 