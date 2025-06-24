export function formatKES(amount) {
  if (amount >= 1000) {
    return `KES ${(amount / 1000).toFixed(2)}T`;
  } else if (amount >= 1) {
    return `KES ${amount.toFixed(1)}B`;
  } else {
    return `KES ${(amount * 1000).toFixed(1)}M`;
  }
} 