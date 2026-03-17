import Image from "next/image";
import SocialButtons from "./social-buttons";
import { createClient } from "@/lib/supabase/client";

interface SocialAuthButtonsProps {
    /* props here */
}
type provider = 'google' | 'github' | 'facebook';
type providerType = {
    name: provider;
    icon: string;
    size: number;
    label: string;
}
const providers: providerType[] = [
    {
        name: 'google',
        icon: '/social-icons/google.png',
        size: 30,
        label: 'Continue with Google'
    },
    {
        name: 'github',
        icon: '/social-icons/github.png',
        size: 30,
        label: 'Continue with GitHub'
    },
    {
        name: 'facebook',
        icon: '/social-icons/facebook.png',
        size: 30,
        label: 'Continue with Facebook'
    }

]
const SocialAuthButtons = ({ }: SocialAuthButtonsProps) => {
    const handleSocialSignIn = async (provider: provider) => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({

            provider,
            options: {
                redirectTo: `https://shop-co-ten-sigma.vercel.app/auth/callback`
            }
        })
    }
    return (
        <div>
            {providers.map((provider: providerType) => (
                <SocialButtons key={provider.name} action={() => handleSocialSignIn(provider.name)}>
                    <Image src={provider.icon} alt={provider.name} width={provider.size} height={provider.size} />
                    {provider.label}
                </SocialButtons>
            ))}
        </div>
    );
};

export default SocialAuthButtons;