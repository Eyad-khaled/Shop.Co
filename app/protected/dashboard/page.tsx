import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js/dist/index.cjs";
import { redirect } from "next/navigation";
// import { createClient } from "@supabase/supabase-js"

interface ComponentNameProps {
    /* props here */
}
const ComponentName = async ({ }: ComponentNameProps) => {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('user id:', user?.id) // check this exists

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

    console.log('data:', data)
    console.log('error:', error) // ← check the error, don't ignore it
    if (data.role !== 'admin') {
        redirect("/");
    }


    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <h1>THIS IS THE DASHBOARD HELLO ADMIN</h1>
        </div>
    );
};

export default ComponentName;