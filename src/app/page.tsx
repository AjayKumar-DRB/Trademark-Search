import Header from "@/sections/Header";
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header/>
    </>
  );
}
