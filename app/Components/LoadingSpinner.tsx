import React from 'react'

type LoadingSpinnerProps = {
    size?: "lg" | "md" | "sm"
}



const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({size = "lg"}) => {
    
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

  return (
    <div className='flex justify-center items-center'>
      <div 
        className={`${sizeClasses[size]} rounded-full border-t-transparent border-gray-700 animate-spin`}>
      </div>
    </div>
  )
}

export default LoadingSpinner
