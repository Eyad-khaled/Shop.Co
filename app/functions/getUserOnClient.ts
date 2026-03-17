import { createClient } from "@/lib/supabase/client"

const getUser = async function () {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return user
}
export const getUserWithRole = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('user id:', user?.id) // check this exists

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()
    return data
}
export default getUser