import React, {useState, useContext, createContext, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPokemons} from '../features/pokeSlice';
import {Waypoint as ReactWaypoint} from 'react-waypoint';
import {createStyles, ImageList, makeStyles, Theme} from "@material-ui/core";


type ContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  paginationHandler: (page: number) => (dispatch: React.Dispatch<any>) => Promise<void>;
  totalCount: number;
  itemsPerPage: number,
};
const InfiniteScrollContext = createContext<ContextType>({
  page: 0,
  setPage: () => {
  },
  isLoading: true,
  paginationHandler: getPokemons,
  totalCount: 0,
  itemsPerPage: 50,
});

const Waypoint = () => {
  const {isLoading, setPage, page, paginationHandler, totalCount, itemsPerPage} = useContext(
    InfiniteScrollContext
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(0);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="mt-48">
      {!isLoading && (
        <ReactWaypoint
          onEnter={() => {
            const dispatchPage = page + (totalCount > page ? itemsPerPage : 0);

            dispatch(paginationHandler(page) as any);
            setPage(dispatchPage);
          }}
        />
      )}
    </div>
  );
};

type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({children}: ContainerProps) => {
  return (
    <div className=''>
      {children}
    </div>
  );
};

type InfiniteScrollProps = {
  children: (
    {
      mutatePage
    }: {
      mutatePage: React.Dispatch<React.SetStateAction<number>>;
    }) => React.ReactNode;
  paginationHandler: (
    page: number
  ) => (dispatch: React.Dispatch<any>) => Promise<void>;
  isLoading: boolean;
  totalCount: number;
  itemsPerPage: number;
};

const InfiniteScroll = ({
                          children,
                          paginationHandler,
                          isLoading,
                          totalCount,
                          itemsPerPage,
                        }: InfiniteScrollProps) => {
  const [page, setPage] = useState<number>(0);

  return (
    <InfiniteScrollContext.Provider
      value={{
        page,
        setPage,
        isLoading,
        paginationHandler,
        totalCount,
        itemsPerPage,
      }}
    >
      {children({mutatePage: setPage})}
    </InfiniteScrollContext.Provider>
  );
};

InfiniteScroll.Container = Container;
InfiniteScroll.Waypoint = Waypoint;
export default InfiniteScroll;
