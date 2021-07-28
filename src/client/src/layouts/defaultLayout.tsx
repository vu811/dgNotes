import { FC } from 'react'
import Header from './header'
import Footer from './footer'
import SideBar from './sidebar'

const DefaultLayout: FC = (props) => {
  return (
    <>
      <Header />
      <SideBar />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}
export default DefaultLayout
