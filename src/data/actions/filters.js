import * as actions from './constants';

export const filterUpdate = (filterType) => {
  return {type: actions.FILTER_TODOS_CHANGE, filterType}
}
