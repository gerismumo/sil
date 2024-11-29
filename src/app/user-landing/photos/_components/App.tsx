import React, { useState } from 'react'
import Image from 'next/image'
import Container from '@/Layout/Container';
import Link from 'next/link';

type IPhoto = {
  _id: string;
  title: string;
  imageUrl: string;
}

type IAlbumData = {
  _id: string;
  title: string;
  photos: IPhoto[];
}

type Props = {
  albumData: IAlbumData;
}

const PhotosViewPage: React.FC<Props> = ({ albumData }) => {
  return (
    <Container>
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-semibold dark:text-white mb-8">{albumData.title} Photos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {albumData.photos.map((photo) => (
                <Link href={`/user-landing/photos/photo?ref=${albumData._id}&id=${photo._id}`} key={photo._id} className="group relative">
                    <div className="w-full h-72 relative dark:bg-light-dark rounded-lg overflow-hidden shadow-gray-50 dark:shadow-light-dark shadow-md">
                    <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-80"
                    />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-center">
                    <p className="font-semibold">{photo.title}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    </Container>
  )
}

export default PhotosViewPage
