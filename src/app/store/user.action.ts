import { createAction, props } from '@ngrx/store';
import { User } from '../shared/models/user';

export const addUser = createAction('[User/API] Add User', props<{ user: User }>());
export const deleteUser = createAction('[User/API] Delete User', props<{ id: string }>());
