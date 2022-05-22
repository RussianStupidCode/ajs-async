// TODO: write your code here
import savingPromise from './game_promise';
import savingAsync from './game_async';

savingPromise.load().then((saving) => {
  console.log('promise');
  console.log(saving);
}, (error) => {
  console.log(error);
});

async function main() {
  console.log('async');
  try {
    const data = await savingAsync.load();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

main();
