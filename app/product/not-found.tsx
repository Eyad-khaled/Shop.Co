"use client"

import Link from "next/link";

interface ComponentNameProps {
  /* props here */
}
const ComponentName = ({}: ComponentNameProps) => {
  return (
    <div>
     <h1>
        No Product Match This Id
        </h1>  
        <div  className="bg-red-500 text-white p-4 rounded-md cursor-pointer w-fit">

      <Link href="/" className="w-full h-full" >Return Home </Link>
        </div>
    </div>
  );
};

export default ComponentName;