export default function charRefReplacer (stringToFix) {
  const doc = new window.DOMParser().parseFromString(stringToFix, 'text/html')
  return doc.documentElement.textContent
}
