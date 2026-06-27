'use client'
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button, Card } from '@heroui/react';
import { motion } from "framer-motion";
const ContactSection = () => {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
    };

    return (
        <section className="bg-slate-50 text-slate-600 py-24 px-4 sm:px-6 lg:px-8 select-none font-sans overflow-hidden antialiased">
            <div className="max-w-7xl mx-auto">

                <div className="mb-16 space-y-3 text-center">

                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                        Contact Us
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed">
                        Have questions or need blood support? Our team is here to help you anytime.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                >
                    
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">


                    <div className="lg:col-span-2 space-y-8">


                        <Card className="bg-[#db0000] text-white rounded-[2rem] p-8 shadow-lg shadow-rose-600/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-300">
                                <Phone className="w-32 h-32" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-200 block mb-2">
                                24/7 Emergency Hotline
                            </span>
                            <h3 className="text-2xl font-black tracking-tight">
                                Urgent Blood Support
                            </h3>
                            <a href="tel:+8801700000000" className="text-2xl sm:text-3xl font-extrabold tracking-tight hover:underline block mb-1">
                                +880 1700-00000
                            </a>
                            <p className="text-xs text-rose-100/80 leading-relaxed">
                                Call directly for zero-latency communication during medical crises. Our support syncs across blood dispatch networks.
                            </p>
                        </Card>


                        <Card className="bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 space-y-6">


                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">Official Email</h4>
                                    <a href="mailto:support@bloodbridge.com" className="text-sm text-slate-500 hover:text-[#db0000] transition-colors">
                                        support@bloodconnect.com
                                    </a>
                                </div>
                            </div>


                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">Headquarter</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Level 4, Sector 11, Uttara, <br /> Dhaka-1230, Bangladesh
                                    </p>
                                </div>
                            </div>




                        </Card>

                    </div>


                    <Card className="lg:col-span-3 bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 sm:p-10 relative">

                        <form onSubmit={handleSubmit} className="space-y-6">


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Jahid Hasan"
                                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-[#db0000] text-slate-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="developer@example.com"
                                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-[#db0000] text-slate-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-colors"
                                    />
                                </div>
                            </div>


                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Subject Context</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Inquiring about volunteer verification pipelines"
                                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-[#db0000] text-slate-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-colors"
                                />
                            </div>


                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Message Details</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Describe your inquiry with context..."
                                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-[#db0000] text-slate-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <div className="relative group w-full p-[2px] rounded-lg overflow-hidden">

                                    <motion.div
                                        className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#E11D48_0%,#ffffff_50%,#E11D48_100%)]"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />


                                    <div className="relative bg-white rounded-[6px] p-[2px]">
                                        <Button
                                            className="bg-[#db0000] hover:bg-[#db00008b] text-white font-semibold text-base h-12 px-8 rounded-[4px] transition-all flex items-center justify-center gap-2 w-full"
                                        >
                                            Send Message <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </form>

                    </Card>

                </div>
                </motion.div>


            </div>
        </section>
    );
};

export default ContactSection;