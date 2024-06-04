import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ id }) => ({
                url: `/users/id/${id}`,
                method: "GET",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                responseData.id = responseData._id;
                return responseData;
            },
        }),
        addNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/users",
                method: "POST",
                body: { ...initialUserData },
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...initialUserData }) => ({
                url: `/users/id/${id}`,
                method: "PATCH",
                body: { ...initialUserData },
            }),
        }),
        deleteUser: builder.mutation({
            query: ({ id, ...initialUserData }) => ({
                url: `/users/id/${id}`,
                method: "DELETE",
                body: { ...initialUserData },
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;
