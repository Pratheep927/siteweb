document.addEventListener("DOMContentLoaded", () => {
  const emojiMap = {
    "Accueil": ["🏠", "🌍", "🌿"],
    "Les Problèmes": ["⚠️", "🌪️", "🔥"],
    "Les Solutions": ["💡", "🧪", "🛡️"],
    "Agir": ["✊", "🌱", "🌍"],
    "Quiz": ["❓", "🧠", "🎯"],
    "À propos": ["👨‍🏫", "📝", "🌐"]
  };

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const text = link.textContent.trim();
      const emojis = emojiMap[text] || ["✨"];
      const linkRect = link.getBoundingClientRect();

      emojis.forEach(() => {
        const emoji = document.createElement("span");
        emoji.className = "emoji-burst";
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${linkRect.left + linkRect.width / 2}px`;
        emoji.style.top = `${linkRect.top + linkRect.height / 2}px`;

        // Valeurs aléatoires de déplacement
        const dx = (Math.random() - 0.5) * 100 + "px";
        const dy = (Math.random() - 0.5) * 80 + "px";
        emoji.style.setProperty("--dx", dx);
        emoji.style.setProperty("--dy", dy);

        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 700);
      });
    });
  });
});
