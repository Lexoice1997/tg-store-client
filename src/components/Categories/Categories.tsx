import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAllCategoriesQuery } from '../../store/services/apiService';
import { Category } from '../../types/Category';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import './Categories.css';
import CategoriesSkeleton from './CategpriesSkeleton';

function Categories() {
  const { data: categories, isLoading } = useGetAllCategoriesQuery(null);

  const [categoryActiveId, setCategoryActiveId] = useState<string>('0');

  const handleSetCategoryIdActive = (id: string) => {
    setCategoryActiveId(id);
  };

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <Swiper
      slidesPerView={2.75}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      className="mySwiper categories"
    >
      <SwiperSlide onClick={() => handleSetCategoryIdActive('0')}>
        <CategoriesItem id="0" name="Все" categoryActiveId={categoryActiveId} />
      </SwiperSlide>
      {categories?.map((item: Category) => (
        <SwiperSlide key={item.id} onClick={() => handleSetCategoryIdActive(item.id)}>
          <CategoriesItem id={item.id} name={item.name} categoryActiveId={categoryActiveId} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Categories;
