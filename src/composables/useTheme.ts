import { ref, watch } from 'vue';

const isDark = ref(false);

export const useTheme = () => {
  const initTheme = () => {
    // Verificar preferencia guardada o del sistema
    isDark.value = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    updateDOMTheme();
  };

  const updateDOMTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;

    if (isDark.value) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    updateDOMTheme();
  };

  return {
    isDark,
    toggleTheme,
    initTheme
  };
};
