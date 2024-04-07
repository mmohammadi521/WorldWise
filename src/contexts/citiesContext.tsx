import {
  ReactNode,
  ReducerAction,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cityType } from "../type/citiesType";
import { reducer } from "./reducer";

export type userType = {
  cities: cityType[];
  isLoading: boolean;
  currentCity: cityType | undefined;
  getCity: (id: string | undefined) => void;
  deleteCity: (id: string | undefined) => void;
};

export const defaultContextValue: userType = {
  cities: [],
  isLoading: false,
  currentCity: {
    cityName: "",
    country: "",
    emoji: "",
    date: "",
    notes: "",
    id: "",
    position: {
      lat: 0,
      lng: 0,
    },
  },
  getCity: () => {},
  deleteCity: () => {},
};

const CitiesContext = createContext<userType>(defaultContextValue);

type Props = {
  children: ReactNode;
};
const CitiesProvider = ({ children }: Props) => {
  // const [cities, setCities] = useState<cityType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [currentCity, setCurrentCity] = useState();
  const [state, dispatch] = useReducer(reducer, defaultContextValue);
  const { cities, isLoading, currentCity } = state;
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({
        type: "loading",
      });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data: cityType[] = await res.json();
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch {
        alert("error");
      }
    };
    fetchCities();
  }, []);

  const deleteCity = async (id: string | undefined) => {
    dispatch({
      type: "loading",
    });
    try {
      await fetch(`http://localhost:9000/cities/${id}`);
      dispatch({
        type: "cities/delete",
        payload: id,
      });
    } catch {
      alert("not delet");
    }
  };

  const getCity = async (id: string | undefined) => {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      dispatch({
        type: "currentCity/loaded",
        payload: data,
      });
    } catch {
      alert("error");
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, deleteCity, getCity, currentCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
