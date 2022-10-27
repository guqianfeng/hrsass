export const imgerror = {
  inserted(el, binding) {
    el.onerror = () => {
      el.src = binding.value;
    };
  },
};
