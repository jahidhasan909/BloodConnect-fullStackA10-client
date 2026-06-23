

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getAllDonationRequest = async () => {
    const res = await fetch(`${baseUrl}/api/donationrequest`)
    const allDonationRequest = await res.json()

    return allDonationRequest;
}
