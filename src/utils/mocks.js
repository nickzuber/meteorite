import moment from 'moment';
import {Reasons} from '../constants/reasons';
import {Status} from '../constants/status';

function* createCounterGenerator () {
  let i = 0;
  while(true) yield i++
}

const uidGen = createCounterGenerator();
const indexGen = createCounterGenerator();

const getMockReasons = n => {
  const reasons = Object.values(Reasons);
  const len = reasons.length;
  return new Array(n).fill(0).map(_ => ({
    reason: reasons[Math.floor(Math.random() * len)],
    time: moment().format()
  }));
};

function getMockName (index) {
  const names = [
    '[MPQ-43] Feature - Improve native events performance',
    'Chore - Remove redundent constants file',
    'Feature - Default initialize command to interop with current directory',
    'Feature - Update Storage bindings to be fastpipe compatible',
    '[RFC] Standard Library Interfaces',
    '[Belt] Change reduceReverse to reduceRight',
    '[Experiment][DoNotmerge] Represent OCaml records as JS objects at runtime',
  ];
  return names[index % names.length];
}

const getMockNotification = randomNumber => ({
  id: uidGen.next().value,
  updated_at: moment().subtract(randomNumber * 500, 'minutes').utc().format(),
  isAuthor: randomNumber < 0.2,
  status: randomNumber < 0.4 ? Status.QUEUED : randomNumber < 0.6 ? Status.STAGED : Status.CLOSED,
  reasons: getMockReasons(Math.ceil(randomNumber * 10)),
  type: ['PullRequest', 'Issue'][Math.floor(randomNumber * 2)],
  name: getMockName(indexGen.next().value),
  url: 'https://github.com/test/repo/pull',
  repository: ['BuckleScript/bucklescript', 'nickzuber/meteorite'][Math.floor(randomNumber * 2)],
  number: Math.ceil(randomNumber * 1000),
  repositoryUrl: 'https://github.com/test/repo',
});

export function createMockNotifications (n = 50) {
  const mockNotifications = new Array(n);
  for (let i = 0; i < mockNotifications.length; i++) {
    mockNotifications[i] = getMockNotification(Math.random());
  }
  return mockNotifications;
}
