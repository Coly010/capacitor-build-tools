#!/usr/bin/env node
import { standardEntry } from 'shared/standard-entry';

standardEntry('Test', 'Test Description', (program) =>
  program.option('-t --test', 'Test Option')
);
