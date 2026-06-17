export function scrollToSection(sectionId, offset = 96) {
  if (typeof window === "undefined" || !sectionId) return false;

  const element = document.getElementById(sectionId);

  if (!element) return false;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });

  return true;
}

export function scrollToSectionWhenReady(sectionId, attempts = 20) {
  if (scrollToSection(sectionId)) return;

  if (attempts <= 0) return;

  window.setTimeout(() => {
    scrollToSectionWhenReady(sectionId, attempts - 1);
  }, 100);
}
