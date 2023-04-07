export function generateID() {
  let id = "";
  const characters = "0123456789";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}
