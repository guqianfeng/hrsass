export const imgerror = {
  inserted(el, binding) {
    el.onerror = () => {
      el.src = binding.value;
    };
  },
};

export const color = {
  inserted(el, binding) {
    el.style.color = binding.value;
  },
};
