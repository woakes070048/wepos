import lodash from 'lodash/core';
import truncate from 'lodash';
import findIndex from 'lodash';
import throttle from 'lodash/throttle';
import includes from 'lodash/fp/includes.js';
import debounce from 'lodash/fp/debounce.js';

_ = lodash.noConflict();
_.throttle = throttle;
_.truncate = truncate;
_.includes = includes;
_.debounce = debounce;
_.findIndex = findIndex;
export default _;