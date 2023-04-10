import ContentLoader from 'react-content-loader';

function CategoriesSkeleton() {
  return (
    <ContentLoader
      speed={2}
      width={380}
      height={60}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="categories"
    >
      <rect x="0" rx="3" ry="3" width="100" height="40" />
      <rect x="115" rx="3" ry="3" width="100" height="40" />
      <rect x="230" rx="3" ry="3" width="100" height="40" />
    </ContentLoader>
  );
}

export default CategoriesSkeleton;
