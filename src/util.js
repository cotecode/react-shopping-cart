export default function formatCurrency(num) {
  return "Rp" + Number(num.toFixed(1)).toLocaleString();
}
