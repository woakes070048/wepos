import lodash from 'lodash/core';
import findIndex from 'lodash';
import truncate from 'lodash';
import throttle from 'lodash';
import includes from 'lodash/fp/includes.js';
import debounce from 'lodash/fp/debounce.js';

_ = lodash.noConflict();
_.findIndex = findIndex;
_.throttle = throttle;
_.truncate = truncate;
_.includes = includes;
_.debounce = debounce;

export default _;