import ContentLoader from 'react-content-loader';

function FoodsSkeleton() {
  return (
    <ContentLoader
      speed={2}
      width={360}
      height={500}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="foods-container"
    >
      <rect x="0" y="0" rx="3" ry="3" width="170" height="160" />
      <rect x="200" y="0" rx="3" ry="3" width="170" height="160" />
      <rect x="0" y="170" rx="3" ry="3" width="170" height="160" />
      <rect x="200" y="170" rx="3" ry="3" width="170" height="160" />
      <rect x="0" y="340" rx="3" ry="3" width="170" height="160" />
      <rect x="200" y="340" rx="3" ry="3" width="170" height="160" />
    </ContentLoader>
  );
}

export default FoodsSkeleton;
