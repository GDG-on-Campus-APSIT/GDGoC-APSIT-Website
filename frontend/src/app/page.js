import { HomepageComponent } from "@/components/homepage";
import { NavbarComponent } from "@/components/navbar";
import { ToastContainer } from 'react-toastify';


export default function Home() {
  return (
    <>
      <NavbarComponent />
      <HomepageComponent />
    </>
  );
}
