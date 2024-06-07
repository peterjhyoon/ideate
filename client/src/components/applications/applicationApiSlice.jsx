import { apiSlice } from "../../app/api/apiSlice";

export const applicationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getApplicationByUser: builder.query({
            query: ({ user, key }) => ({
                url: `/applications/user/${user}?key=${key ? key : ""}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedApplications = responseData.map((application) => {
                    application.id = application._id;
                    return application;
                });
                return loadedApplications;
            },
        }),
        getApplicationByProject: builder.query({
            query: ({ project }) => ({
                url: `/applications/project/${project}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedApplications = responseData.map((application) => {
                    application.id = application._id;
                    return application;
                });
                return loadedApplications;
            },
        }),
        getApplicationByUserAndProject: builder.query({
            query: ({ user, project }) => ({
                url: `/applications/user/${user}/project/${project}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedApplications = responseData.map((application) => {
                    application.id = application._id;
                    return application;
                });
                return loadedApplications;
            },
        }),
        addNewApplication: builder.mutation({
            query: (initialApplicationData) => ({
                url: "/applications",
                method: "POST",
                body: {
                    ...initialApplicationData,
                },
            }),
        }),
        updateApplication: builder.mutation({
            query: ({ id, ...initialApplicationData }) => ({
                url: `/applications/id/${id}`,
                method: "PATCH",
                body: {
                    ...initialApplicationData,
                },
            }),
        }),
        deleteApplication: builder.mutation({
            query: ({ id }) => ({
                url: `/applications/id/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetApplicationByUserQuery,
    useGetApplicationByProjectQuery,
    useGetApplicationByUserAndProjectQuery,
    useAddNewApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = applicationApiSlice;
