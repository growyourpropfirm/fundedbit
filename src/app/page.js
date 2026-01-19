"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(450);

  useEffect(() => {
    // Animate counter on mount
    const timer = setTimeout(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Success
      setSubmitted(true);
      setCount(count + 1);
      setEmail("");
      setName("");
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Waiting List Hero */}
      <section className="relative py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Logo at top center */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.svg"
                alt="FUNDEDBIT Logo"
                width={200}
                height={60}
                className="h-12 md:h-16 w-auto"
                priority
              />
            </div>

            {/* Main Card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-[#013d14]/80 backdrop-blur-sm rounded-3xl border-2 border-[#8af5ae]/30 shadow-2xl p-6 md:p-8 lg:p-12"
            >
              {/* Launch Badge */}
              <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#5df115] rounded-full animate-pulse"></div>
                  <span className="px-4 py-2 bg-[#5df115] text-[#010d01] rounded-full text-sm md:text-base font-secondary font-semibold">
                    LAUNCH: JANUARY 2026
                  </span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 font-primary text-center text-[#fefefe]"
              >
                Exclusive Access to{" "}
                <span className="text-[#5df115]">FUNDEDBIT</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg lg:text-xl text-[#e0ffed] mb-4 font-secondary text-center leading-relaxed flex items-center justify-center gap-2 flex-wrap"
              >
                #1 Crypto Prop Firm supported by{" "}
                <Image 
                  src="/bybit.png" 
                  alt="Bybit" 
                  width={80}
                  height={24}
                  className="h-5 md:h-6 lg:h-7 w-auto inline-block"
                />
              </motion.p>

              {/* Giveaway Info */}
              <motion.div
                variants={itemVariants}
                className="mb-8 text-center"
              >
                <p className="text-base md:text-lg text-[#e0ffed] mb-3 font-secondary">
                  Join the waitlist now for a chance to win a
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#5df115] font-primary">
                  <strong>$100,000 I $50,000 I $25K Account</strong>
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="mb-8"
              >
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Your First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-lg bg-[#010d01]/60 text-[#fefefe] font-secondary text-base border border-[#8af5ae]/40 focus:outline-none focus:ring-2 focus:ring-[#5df115] focus:border-[#5df115] transition-all placeholder:text-[#828880] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="email"
                    placeholder="Your E-Mail Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-lg bg-[#010d01]/60 text-[#fefefe] font-secondary text-base border border-[#8af5ae]/40 focus:outline-none focus:ring-2 focus:ring-[#5df115] focus:border-[#5df115] transition-all placeholder:text-[#828880] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-900/40 border border-red-500/50 rounded-lg text-center"
                  >
                    <p className="text-red-200 font-secondary text-sm">{error}</p>
                  </motion.div>
                )}
                <motion.button
                  type="submit"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-[#5df115] text-[#010d01] rounded-lg font-bold text-lg md:text-xl font-primary hover:bg-[#8af5ae] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "Join Waiting List Now"
                  )}
                </motion.button>
              </motion.form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#5df115]/20 border border-[#5df115]/60 rounded-lg text-center"
                >
                  <p className="text-[#5df115] font-secondary flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Successfully registered! You automatically enter the giveaway.
                  </p>
                </motion.div>
              )}

              {/* Social Proof */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
              >
                <div className="flex -space-x-2">

                    <div
                      className="h-10 rounded-full overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={`/customers.png`}
                        alt={`Users`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                </div>
                <p className="text-sm md:text-base text-[#e0ffed] font-secondary">
                  Already <span className="font-bold text-[#fefefe]">{count.toLocaleString()}+</span> people have signed up
                </p>
              </motion.div>

              {/* Social Media Icons */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-4"
              >
                <a href="https://discord.gg/MGqs7XSw" target="_blank" className="text-[#e0ffed] hover:text-[#5df115] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.007-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/fundedbitcom/" target="_blank" className="text-[#e0ffed] hover:text-[#5df115] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Features Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#fefefe] mb-4 font-primary">
              Why Traders Choose FUNDEDBIT
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#fefefe] mb-6 font-primary">
              Our Advantages
            </h3>
            <p className="text-base md:text-lg text-[#e0ffed] max-w-3xl mx-auto font-secondary leading-relaxed">
              Get early access to a platform that combines transparency,
              community & fair payouts.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: (
                  <span className="flex items-center justify-center gap-2 flex-wrap">
                    Supported by{" "}
                    <Image 
                      src="/bybit.png" 
                      alt="Bybit" 
                      width={80}
                      height={24}
                      className="h-6 w-auto inline-block"
                    />
                  </span>
                ),
                description:
                  "Trade all crypto pairs directly on Bybit while not risking your own money.",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Growing Trader Community",
                description:
                  "Learn from others, exchange ideas and grow in a group where everyone has the same goal: getting funded.",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "No Withdrawal Refusal",
                description:
                  "When you're profitable, we pay out reliably – no excuses, no discussion.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#013d14]/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-[#8af5ae]/30 shadow-md hover:shadow-xl hover:border-[#5df115]/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-[#5df115]/20 rounded-xl text-[#5df115]">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[#fefefe] mb-4 font-primary text-center">
                  {feature.title}
                </h4>
                <p className="text-[#e0ffed] font-secondary leading-relaxed text-center text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Giveaway Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#010d01]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#fefefe] mb-4 font-primary">
              We’re Giving Away 3 Funded Accounts:
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-[#e0ffed] font-secondary">
              All waiting list members automatically enter the draw
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Gold metallic gradient with green accent */}
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                        <stop offset="30%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
                        <stop offset="70%" style={{ stopColor: "#26813A", stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: "#1f6a2e", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FFF9C4", stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 0.3 }} />
                      </linearGradient>
                      <radialGradient id="goldShine" cx="30%" cy="30%">
                        <stop offset="0%" style={{ stopColor: "#FFFFFF", stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 0 }} />
                      </radialGradient>
                    </defs>
                    {/* Medal ribbon with green */}
                    <path d="M24 10L28 6H52L56 10V18H24V10Z" fill="#26813A" />
                    <path d="M24 18H56V22H24V18Z" fill="#26813A" />
                    <path d="M24 22H56V26H24V22Z" fill="#1f6a2e" />
                    {/* Medal circle - outer ring */}
                    <circle cx="40" cy="45" r="22" fill="url(#goldGradient)" stroke="#1f6a2e" strokeWidth="2.5" />
                    {/* Inner highlight for 3D effect */}
                    <circle cx="40" cy="45" r="20" fill="url(#goldShine)" />
                    {/* Inner circle */}
                    <circle cx="40" cy="45" r="16" fill="url(#goldGradient)" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
                    {/* Number 1 */}
                    <text
                      x="40"
                      y="45"
                      fontSize="32"
                      fontWeight="900"
                      fill="#1f6a2e"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      dominantBaseline="central"
                      style={{ alignmentBaseline: "central", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                    >1</text>
                  </svg>
                ),
                amount: "$100,000",
                label: "1st Place",
              },
              {
                icon: (
                  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Silver metallic gradient with green accent */}
                      <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#E8E8E8", stopOpacity: 1 }} />
                        <stop offset="30%" style={{ stopColor: "#C0C0C0", stopOpacity: 1 }} />
                        <stop offset="70%" style={{ stopColor: "#26813A", stopOpacity: 0.7 }} />
                        <stop offset="100%" style={{ stopColor: "#1f6a2e", stopOpacity: 1 }} />
                      </linearGradient>
                      <radialGradient id="silverShine" cx="30%" cy="30%">
                        <stop offset="0%" style={{ stopColor: "#FFFFFF", stopOpacity: 0.7 }} />
                        <stop offset="100%" style={{ stopColor: "#C0C0C0", stopOpacity: 0 }} />
                      </radialGradient>
                    </defs>
                    {/* Medal ribbon with green */}
                    <path d="M24 10L28 6H52L56 10V18H24V10Z" fill="#26813A" />
                    <path d="M24 18H56V22H24V18Z" fill="#26813A" />
                    <path d="M24 22H56V26H24V22Z" fill="#1f6a2e" />
                    {/* Medal circle - outer ring */}
                    <circle cx="40" cy="45" r="22" fill="url(#silverGradient)" stroke="#1f6a2e" strokeWidth="2.5" />
                    {/* Inner highlight for 3D effect */}
                    <circle cx="40" cy="45" r="20" fill="url(#silverShine)" />
                    {/* Inner circle */}
                    <circle cx="40" cy="45" r="16" fill="url(#silverGradient)" stroke="#E8E8E8" strokeWidth="1.5" opacity="0.6" />
                    {/* Number 2 */}
                    <text
                      x="40"
                      y="45"
                      fontSize="32"
                      fontWeight="900"
                      fill="#1f6a2e"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      dominantBaseline="central"
                      style={{ alignmentBaseline: "central", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                    >2</text>
                  </svg>
                ),
                amount: "$50,000",
                label: "2nd Place",
              },
              {
                icon: (
                  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Bronze metallic gradient with green accent */}
                      <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#CD7F32", stopOpacity: 1 }} />
                        <stop offset="30%" style={{ stopColor: "#B87333", stopOpacity: 1 }} />
                        <stop offset="70%" style={{ stopColor: "#26813A", stopOpacity: 0.7 }} />
                        <stop offset="100%" style={{ stopColor: "#1f6a2e", stopOpacity: 1 }} />
                      </linearGradient>
                      <radialGradient id="bronzeShine" cx="30%" cy="30%">
                        <stop offset="0%" style={{ stopColor: "#FFE5B4", stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: "#CD7F32", stopOpacity: 0 }} />
                      </radialGradient>
                    </defs>
                    {/* Medal ribbon with green */}
                    <path d="M24 10L28 6H52L56 10V18H24V10Z" fill="#26813A" />
                    <path d="M24 18H56V22H24V18Z" fill="#26813A" />
                    <path d="M24 22H56V26H24V22Z" fill="#1f6a2e" />
                    {/* Medal circle - outer ring */}
                    <circle cx="40" cy="45" r="22" fill="url(#bronzeGradient)" stroke="#1f6a2e" strokeWidth="2.5" />
                    {/* Inner highlight for 3D effect */}
                    <circle cx="40" cy="45" r="20" fill="url(#bronzeShine)" />
                    {/* Inner circle */}
                    <circle cx="40" cy="45" r="16" fill="url(#bronzeGradient)" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6" />
                    {/* Number 3 */}
                    <text
                      x="40"
                      y="45"
                      fontSize="32"
                      fontWeight="900"
                      fill="#1f6a2e"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      dominantBaseline="central"
                      style={{ alignmentBaseline: "central", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                    >3</text>
                  </svg>
                ),
                amount: "$25,000",
                label: "3rd Place",
              },
            ].map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-[#013d14]/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-[#8af5ae]/30"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-[#5df115]/20 rounded-xl text-[#5df115]">
                      {prize.icon}
                    </div>
                  </div>
                  <p className="text-[#e0ffed] text-base font-secondary mb-3 font-semibold">{prize.label}</p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#fefefe] font-primary mb-2">
                    {prize.amount}
                  </h3>
                  <p className="text-[#e0ffed] text-base font-secondary">Account</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-1 border-[#8af5ae]/20 py-4 md:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm md:text-md text-[#e0ffed] mb-3 font-secondary">
              Follow us on all socials. Winners will be announced on our socials and notified by email.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://discord.gg/MGqs7XSw"
                target="_blank"
                className="text-[#e0ffed] hover:text-[#5df115] transition-colors"
                aria-label="Discord"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.007-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/fundedbitcom/"
                target="_blank"
                className="text-[#e0ffed] hover:text-[#5df115] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}