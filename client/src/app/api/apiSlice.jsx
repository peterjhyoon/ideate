import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include'
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User', 'Project', 'Application', 'Category', 'Location'],
    endpoints: builder => ({})
})