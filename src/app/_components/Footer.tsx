import Container from "@/Layout/Container"

const Footer = () => {
  return (
    <div className="bg-white dark:bg-light-dark py-6 border-t-[#ddd] border-t-[1px] ">
      <Container>
        <div className="flex flex-row justify-center items-center">
            <p className=" text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Savannah. All rights reserved.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default Footer
