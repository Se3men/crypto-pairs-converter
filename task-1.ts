function distributionCoins(
  coinAvailable: { [key: string]: number },
  participantsRequest: string[]
): string[] | null {
  const result: string[] = [];
  let i = 0;
  while (i < participantsRequest.length) {
    if (participantsRequest[i].includes('/')) {
      const userCoins = participantsRequest[i].split('/');
      const keys = Object.keys(coinAvailable);
      keys.sort((a, b) => coinAvailable[b] - coinAvailable[a]);
      const largest = keys[0];
      if (userCoins.includes(largest)) {
        result.push(largest);
        coinAvailable[largest] -= 1;
      } else {
        for (let j = 0; j < userCoins.length; j += 1) {
          if (coinAvailable[userCoins[j]]) {
            result.push(userCoins[j]);
            coinAvailable[userCoins[j]] -= 1;
            break;
          }
          if (!coinAvailable[userCoins[j]] && j < userCoins.length - 1) {
            continue;
          }
          if (!coinAvailable[userCoins[j]] && j === userCoins.length - 1) {
            return null;
          }
        }
      }
    } else {
      if (!coinAvailable[participantsRequest[i]]) {
        return null;
      }
      if (coinAvailable[participantsRequest[i]]) {
        result.push(participantsRequest[i]);
        coinAvailable[participantsRequest[i]] -= 1;
      }
    }
    i += 1;
  }
  return result;
}
