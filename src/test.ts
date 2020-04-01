#!/usr/bin/env node
import chalk from 'chalk';
import { standardEntry } from './shared/help-intro';

standardEntry('Test', 'Test Description').option('-t --test', 'Test Option').parse(process.argv);
