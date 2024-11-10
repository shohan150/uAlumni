import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";

//server jodi 401 error mane forbidden access er karone data na dei, tahole authToken expire hoye geche. Tokhon refreshToken diye notun authToken request kore, shei notun authToken k setAut diye authContext er vitor auth state e notun authToken r refreshToken k store kore rakhi. 
// Tahole ekhon  protected page/route gulo http://localhost:3000 e directly CRUD call korbo na. borong request ta korbo ei useAuth er maddhome pawa base 'api' er through te jate authToken jodi expire hoye jai, tahole se setak update kore dibe header e. tahole authToken true hle intercept kore headeer e authToken k set kore. tarpor requeat te hooche. r false hle mane responce e 401 pele notun token ene, take header e set e nije e request korbe.

//r hae, sudhu protected route gulo tei useAuth() er return kora api use korte hobe. baki jaigai directly base_url deya jabe. karon sudhu protected  er data ante e authToken lagbe. R ei api diye request korle e kaj keno hoye jabe? karon ei hook korar por e se jokhon useEffect run korbe se api te interceptor gulo add kore dibe. tarpor theke ei api use kore kora proti request r responce e interceptor gulo kaj korte thakbe ebong authToken update hle, hook re-render hobe ebong ebong api theke ager interceptro gulo clear hoye jabe. 

//r auth k jehetu update kore dei, sehetu compenent e directly auth theke user er data ebong token k access korte parbo.

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor. axiosIntance.interceptors.request.use diye ekta callback fuction dite parbo j kina proti request e intercept korbe. shei callback function first parameter e onekgulo axios er configuration option pai. second parameter e error k pabo.
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        //protiti request er header e authToken k set kori.
        const authToken = auth?.authToken;
        if (authToken) {
          //adding the authToken to the header
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        //return the updated config
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor. ekhane mainly error niye kaj hobe. reponce e error pele refreshToken diye new authToken request korbe ebong abar request pathabe. 
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // eslint-disable-next-line no-useless-catch
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;

            console.log(`New Token: ${token}`);
            setAuth({ ...auth, authToken: token });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );

    // clear the useEffect axios interceptors. clear na korle new autThoken pawar por jokhon hook re-render hobe tarpor o ager interceptor gulo cholte e thakbe. 
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };

    //authToken update hle e ei hook ta call korbe karon tohkno proti reqest e new authTOken diye request kora hobe. 
  }, [auth.authToken]);

  return { api };
};

export default useAxios;
