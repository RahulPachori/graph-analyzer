import { motion } from "framer-motion";

function SplashScreen() {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"

            initial={{ opacity: 1 }}

            exit={{
                opacity: 0,
                transition: {
                    duration: 0.45,
                    ease: "easeInOut",
                },
            }}
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0 bg-base-100"

                animate={{
                    opacity: [1, 1, 1, 0],
                }}

                transition={{
                    duration: 2,
                    times: [0, 0.65, 0.85, 1],
                }}
            />

            {/* Glow */}
            <motion.div
                className="absolute left-1/2 top-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl"

                style={{
                    x: "-50%",
                    y: "-50%",
                }}

                animate={{
                    scale: [0.6, 1, 1.4, 4],
                    opacity: [0, 0.8, 0.6, 0],
                }}

                transition={{
                    duration: 2,
                    times: [0, 0.3, 0.7, 1],
                }}
            />

            {/* Logo */}
            <motion.img
                src="/graph-icon.png"
                alt="Graph Logo"

                className="absolute left-1/2 top-1/2 w-40 h-40"

                style={{
                    x: "-50%",
                    y: "-50%",
                }}

                initial={{
                    scale: 0.3,
                    opacity: 0,
                    rotate: -15,
                }}

                animate={{
                    scale: [0.3, 1.15, 1, 22],
                    opacity: [0, 1, 1, 0],
                    rotate: [-15, 5, 0, 0],
                }}

                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.55, 1],
                }}
            />

            {/* Title */}
            <motion.h1
                className="absolute left-1/2 top-[65%] -translate-x-1/2 text-3xl font-bold tracking-wide"

                initial={{
                    opacity: 0,
                    y: 20,
                }}

                animate={{
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20],
                }}

                transition={{
                    duration: 1.6,
                    delay: 0.25,
                    times: [0, 0.3, 0.75, 1],
                }}
            >
                Graph Algorithm Analyzer
            </motion.h1>
        </motion.div>
    );
}

export default SplashScreen;