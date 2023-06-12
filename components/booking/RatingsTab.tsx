import React from "react";
import Rate from "rc-rate";

interface RatingsTabProps {
  ratings: any;
}

const RatingsTab: React.FC<RatingsTabProps> = ({ ratings }) => {
  return (
    <>
      <div className="overflow-y-auto h-[90vh]">
        {
          <div className="flex flex-row flex-wrap justify-center items-center mb-2">
            {ratings?.length !== 0 ? (
              ratings?.map((rating: any, index: any) => (
                <div key={index} className="w-full  p-4">
                  <div className="bg-white rounded-md shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={rating.imgUrl}
                        alt="User"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-bold">{rating.userName}</span>
                    </div>
                    <div className="mb-4">
                      <Rate value={rating.rate} disabled />
                    </div>
                    <p className="text-sm">{rating.descriptionText}</p>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-gray-200 my-2">no ratings yet</span>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default RatingsTab;
