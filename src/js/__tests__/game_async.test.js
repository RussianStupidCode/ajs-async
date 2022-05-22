import GameSavingLoader from '../game_async';
import read from '../reader';

jest.mock('../reader');

const getBuffer = (input) => new Promise((resolve, reject) => {
  if (typeof input !== 'string') {
    reject(new Error('invalid input'));
  }

  const buffer = new ArrayBuffer(input.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < input.length; i += 1) {
    bufferView[i] = input.charCodeAt(i);
  }
  resolve(buffer);
});

test('game saving test succes', async () => {
  read.mockReturnValue(getBuffer('{"id":8,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}'));
  const result = await GameSavingLoader.load();

  const expected = JSON.stringify({
    id: 8, // id сохранения
    created: 1546300800, // timestamp создания
    userInfo: {
      id: 1, // user id
      name: 'Hitman', // user name
      level: 10, // user level
      points: 2000, // user points
    },
  });
  expect(result).toEqual(expected);
});

test('game saving test error', async () => {
  read.mockReturnValue(getBuffer(1));
  let messageError = 'empty';

  try {
    const result = await GameSavingLoader.load();
    console.log(result);
  } catch (error) {
    messageError = String(error);
  }

  expect(messageError).toEqual('Error: invalid input');
});
