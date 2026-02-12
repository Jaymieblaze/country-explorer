function SkeletonDetails() {
  return (
    <div className="animate-pulse">
      {/* Back Button Skeleton */}
      <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded mb-12"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Flag Skeleton */}
        <div className="w-full h-64 sm:h-80 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

        {/* Text Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 w-1/2 rounded mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-2/3 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/2 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/2 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-2/3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonDetails;