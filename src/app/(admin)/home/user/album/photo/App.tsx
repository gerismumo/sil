"use client"

import Container from '@/Layout/Container';
import React from 'react'
import Image from 'next/image'

type Props = {
  title: string;
  image: string;
}

const PhotoView: React.FC<Props> = ({ title, image }) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-10 md:px-6">
        <div className="w-full max-w-3xl bg-gray-200 rounded-lg overflow-hidden shadow-lg mb-6">
          <div className="relative w-full" style={{ height: '400px' }}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold dark:text-white mb-4">{title}</h1>
      </div>
    </Container>
  )
}

export default PhotoView
