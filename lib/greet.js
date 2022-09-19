export default function greet() {
  const myDate = new Date();
  const hrs = myDate.getHours();
  if (hrs < 12) return "Good morning";
  else if (hrs >= 12 && hrs <= 17) return "Good afternoon";
  else if (hrs >= 17 && hrs <= 24) return "Good evening";
}