"use client"

import { IAlbum } from "@/(models)/Album";
import axios from "axios";
import { useEffect, useState } from "react";

const useAlbums = () => {
    const [albumList, setAlbumList] = useState<IAlbum[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/album');
            if (response.data.success) {
                setAlbumList(response.data.data);
            } else {
                setError("Failed to fetch albums");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return { albumList, loading, error };
};

export default useAlbums;
