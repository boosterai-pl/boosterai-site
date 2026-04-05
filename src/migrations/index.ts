import * as migration_20260405_001637 from './20260405_001637';
import * as migration_20260405_001820 from './20260405_001820';

export const migrations = [
  {
    up: migration_20260405_001637.up,
    down: migration_20260405_001637.down,
    name: '20260405_001637',
  },
  {
    up: migration_20260405_001820.up,
    down: migration_20260405_001820.down,
    name: '20260405_001820'
  },
];
