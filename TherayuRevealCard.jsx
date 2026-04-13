"use client";

import { motion } from "framer-motion";

const containerVariants = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const blockVariants = {
  rest: {
    y: "0%",
  },
  hover: (index) => ({
    y: `${112 + (index % 2 === 0 ? 0 : 14)}%`,
    transition: {
      duration: 0.72,
      ease: [0.65, 0, 0.35, 1],
      delay: index * 0.05,
    },
  }),
};

const textVariants = {
  rest: {
    opacity: 0.92,
    y: 0,
  },
  hover: {
    opacity: 1,
    y: -4,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const imageVariants = {
  rest: {
    scale: 1,
    filter: "brightness(1) saturate(1)",
  },
  hover: {
    scale: 1.05,
    filter: "brightness(1.06) saturate(1.05)",
    transition: {
      duration: 0.75,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const overlayVariants = {
  rest: {
    opacity: 0.35,
    backgroundPosition: "0% 50%",
  },
  hover: {
    opacity: 0.75,
    backgroundPosition: "100% 50%",
    transition: {
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const tags = ["User Flow", "Appointment UX", "Mobile UI"];

export default function TherayuRevealCard({
  imageSrc = "/therayu-cover.jpg",
  imageAlt = "Therayu healthcare app cover",
}) {
  const blocks = Array.from({ length: 6 });

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,22,44,0.94),rgba(6,11,24,0.98))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(98,220,255,0.08),transparent_24%),radial-gradient(circle_at_85%_80%,rgba(95,126,255,0.12),transparent_24%)]" />

      <div className="relative grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
        <div className="order-1">
          <motion.div
            variants={imageVariants}
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,36,0.98),rgba(7,11,23,1))] shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
          >
            <div className="relative h-[320px] overflow-hidden rounded-[24px] md:min-h-[360px]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover object-center"
              />

              <motion.div
                variants={overlayVariants}
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(40,214,214,0.08),transparent_35%,rgba(114,86,255,0.18)_70%,transparent_100%)] bg-[length:200%_200%]"
              />
            </div>

            <motion.div
              variants={containerVariants}
              initial={false}
              className="pointer-events-none absolute inset-0 grid grid-cols-6"
            >
              {blocks.map((_, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={blockVariants}
                  className="relative h-full overflow-hidden border-r border-white/[0.04] bg-[linear-gradient(180deg,rgba(6,11,24,0.94),rgba(10,18,36,0.98))] last:border-r-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: "600% 100%",
                      backgroundPosition: `${index * 20}% 50%`,
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,24,0.08),rgba(6,11,24,0.22))]" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={textVariants}
          className="order-2 flex min-h-full flex-col justify-center rounded-[22px] border border-white/6 bg-white/[0.02] p-6 md:p-7"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-white/70">
            Therayu
          </span>
          <span className="mt-3 text-xs uppercase tracking-[0.22em] text-violet-400">
            Digital Healthcare Platform
          </span>

          <h3 className="mt-4 max-w-[16ch] text-balance text-3xl font-semibold leading-[1.02] text-white md:text-[2.6rem]">
            Digital healthcare platform designed around calm booking flows and
            trust-led interaction.
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-[15px]">
            A healthcare app concept combining physiotherapy, Ayurveda, and
            teleconsultation with an interface that feels simple, clear, and
            supportive.
          </p>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 md:text-[15px]">
            Designed to make booking, exploration, and trust-building feel
            effortless through simple visual structure and user-first flows.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] uppercase tracking-[0.12em] text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
