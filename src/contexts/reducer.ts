import { userType } from "./citiesContext";
import { cityType } from "../type/citiesType";

export type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: cityType[] }
  | { type: "cities/delete"; payload: string | undefined }
  | { type: "currentCity/loaded"; payload: cityType | undefined };

export const reducer = (state: userType, action: Action): userType => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "cities/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "currentCity/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    default:
      return state;
  }
};
