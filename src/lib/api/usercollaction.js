

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getUserCollactions = async () => {
    const res = await fetch(`${baseUrl}/api/users`)
    const users = await res.json()

    return users;
}