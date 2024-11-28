"use client"

import Container from '@/Layout/Container'
import AlbumForm from './AlbumForm'
import ImageForm from './ImageForm'
import { IAlbum } from '@/(models)/Album'
import Image from 'next/image'

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
  albumList: IAlbum[];
  alblumData: IAlbumData[];
}

const App: React.FC<Props> = ({ albumList, alblumData }) => {
  return (
    <Container>
      <div className="flex flex-col gap-10 my-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold dark:text-white">Your Albums</h1>
          <div className="flex gap-6">
            <AlbumForm />
            <ImageForm albumList={albumList} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alblumData.map((album) => (
            <div key={album._id} className="dark:bg-light-dark shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="relative w-full h-64">
                <Image 
                  src={album.photos[0]?.imageUrl || '/defaultalbum.jpeg'} 
                  alt={`${album.title} cover`} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6 dark:bg-light-dark">
                <h2 className="text-xl font-semibold dark:text-white">{album.title}</h2>
                <p className="text-sm dark:text-white">{album.photos.length} photos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default App
