import axios from 'axios';
import { useAuthenticationStore } from '../../stores/authentication';
import { url } from '../../constants/defaultUrl';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const { accessToken } = useAuthenticationStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            const errorCode = error.response.data.errorCode;

            if (errorCode === 'ACCESS_TOKEN_EXPIRED') {
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    const { refreshToken, setAccessToken, setRefreshToken } = useAuthenticationStore.getState();

                    try {
                        const response = await axiosInstance.post(`${url}/auth/token`, null, {
                            headers: {
                                'Authorization-refresh': `Bearer ${refreshToken}`
                            }
                        });
                        const newAccessToken = response.headers['authorization'];
                        setAccessToken(newAccessToken);

                        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        const { setAccessToken, setRefreshToken } = useAuthenticationStore.getState();
                        setAccessToken(null);
                        setRefreshToken(null);
                        const navigate = useNavigate();
                        navigate('/login', { replace: true });
                        return Promise.reject(refreshError);
                    }
                }
            }

            if (errorCode === 'REFRESH_TOKEN_EXPIRED') {
                const { setAccessToken, setRefreshToken } = useAuthenticationStore.getState();
                setAccessToken(null);
                setRefreshToken(null);
                const navigate = useNavigate();
                navigate('/login', { replace: true });
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export { useAuthenticationStore, axiosInstance };
