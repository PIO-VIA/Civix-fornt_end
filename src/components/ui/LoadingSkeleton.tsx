interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ count = 3, className = "" }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded-md w-20"></div>
                <div className="h-4 bg-gray-200 rounded-md w-24"></div>
              </div>
            </div>
            <div className="ml-4">
              <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}