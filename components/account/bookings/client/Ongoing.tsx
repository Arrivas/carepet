import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const Ongoing = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { bookings } = user;
  console.log(bookings?.ongoing?.length);
  return (
    <>
      {bookings?.ongoing?.length !== 0 ? (
        bookings?.ongoing?.map((item, index: number) => (
          <div className="my-2 flex flex-row" key={index}>
            <img
              src={item?.bookingDetails?.imgUrl}
              alt="image"
              className="h-[180px] w-[250px] object-cover rounded-md"
            />
            <div></div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-300 font-semibold  italic">
          <span> no items yet</span>
        </div>
      )}
    </>
  );
};

export default Ongoing;
