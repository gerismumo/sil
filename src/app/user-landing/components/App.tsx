"use client"

import Container from '@/Layout/Container'
import AlbumForm from './AlbumForm'
import ImageForm from './ImageForm'

const App = () => {
  return (
    <Container>
        <div className="flex flex-col">
            <div className="flex flex-row  justify-between">
                <div className=""></div>
                <div className="flex flex-row items-center gap-[30px]">
                    <AlbumForm/>
                    <ImageForm/>
                </div>
            </div>
        </div>
    </Container>
    
  )
}

export default App
