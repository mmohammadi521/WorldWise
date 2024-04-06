import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { cityType } from "../type/citiesType";

type userType = {
  cities: cityType[];
  isLoading: boolean;
  currentCity: cityType | undefined;
  getCity: (id: string | undefined) => void;
};

const defaultContextValue: userType = {
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
};
const CitiesContext = createContext<userType>(defaultContextValue);

type Props = {
  children: ReactNode;
};
const CitiesProvider = ({ children }: Props) => {
  const [cities, setCities] = useState<cityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
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
