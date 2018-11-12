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
    'Add `serializeAnyToJson` and `unserializeAnyFromJsonUnsafe`',
    'Pass line number to bspp for correct line number directives',
    'Update js_string.ml',
    '[js diff] preview',
    '[Belt] Add intersect/By to Belt.List',
    'add belt.String',
    'Default `bsb -init .` to interop with current directory',
    'Update Storage bindings to be fastpipe compatible',
    'Adding a package-lock.json, and an opam local-switch',
    'Proposal to add bs-stdlib',
    '[Do not merge] Sound promises (Repromise)',
    '[RFC] Standard Library Interfaces',
    'fix #1739 complete js promise bindings',
    'Changes to belt to work when compiled to native',
    'Add -build-artifacts-dir for configurable out-of-source artifacts',
    '[Belt] Change reduceReverse to reduceRight, etc.',
    'recovery release 3.1.4',
    'wip',
    '[Experiment][DoNotmerge] Represent ocaml records as js objects at runtime.',
    'Fix external declaration for Js.String.get',
    '[Super errors] Add &amp; document way of keeping track whether we\'re using reason or ocaml syntax',
    'Build whole_compiler_lib.ml for using as library in OCaml projects',
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
