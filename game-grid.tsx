"use client"

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Component() {
  const [traps, setTraps] = useState(1)
  const [starPositions, setStarPositions] = useState<number[]>([])
  const [flippedBoxes, setFlippedBoxes] = useState<number[]>([])
  
  const handleTrapChange = (direction: 'left' | 'right') => {
    const trapValues = [1, 3, 5, 7]
    const currentIndex = trapValues.indexOf(traps)
    
    if (direction === 'left' && currentIndex > 0) {
      setTraps(trapValues[currentIndex - 1])
    } else if (direction === 'right' && currentIndex < trapValues.length - 1) {
      setTraps(trapValues[currentIndex + 1])
    }
    
    setStarPositions([])
    setFlippedBoxes([])
  }

  const generateRandomStars = () => {
    const totalStars = traps === 1 ? Math.floor(Math.random() * 3) + 4 : Math.floor(Math.random() * 2) + 3
    const positions: number[] = []
    const availablePositions = Array.from({ length: 25 }, (_, i) => i)
    
    for (let i = 0; i < totalStars; i++) {
      if (availablePositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length)
        const position = availablePositions[randomIndex]
        positions.push(position)
        availablePositions.splice(randomIndex, 1)
      }
    }
    
    setStarPositions(positions)
    animateFlip(positions)
  }

  const animateFlip = (positions: number[]) => {
    setFlippedBoxes([])
    positions.forEach((position, index) => {
      setTimeout(() => {
        setFlippedBoxes(prev => [...prev, position])
      }, index * 300)
    })
  }

  return (
    <div className="min-h-screen bg-[#000B3B] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Waving Text */}
        <div className="text-center relative">
          <h1 className="text-4xl font-bold text-orange-500 animate-pulse">
            CSMINESHACK
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent 
                          animate-wave" style={{ animationDuration: '3s' }}></div>
        </div>

        {/* Grid Container */}
        <div className="relative bg-[#001166] rounded-3xl p-8 shadow-[0_0_30px_rgba(0,102,255,0.3)]">
          <div className="grid grid-cols-5 gap-4 relative before:absolute before:inset-[-20px] before:rounded-3xl before:border-4 before:border-[#0066FF]/30 before:shadow-[inset_0_0_30px_rgba(0,102,255,0.3)]">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="relative aspect-square perspective-500">
                <div 
                  className={`absolute inset-0 transition-all duration-500 transform-style-3d ${
                    flippedBoxes.includes(i) ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of the box */}
                  <div 
                    className="absolute inset-0 bg-[#0066FF] rounded-lg shadow-[0_0_15px_rgba(0,102,255,0.5)] 
                              transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,102,255,0.8)] 
                              hover:brightness-110 cursor-pointer backface-hidden"
                    style={{
                      clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
                    }}
                  ></div>
                  
                  {/* Back of the box (with star) */}
                  <div 
                    className="absolute inset-0 bg-[#0066FF] rounded-lg shadow-[0_0_15px_rgba(0,102,255,0.5)] 
                              flex items-center justify-center rotate-y-180 backface-hidden"
                    style={{
                      clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
                    }}
                  >
                    {starPositions.includes(i) && (
                      <Star 
                        className="w-10 h-10 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]"
                        fill="currentColor"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#001166] rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-900/50"
              onClick={() => handleTrapChange('left')}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="text-white text-xl font-medium">
              {traps} traps
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-900/50"
              onClick={() => handleTrapChange('right')}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
          
          <Button 
            onClick={generateRandomStars}
            className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white text-lg py-6
                     shadow-[0_0_15px_rgba(0,102,255,0.5)] hover:shadow-[0_0_20px_rgba(0,102,255,0.8)]
                     transition-all duration-200"
          >
            Play
          </Button>
        </div>
      </div>
    </div>
  )
      }
