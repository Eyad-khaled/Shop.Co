import { Button } from "./ui/button";

interface SocialButtonsProps {
  children: React.ReactNode;
  action: () => void;
}
const SocialButtons = ({ children, action }: SocialButtonsProps) => {
  return (
    <Button onClick={action} variant="outline" className="w-full">
      {children}
    </Button >
  );
};

export default SocialButtons;