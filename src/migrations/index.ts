import * as migration_20260405_001637 from './20260405_001637';
import * as migration_20260405_001820 from './20260405_001820';
import * as migration_20260406_230210_homepage_updates from './20260406_230210_homepage_updates';

export const migrations = [
  {
    up: migration_20260405_001637.up,
    down: migration_20260405_001637.down,
    name: '20260405_001637',
  },
  {
    up: migration_20260405_001820.up,
    down: migration_20260405_001820.down,
    name: '20260405_001820',
  },
  {
    up: migration_20260406_230210_homepage_updates.up,
    down: migration_20260406_230210_homepage_updates.down,
    name: '20260406_230210_homepage_updates'
  },
];
