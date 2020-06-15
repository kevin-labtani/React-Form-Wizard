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

export const answerVariants = {
  hidden: {
    opacity: 0,
    x: "-5vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 1.25, duration: 1 },
  },
};

export const questionVariants = {
  hidden: {
    opacity: 0,
    x: "5vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.75, duration: 1 },
  },
};

export const navigationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.75, duration: 1 },
  },
};
