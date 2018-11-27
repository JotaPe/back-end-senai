import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  TEACHER_CREATE_EXERCISE = 'TEACHER_CREATE_EXERCISE',
  TEACHER_CREATE_WARNING = 'TEACHER_CREATE_WARNING',
  STUDENT_ACCESS_EXERCISE = 'STUDENT_ACCESS_EXERCISE',
  STUDENT_ACCESS_WARNING = 'STUDENT_ACCESS_WARNING',
  ADMINISTATION_ACCESSES = 'ADMINISTRATION_ACCESSES',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.TEACHER_CREATE_EXERCISE)
  .createOwn('exercise')
  .deleteOwn('exercise')
  .grant(AppRoles.TEACHER_CREATE_WARNING)
  .createOwn('warning')
  .deleteOwn('warning')
  .readOwn('warning')
  .grant(AppRoles.ADMINISTATION_ACCESSES)
  .createAny('warning')
  .deleteAny('warning')
  .grant(AppRoles.STUDENT_ACCESS_EXERCISE)
  .readAny('exercise')
  .createOwn('response')
  .grant(AppRoles.STUDENT_ACCESS_WARNING)
  .readOwn('warning');
