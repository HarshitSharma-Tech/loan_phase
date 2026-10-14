export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isCompactViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

export const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

/** 'webgl' only when it is safe and worthwhile to run the 3D scene. */
export const detectSceneMode = () =>
  prefersReducedMotion() || isCompactViewport() || !hasWebGL() ? 'fallback' : 'webgl';
