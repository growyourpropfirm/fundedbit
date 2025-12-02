"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(1250);

  useEffect(() => {
    // Animate counter on mount
    const timer = setTimeout(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here - you can add API call
    setSubmitted(true);
    setCount(count + 1);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setName("");
    }, 3000);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logo */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <Image
              src="/logo.png"
              alt="FUNDEDBIT Logo"
              width={190}
              height={60}
              className="h-8 sm:h-12 md:h-14 mb-2 lg:h-auto w-auto"
              priority
            />
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-b from-[#56A23C] to-[#26813A] text-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden min-h-[90vh] sm:min-h-[95vh] md:h-[100vh] flex items-center"
          >
            <div className="w-full px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center"
          >
            {/* Launch Badge */}
            <motion.div
              variants={itemVariants}
              animate={floatingAnimation}
              className="mb-4 sm:mb-6 md:mb-8"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="inline-block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm md:text-base font-secondary backdrop-blur-sm border border-white/30"
              >
                LAUNCH: DECEMBER 2025
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 font-primary leading-tight px-2 sm:px-0"
            >
              Exclusive Access to{" "}
              <motion.span
                animate={pulseAnimation}
                className="text-white inline-block"
              >
                FUNDEDB
                <span className="text-gray-900 relative -top-1 sm:-top-2 inline-block">I</span>
                T
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 font-secondary max-w-3xl mx-auto px-2 sm:px-4"
            >
              The fair Prop Firm with real <strong>RAW Spreads</strong>,{" "}
              <strong>clear rules</strong> and{" "}
              <strong>fast payouts</strong>.
            </motion.p>

            {/* Giveaway Info Box */}
            <motion.div
              variants={itemVariants}
              animate={floatingAnimation}
              whileHover={{ scale: 1.02 }}
              className="mb-6 sm:mb-8 md:mb-12 p-4 sm:p-5 md:p-6 lg:p-8 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 max-w-2xl mx-auto"
            >
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2 sm:mb-3 font-secondary">
                💙 Join the waiting list & automatically enter the{" "}
                <strong>Giveaway</strong>:
              </p>
              <motion.p
                animate={pulseAnimation}
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold font-primary break-words"
              >
                💙 <strong>$100.000 | $50.000 | $25.000 Account</strong>
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto mb-6 sm:mb-8 md:mb-12 px-2 sm:px-0"
            >
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
                <motion.input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-full bg-white text-gray-900 font-secondary text-sm sm:text-base border-2 border-white/50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-white/70 focus:border-white transition-all placeholder:text-gray-500"
                />
                <motion.input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-full bg-white text-gray-900 font-secondary text-sm sm:text-base border-2 border-white/50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-white/70 focus:border-white transition-all placeholder:text-gray-500"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                animate={pulseAnimation}
                className="w-full px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white text-[#26813A] rounded-full font-bold text-base sm:text-lg md:text-xl font-primary hover:bg-gray-100 transition-colors shadow-xl"
              >
                Join Waiting List Now
              </motion.button>
            </motion.form>

            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 mx-2 sm:mx-auto"
              >
                <p className="font-secondary text-sm sm:text-base md:text-lg">
                  ✅ Successfully registered! You automatically enter the giveaway.
                </p>
              </motion.div>
            )}

            {/* Count Display with Avatars */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6"
            >
              <div className="flex -space-x-2 sm:-space-x-3">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm"
                  >
                    {String.fromCharCode(65 + (i % 26))}
                  </motion.div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <p className="font-secondary text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Already</p>
                <motion.p
                  key={count}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-primary text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
                >
                  {count.toLocaleString()}+ people have signed up
                </motion.p>
              </div>
            </motion.div>
            </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-primary px-2">
              Why Traders Choose FUNDEDBIT
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#26813A] mb-4 sm:mb-5 md:mb-6 font-primary px-2">
              Our Advantages
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-secondary px-4">
              Get early access to a platform that combines transparency,
              community & fair payouts.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Trade RAW Spreads",
                description:
                  "Benefit from real market prices without artificial markups - perfect for scalpers & precise entries.",
              },
              {
                title: "Growing Trader Community",
                description:
                  "Learn from others, exchange ideas and grow in a group where everyone has the same goal: getting funded.",
              },
              {
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
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-4 sm:p-5 md:p-6 lg:p-8 bg-gradient-to-br from-[#56A23C]/10 to-[#26813A]/10 rounded-xl sm:rounded-2xl border border-[#56A23C]/20 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#26813A] mb-3 sm:mb-4 font-primary">
                  {feature.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 font-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giveaway Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-primary px-2">
              We're Giving Away 3 Funding Accounts:
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#26813A] font-secondary px-4">
              All waiting list members automatically enter the draw 🚀
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                place: "1st Place",
                amount: "$100,000",
                color: "from-yellow-400 to-yellow-600",
                delay: 0,
              },
              {
                place: "2nd Place",
                amount: "$50,000",
                color: "from-gray-300 to-gray-500",
                delay: 0.1,
              },
              {
                place: "3rd Place",
                amount: "$25,000",
                color: "from-orange-400 to-orange-600",
                delay: 0.2,
              },
            ].map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: prize.delay }}
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.2 } }}
                className="relative"
              >
                <div
                  className={`bg-gradient-to-br ${prize.color} p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow`}
                >
                  <div className="text-center">
                    <p className="text-sm sm:text-base md:text-lg font-secondary mb-2 sm:mb-3">
                      {prize.place}
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-primary mb-1 sm:mb-2">
                      {prize.amount}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-secondary">Account</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
