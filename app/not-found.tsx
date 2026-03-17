import Link from "next/link";

interface NotFoundProps {
  /* props here */
}
const NotFound = ({}: NotFoundProps) => {
  return (
    <div className="flex flex-col">
      <h1>
        This Page Is Not Available 
        </h1>
      <Link href='/' className="bg-[#f0f0f0] p-6 rounded-md w-fit">Go Home</Link>
    </div>
  );
};

export default NotFound;