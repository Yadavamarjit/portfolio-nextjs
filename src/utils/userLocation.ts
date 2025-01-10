import axios from "axios";
interface LocationResponse {
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export const userLocation = async () => {
  try {
    try {
      const response = await axios.get("https://ipapi.co/json");
      const data: LocationResponse = response.data;
      return data;
    } catch (err) {
      console.log("Error909", err);
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

interface OnBoardUserParams {
  userId: string;
}
export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default getCookie;

export const onBoardUser = async () => {
  try {
    const existingUserId = getCookie("userId");
    let userId;
    if (!existingUserId) {
      const location = await userLocation();
      console.log("onboarded user", { userId, location });
      const response = await axios.post("/api/users", {
        ...location,
      });
      console.log({ response: response.data });
      //   cookieStore.set("userId", response.data._id);
    }

    // return response.data._id;
  } catch (error) {
    // console.error("Error onboarding user:", error);
    throw error;
  }
};
