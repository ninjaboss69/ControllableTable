import React from "react";
import PaginateItem from "./PaginateItem";
import { useEffect } from "react";
import { useRef } from "react";
import Dot from "./Dot";

const Pagination = ({ totalRow, currentPage, pageRow }) => {
  currentPage = parseInt(currentPage);
  const arrayOfData = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  const currentP = useRef(currentPage);
  useEffect(() => {
    if (currentPage > Math.ceil(totalRow / pageRow)) {
      currentP.current = Math.ceil(totalRow / pageRow);
    }
    if (currentPage < 1) {
      currentP.current = 1;
    }
  });

  return (
    <div className="flex flex-row mx-[10px] ">
      {console.log("rendering pagination")}
      {Math.ceil(totalRow / pageRow) <= 7 ? (
        <>
          {Array.from({ length: Math.ceil(totalRow / pageRow) }).map((_, i) => (
            <PaginateItem
              key={i}
              number={i + 1}
              currentPage={currentP.current}
            />
          ))}
        </>
      ) : (
        <>
          {currentP.current - 3 > 1 ? (
            <>
              <PaginateItem key={1} number={1} currentPage={currentP.current} />
              <Dot />
            </>
          ) : (
            <></>
          )}
          {currentP.current - 3 === 1 ? (
            <>
              <PaginateItem key={1} number={1} currentPage={currentP.current} />
            </>
          ) : (
            <></>
          )}
          {currentP.current - 2 > 0 ? (
            currentP.current + 1 >= Math.ceil(totalRow / pageRow) ? (
              <>
                {currentP.current === Math.ceil(totalRow / pageRow) ? (
                  <>
                    {arrayOfData.map((row, i) => (
                      <PaginateItem
                        key={i}
                        number={currentP.current - 4 + i}
                        currentPage={currentP.current}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {arrayOfData.map((row, i) => (
                      <PaginateItem
                        key={i}
                        number={currentP.current - 3 + i}
                        currentPage={currentP.current}
                      />
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {arrayOfData.map((row) => (
                  <PaginateItem
                    key={row}
                    number={row}
                    currentPage={currentP.current}
                  />
                ))}
              </>
            )
          ) : (
            <>
              {arrayOfData.map((row, i) => (
                <PaginateItem
                  key={i + 1}
                  number={i + 1}
                  currentPage={currentP.current}
                />
              ))}
            </>
          )}

          {currentP.current + 3 < Math.ceil(totalRow / pageRow) ? (
            <>
              <Dot />{" "}
              <PaginateItem
                key={Math.ceil(totalRow / pageRow)}
                number={Math.ceil(totalRow / pageRow)}
                currentPage={currentP.current}
              />
            </>
          ) : (
            <></>
          )}
          {currentP.current + 3 === Math.ceil(totalRow / pageRow) ? (
            <>
              <PaginateItem
                key={Math.ceil(totalRow / pageRow)}
                number={Math.ceil(totalRow / pageRow)}
                currentPage={currentP.current}
              />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Pagination;
