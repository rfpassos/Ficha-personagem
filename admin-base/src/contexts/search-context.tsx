"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface SearchContextValue {
    searchQuery: string
    setSearchQuery: (query: string) => void
    clearSearch: () => void
}

const SearchContext = createContext<SearchContextValue>({
    searchQuery: "",
    setSearchQuery: () => { },
    clearSearch: () => { },
})

export function useSearch() {
    return useContext(SearchContext)
}

interface SearchProviderProps {
    children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
    const [searchQuery, setSearchQueryState] = useState("")

    const setSearchQuery = useCallback((query: string) => {
        setSearchQueryState(query)
    }, [])

    const clearSearch = useCallback(() => {
        setSearchQueryState("")
    }, [])

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, clearSearch }}>
            {children}
        </SearchContext.Provider>
    )
}
