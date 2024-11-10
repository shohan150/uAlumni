import { Link } from "react-router-dom";
import errorImg from "../assets/images/404.jpg";

export default function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center">
      <img src={errorImg} alt="" className="max-w-[800px] mt-20 mb-12 px-24" />
      <h3 className="text-textBlue text-xl text-center">Sorry. This page is not found!!</h3>
      <Link to="/" >      <button className="bg-textBlue text-gray-200 p-2 mt-4 shadow rounded">Go to Home Page</button></Link>
    </div>
  );
}
