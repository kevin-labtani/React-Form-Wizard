export const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.25, duration: 1 },
    },
    exit: {
      y: "-100vh",
      transition: { ease: "easeIn" },
    },
  };