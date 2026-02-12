function SkeletonCard() {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden animate-pulse h-full">
      {/* Fake Image */}
      <div className="h-40 bg-gray-300 dark:bg-gray-600 w-full"></div>
      {/* Fake Text */}
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;