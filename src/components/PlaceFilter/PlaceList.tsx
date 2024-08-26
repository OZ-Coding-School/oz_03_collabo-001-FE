// import React from 'react';
import PlaceItem from './PlaceItem';
// import useInfiniteScroll from '../../hooks/useInfiniteScroll'; // 경로는 실제 위치에 맞게 조정해주세요

// interface Place {
//   // Place 타입을 정의해주세요
//   id: string;
//   // 기타 필요한 속성들...
// }

// const fetchPlaces = async ({ pageParam = 0 }) => {
//   // API 호출 로직을 구현해주세요
//   const response = await fetch(`/api/places?page=${pageParam}`);
//   return response.json();
// };

const PlaceList: React.FC = () => {
  //   const { data, observerElem, isFetchingNextPage, isLoading, isError, error } =
  //     useInfiniteScroll<Place[]>({
  //       queryKey: ['places'],
  //       queryFn: fetchPlaces,
  //       getNextPageParam: (lastPage, allPages) => {
  //         // 다음 페이지 파라미터 로직을 구현해주세요
  //         return lastPage.length === 0 ? undefined : allPages.length;
  //       },
  //     });

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='h-[100%] w-[400px]'>
      {/* {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </React.Fragment>
      ))} */}
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />
      <PlaceItem />

      {/* {isFetchingNextPage && <div>Loading more...</div>}
      <div ref={observerElem} /> */}
    </div>
  );
};

export default PlaceList;
