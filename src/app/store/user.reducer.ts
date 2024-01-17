import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../shared/models/user';
import { Action, createReducer, on } from '@ngrx/store';
import { addUser, deleteUser } from './user.action';

export interface State extends EntityState<User> {
  // additional entities state properties
  selectedUserId: number;
}

export function selectUserId(a: User): number {
  //In this case this would be optional since primary key is id
  return a.id;
}


export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: 0,
});

const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => {
    return adapter.addOne(user, state)
  }),
  on(deleteUser, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
