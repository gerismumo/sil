"use client"

import Container from '@/Layout/Container'
import AlbumForm from './AlbumForm'
import ImageForm from './ImageForm'
import { IAlbum } from '@/(models)/Album'

type Props ={
  albumList:IAlbum[];
}
const App:React.FC<Props> = ({albumList}) => {
  return (
    <Container>
        <div className="flex flex-col">
            <div className="flex flex-row  justify-between">
                <div className=""></div>
                <div className="flex flex-row items-center gap-[30px]">
                    <AlbumForm />
                    <ImageForm albumList={albumList}/>
                </div>
            </div>
        </div>
    </Container>
    
  )
}

export default App
