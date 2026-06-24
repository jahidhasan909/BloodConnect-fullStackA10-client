"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Fixed default Tailwind color mapping
const bloodGroupColors = {
    "A+": "bg-rose-50 text-rose-700 border-rose-200",
    "A-": "bg-rose-50 text-rose-700 border-rose-200",
    "B+": "bg-red-50 text-red-700 border-red-200",
    "B-": "bg-red-50 text-red-700 border-red-200",
    "AB+": "bg-orange-50 text-orange-700 border-orange-200",
    "AB-": "bg-orange-50 text-orange-700 border-orange-200",
    "O+": "bg-red-100 text-red-800 border-red-300",
    "O-": "bg-red-100 text-red-800 border-red-300",
};

const BloodDropIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
        <path d="M12 2C12 2 4 10.5 4 15a8 8 0 0016 0C20 10.5 12 2 12 2z" />
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
);

const LocationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
);

const DonorSkeleton = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-100 rounded w-24" />
                <div className="h-3 bg-gray-100 rounded w-40 mt-2" />
            </div>
            <div className="w-14 h-8 bg-gray-200 rounded-full" />
        </div>
    </div>
);

export default function SearchDonorComponents() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const [bloodGroup, setBloodGroup] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");

    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [errors, setErrors] = useState({});

    // Load district & upazila data
    useEffect(() => {
        const loadData = async () => {
            try {
                const [districtRes, upazilaRes] = await Promise.all([
                    fetch("/districts.json"),
                    fetch("/upazilas.json"),
                ]);
                const districtData = await districtRes.json();
                const upazilaData = await upazilaRes.json();
                setDistricts(districtData?.[2]?.data || []);
                setUpazilas(upazilaData?.[2]?.data || []);
            } catch (error) {
                console.error("Failed to load location data", error);
            }
        };
        loadData();
    }, []);

 
    useEffect(() => {
        if (selectedDistrict) {
            const filtered = upazilas.filter(
                (u) => String(u.district_id) === String(selectedDistrict)
            );
            setFilteredUpazilas(filtered);
            setSelectedUpazila("");
        } else {
            setFilteredUpazilas([]);
            setSelectedUpazila("");
        }
    }, [selectedDistrict, upazilas]);

    const validate = () => {
        const newErrors = {};
        if (!bloodGroup) newErrors.bloodGroup = "Select a blood group";
        if (!selectedDistrict) newErrors.district = "Select a district";
        return newErrors;
    };

    const handleSearch = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        setHasSearched(true);

        try {
            
            const targetDistrictName = districts.find(d => String(d.id) === String(selectedDistrict))?.name || "";
            const targetUpazilaName = filteredUpazilas.find(u => String(u.id) === String(selectedUpazila))?.name || "";

            const params = new URLSearchParams({ role: "donor" });
            if (bloodGroup) params.append("bloodGroup", bloodGroup);
            if (targetDistrictName) params.append("district", targetDistrictName);
            if (targetUpazilaName) params.append("upazila", targetUpazilaName);

           
            const res = await fetch(`${baseurl}/api/searchdonor/users?${params.toString()}`);
            const data = await res.json();
            setDonors(Array.isArray(data) ? data : data?.users || []);
        } catch (err) {
            console.error("Failed to fetch donors", err);
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    const selectClass = (hasError) =>
        `w-full h-11 px-3 rounded-xl border text-sm bg-white text-gray-800
     appearance-none cursor-pointer transition-all duration-150 outline-none
     focus:ring-2 focus:ring-red-400 focus:border-red-400
     ${hasError ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`;

    return (
        <div className="min-h-screen mt-30 bg-gradient-to-br from-red-50 via-white to-rose-50">
            {/* Hero header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                <div className="relative max-w-4xl mx-auto px-4 py-10 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur mb-4">
                        <BloodDropIcon />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Find a Donor</h1>
                    <p className="mt-2 text-red-100 text-sm max-w-md mx-auto">Search for blood donors near you. Every second counts — connect with a donor today.</p>
                </div>
            </div>

            {/* Search card */}
            <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl shadow-red-100/50 border border-red-50 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Blood Group */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Blood Group <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select value={bloodGroup} onChange={(e) => { setBloodGroup(e.target.value); setErrors((p) => ({ ...p, bloodGroup: undefined })); }} className={selectClass(errors.bloodGroup)}>
                                    <option value="">Select blood group</option>
                                    {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                            {errors.bloodGroup && <p className="text-xs text-red-500">{errors.bloodGroup}</p>}
                        </div>

                        {/* District */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">District <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select value={selectedDistrict} onChange={(e) => { setSelectedDistrict(e.target.value); setErrors((p) => ({ ...p, district: undefined })); }} className={selectClass(errors.district)}>
                                    <option value="">Select district</option>
                                    {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                            {errors.district && <p className="text-xs text-red-500">{errors.district}</p>}
                        </div>

                        {/* Upazila */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Upazila</label>
                            <div className="relative">
                                <select value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} disabled={!selectedDistrict} className={`${selectClass(false)} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                    <option value="">{selectedDistrict ? "Select upazila" : "Select district first"}</option>
                                    {filteredUpazilas.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <Button onPress={handleSearch} isLoading={loading} className="h-11 px-8 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl shadow-md shadow-red-200 hover:shadow-red-300 hover:from-red-700 hover:to-rose-700 transition-all duration-150 flex items-center gap-2">
                            {!loading && <SearchIcon />}
                            {loading ? "Searching..." : "Search Donors"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {loading && (
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => <DonorSkeleton key={i} />)}
                    </div>
                )}

                {!loading && hasSearched && (
                    <>
                        {donors.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm text-gray-500"><span className="font-semibold text-gray-800">{donors.length}</span> donor{donors.length !== 1 ? "s" : ""} found</p>
                                    <div className="h-px flex-1 mx-4 bg-gray-100" />
                                    <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Results</span>
                                </div>

                                <div className="space-y-3">
                                    {donors.map((donor) => (
                                        <div key={donor._id || donor.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-red-100 hover:shadow-md hover:shadow-red-50 transition-all duration-200 group">
                                            <div className="flex items-center gap-4">
                                                <div className="relative flex-shrink-0">
                                                    {donor.image ? (
                                                        <img src={donor.image} alt={donor.name} className="w-12 h-12 rounded-full object-cover border-2 border-red-100" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center text-red-600 font-bold text-lg border-2 border-red-100">
                                                            {(donor.name || "D")[0].toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors truncate">{donor.name || "Anonymous Donor"}</h3>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                                        {(donor.district || donor.upazila) && (
                                                            <span className="text-xs text-gray-500">
                                                                <LocationIcon />
                                                                {[donor.upazila, donor.district].filter(Boolean).join(", ")}
                                                            </span>
                                                        )}
                                                        {donor.phone && <span className="text-xs text-gray-500"><PhoneIcon />{donor.phone}</span>}
                                                    </div>
                                                </div>

                                                <div className="flex-shrink-0">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold border ${bloodGroupColors[donor.bloodGroup] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
                                                        <BloodDropIcon />{donor.bloodGroup}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-300 mb-4">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 2 4 10.5 4 15a8 8 0 0016 0C20 10.5 12 2 12 2z" /></svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">No donors found</h3>
                                <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Try a different blood group or expand your area to find available donors.</p>
                            </div>
                        )}
                    </>
                )}

                {!hasSearched && !loading && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-200 mb-4">
                            <SearchIcon />
                        </div>
                        <h3 className="text-base font-semibold text-gray-700">Search to find donors</h3>
                        <p className="text-sm text-gray-400 mt-1">Fill in the form above and click Search to see available donors.</p>
                    </div>
                )}
            </div>
        </div>
    );
}