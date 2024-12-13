import { apiSlice } from "@/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
    }),
    transformResponse: (response) => {
      if (response?.data?.token) {
        const decodedToken = JSON.parse(
          atob(response.data.token.split(".")[1])
        );
        const expiration = new Date(decodedToken.exp * 1000);
        if (expiration <= new Date()) {
          throw new Error("Token expired");
        }
      }
      return response;
    },

    register: builder.mutation({
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: {
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          password: userData.password,
        },
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
        headers: (headers) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal mengambil data profil");
        }
      },
    }),

    getBalance: builder.query({
      query: () => ({
        url: "/balance",
        method: "GET",
        headers: (headers) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal mengambil data balance");
        }
      },
    }),

    getBanners: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal mengambil data banner");
        }
      },
    }),

    topUpBalance: builder.mutation({
      query: (data) => ({
        url: "/topup",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: data,
      }),
    }),

    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal mengambil data services");
        }
      },
    }),

    getTransactionHistory: builder.query({
      query: ({ limit = 10 }) => {
        return {
          url: "/transaction/history",
          method: "GET",
          params: {
            limit,
          },
          headers: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
          },
        };
      },
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data.records.sort(
            (a, b) => new Date(b.created_on) - new Date(a.created_on)
          );
        } else {
          throw new Error(response.message || "Gagal mengambil data transaksi");
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile/update",
        method: "PUT",
        body: profileData,
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal update profil");
        }
      },
    }),

    updateProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/profile/image",
        method: "PUT",
        body: formData,
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal update gambar profil");
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useGetBalanceQuery,
  useGetBannersQuery,
  useGetServicesQuery,
  useTopUpBalanceMutation,
  useGetTransactionHistoryQuery,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
} = authApiSlice;
