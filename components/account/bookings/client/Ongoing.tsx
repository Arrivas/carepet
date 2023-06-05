import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const Ongoing = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { bookings } = user;
  return (
    <>
      {bookings?.ongoing?.map((item, index: number) => (
        <div className="my-2 flex flex-row" key={index}>
          <img
            src={item.bookingDetails.imgUrl}
            className="h-[180px] w-[250px] object-cover rounded-md"
          />
          <div></div>
        </div>
      ))}
    </>
  );
};

export default Ongoing;
